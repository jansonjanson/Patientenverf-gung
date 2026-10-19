import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '5mb' }));

// In-memory + file-backed storage for classroom progress sync
const STORAGE_FILE = path.join(__dirname, '.classroom_progress.json');

interface UserProgress {
  userId: string;
  userName?: string;
  currentPhase: number;
  quizCompleted: boolean;
  quizScore: number;
  casesProgress: Record<string, { wenn: string; dann: string; diagnosis: string[]; completed: boolean }>;
  answers: Record<string, string>;
  checklists: Record<string, boolean>;
  lastUpdated: string;
}

let progressStore: Record<string, UserProgress> = {};

// Load existing data if available
try {
  if (fs.existsSync(STORAGE_FILE)) {
    const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
    progressStore = JSON.parse(raw);
  }
} catch (err) {
  console.warn('Failed to load initial classroom storage:', err);
}

function persistStore() {
  try {
    fs.writeFileSync(STORAGE_FILE, JSON.stringify(progressStore, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error persisting classroom storage:', err);
  }
}

// REST API Endpoints
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', serverTime: new Date().toISOString() });
});

// Get user progress
app.get('/api/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const userProgress = progressStore[userId] || null;
  res.json({ success: true, progress: userProgress });
});

// Save or sync user progress
app.post('/api/progress/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const data = req.body;

  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }

  progressStore[userId] = {
    userId,
    userName: data.userName || progressStore[userId]?.userName || 'Teilnehmer:in',
    currentPhase: Number(data.currentPhase) || 1,
    quizCompleted: Boolean(data.quizCompleted),
    quizScore: Number(data.quizScore) || 0,
    casesProgress: data.casesProgress || {},
    answers: data.answers || {},
    checklists: data.checklists || {},
    lastUpdated: new Date().toISOString(),
  };

  persistStore();

  res.json({
    success: true,
    message: 'Fortschritt synchronisiert',
    lastUpdated: progressStore[userId].lastUpdated,
  });
});

// Classroom Overview / Teacher Dashboard API
app.get('/api/classroom/stats', (_req: Request, res: Response) => {
  const users = Object.values(progressStore);
  const total = users.length;

  const phaseCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 };
  let quizPassedCount = 0;
  let totalCasesFinished = 0;

  users.forEach((u) => {
    if (phaseCounts[u.currentPhase] !== undefined) {
      phaseCounts[u.currentPhase]++;
    }
    if (u.quizCompleted && u.quizScore === 4) {
      quizPassedCount++;
    }
    const completedInCases = Object.values(u.casesProgress || {}).filter((c) => c.completed).length;
    totalCasesFinished += completedInCases;
  });

  res.json({
    totalParticipants: total,
    phaseDistribution: phaseCounts,
    quizPassedCount,
    averageCasesCompleted: total > 0 ? (totalCasesFinished / total).toFixed(1) : 0,
    activeLearners: users.map((u) => ({
      userId: u.userId,
      userName: u.userName,
      currentPhase: u.currentPhase,
      lastUpdated: u.lastUpdated,
    })),
  });
});

// Reset classroom data (for instructor)
app.post('/api/classroom/reset', (req: Request, res: Response) => {
  const { pin } = req.body;
  if (pin !== '1358') {
    return res.status(403).json({ success: false, error: 'Ungültige Dozenten-PIN' });
  }

  progressStore = {};
  persistStore();
  res.json({ success: true, message: 'Classroom-Daten erfolgreich zurückgesetzt' });
});

// Setup Vite middleware in dev or static server in prod
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Classroom server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
