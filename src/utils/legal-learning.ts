/**
 * Pure functions and data structures for legal classroom training
 * (CE08 U3 Palliative Care III - J. Rosenow)
 */

export interface QuizQuestion {
  id: string;
  question: string;
  correctValue: 'bv' | 'vv' | 'ehe' | 'pv';
  options: { value: 'bv' | 'vv' | 'ehe' | 'pv'; label: string }[];
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    question: '1. „Wirkt aus sich heraus“ – muss bei Kenntnis sofort von Ärzt:innen und Pflegenden bezüglich medizinischer Heileingriffe geachtet werden:',
    correctValue: 'pv',
    options: [
      { value: 'bv', label: 'Betreuungsverfügung' },
      { value: 'vv', label: 'Vorsorgevollmacht' },
      { value: 'ehe', label: 'Ehegattennotvertretung (§ 1358 BGB)' },
      { value: 'pv', label: 'Patientenverfügung' },
    ],
    explanation: 'Die Patientenverfügung entfaltet unmittelbare Bindungswirkung für das Behandlungsteam, sobald sie bekannt ist, da sie den vorab geäußerten Patientenwillen dokumentiert.',
  },
  {
    id: 'q2',
    question: '2. Macht eine Vertrauensperson unmittelbar zum „Vertreter im Willen“ und verhindert dadurch, dass ein Betreuungsgericht eingeschaltet werden muss:',
    correctValue: 'vv',
    options: [
      { value: 'bv', label: 'Betreuungsverfügung' },
      { value: 'vv', label: 'Vorsorgevollmacht' },
      { value: 'ehe', label: 'Ehegattennotvertretung (§ 1358 BGB)' },
      { value: 'pv', label: 'Patientenverfügung' },
    ],
    explanation: 'Die Vorsorgevollmacht ist eine rechtsgeschäftliche Vollmacht. Sie hat Vorrang vor einer gerichtlichen Betreuung (§ 1896 Abs. 2 BGB).',
  },
  {
    id: 'q3',
    question: '3. Gesetzliche Regelung seit 01.01.2023 bei Bewusstlosigkeit/Krankheit – gilt maximal 6 Monate und hebt die ärztliche Schweigepflicht auf:',
    correctValue: 'ehe',
    options: [
      { value: 'bv', label: 'Betreuungsverfügung' },
      { value: 'vv', label: 'Vorsorgevollmacht' },
      { value: 'ehe', label: 'Ehegattennotvertretung (§ 1358 BGB)' },
      { value: 'pv', label: 'Patientenverfügung' },
    ],
    explanation: 'Das Ehegattennotvertretungsrecht nach § 1358 BGB greift bei akuter Handlungsunfähigkeit nur für Ehegatten (im Bereich der Gesundheitssorge) für max. 6 Monate.',
  },
  {
    id: 'q4',
    question: '4. Wird vom Gericht angeordnet, wenn keine ausreichende Vollmacht existiert; Geschäfts- und Einsichtsfähigkeit des Betroffenen bleiben ungeschmälert bestehen:',
    correctValue: 'bv',
    options: [
      { value: 'bv', label: 'Betreuungsverfügung' },
      { value: 'vv', label: 'Vorsorgevollmacht' },
      { value: 'ehe', label: 'Ehegattennotvertretung (§ 1358 BGB)' },
      { value: 'pv', label: 'Patientenverfügung' },
    ],
    explanation: 'Mit der Betreuungsanordnung entsteht lediglich ein Vertretungsrecht des Betreuers; die Geschäfts- und Einsichtsfähigkeit des Betroffenen bleibt unberührt.',
  },
];

export interface CaseData {
  id: number;
  title: string;
  vignette: string;
  quote: string;
  hintQuestion: string;
  officialProblem: string;
  officialSolution: string;
  solution?: string;
  flaw?: string;
  didactics?: string;
  keyIssues: string[];
}

export const CASES_DATA: CaseData[] = [
  {
    id: 1,
    title: 'Fall 1: „Würdevoll sterben“',
    vignette: 'Herr K. (74) leidet an fortgeschrittener ALS (Amyotrophe Lateralsklerose). Er hat Angst vor dem Ersticken und davor, am Ende vollständig gelähmt nur noch durch Maschinen am Leben gehalten zu werden. Er schreibt in seine Verfügung: „Wenn ich einmal sehr krank bin... möchte ich würdevoll sterben.“',
    quote: '„Wenn ich einmal sehr krank und nicht mehr in der Lage bin, ein für mich erträgliches umweltbezogenes Leben zu führen…, dann möchte ich würdevoll sterben.“',
    hintQuestion: 'Prüfen Sie WENN- und DANN-Satzteil auf Bestimmtheit.',
    officialProblem: 'WENN: Fehlende Bestimmtheit hinsichtlich des Krankheitszustandes („sehr krank“, „erträgliches umweltbezogenes Leben“). DANN: Fehlende Bestimmtheit hinsichtlich der Handlung oder des Unterlassens („würdevoll sterben“ sagt nichts darüber aus, welche medizinischen Maßnahmen konkret gewünscht oder abgelehnt werden).',
    officialSolution: '„Wenn ich an einer fortschreitenden, unheilbaren Erkrankung leide und keine Aussicht auf Besserung besteht, wünsche ich, dass alle lebensverlängernden Maßnahmen (insbesondere künstliche Beatmung, künstliche Ernährung und Flüssigkeitszufuhr sowie Dialyse) eingestellt und eine palliative Behandlung zur Symptomlinderung durchgeführt wird.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 2,
    title: 'Fall 2: „Ich möchte nicht leiden.“',
    vignette: 'Frau S. (82) hat Knochenmetastasen im Endstadium. Sie fürchtet sich extrem vor Schmerzen in der letzten Lebensphase und sagt bei der Beratung: „Schreiben Sie einfach auf: Ich möchte nicht leiden.“',
    quote: '„Ich möchte nicht leiden.“',
    hintQuestion: 'Was bedeutet „leiden“ im klinischen Alltag – und welche Situation/Maßnahme ist gemeint?',
    officialProblem: 'Zu unbestimmt – es ist nicht klar, was „leiden“ bedeutet (körperlich, psychisch, sozial?). Keine spezifische medizinische Situation (WENN) oder konkrete Maßnahme (DANN) genannt.',
    officialSolution: '„Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde und starke Schmerzen habe, wünsche ich eine umfassende palliative Versorgung, auch wenn dies mein Bewusstsein trübt.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 3,
    title: 'Fall 3: „Ich möchte keine lebensverlängernden Maßnahmen.“',
    vignette: 'Herr L. (50) hat nach einem schweren Herzinfarkt Angst vor dem Wachkoma. Er möchte auf keinen Fall jahrelang beatmet im Bett liegen. In seinem Freitextfeld steht nur der Satz: „Ich möchte keine lebensverlängernden Maßnahmen.“',
    quote: '„Ich möchte keine lebensverlängernden Maßnahmen.“',
    hintQuestion: 'Wann genau soll das gelten? Welche Maßnahmen zählen dazu?',
    officialProblem: 'Zu unbestimmt – Wann (in welchem Krankheitszustand)? Welche konkreten Maßnahmen sind mit „lebensverlängernd“ gemeint?',
    officialSolution: '„Wenn ich mich in einem irreversiblen Koma befinde und keine Aussicht auf Wiedererlangung des Bewusstseins besteht, lehne ich lebensverlängernde Maßnahmen wie künstliche Beatmung oder künstliche Ernährung ab.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 4,
    title: 'Fall 4: „Meine Familie soll entscheiden.“',
    vignette: 'Frau M. (60) versteht die juristischen Formulare nicht. Sie vertraut ihrer ältesten Tochter blind und kreuzt auf dem Papier alles durch. Stattdessen notiert sie handschriftlich: „Meine Familie soll entscheiden, was mit mir passiert.“',
    quote: '„Meine Familie soll entscheiden, was mit mir passiert.“',
    hintQuestion: 'Wer genau ist „die Familie“ rechtlich – und was ist der Unterschied zwischen Patientenverfügung und Vorsorgevollmacht?',
    officialProblem: 'Unkonkret – Welche Person genau (Name, Geburtsdatum)? Wann? Was soll entschieden werden? („Die Familie“ hat als Kollektiv kein automatisches Vertretungsrecht).',
    officialSolution: '„Meine bevollmächtigte Person (Name, Geburtsdatum) soll meinen in dieser Verfügung festgelegten Willen gegenüber Ärzten durchsetzen. Falls keine genauen Anweisungen vorliegen, soll sie in meinem Sinne entscheiden.“',
    keyIssues: ['vertretung_unklar', 'dann_unbestimmt'],
  },
  {
    id: 5,
    title: 'Fall 5: „Nicht an Schläuche angeschlossen werden“',
    vignette: 'Herr P. (70) leidet an schwerer COPD. Nach einem Aufenthalt auf der Intensivstation hat er ein Trauma vor all den Geräten. Er sagt resolut: „Wenn es mit mir zu Ende geht, will ich nicht an Schläuche angeschlossen werden.“',
    quote: '„Ich will nicht an Schläuche angeschlossen werden.“',
    hintQuestion: 'Welche Schläuche gibt es im Krankenhaus – und dienen alle nur der Lebensverlängerung?',
    officialProblem: 'Unkonkret / vage – Welche Schläuche sind gemeint? Infusion zur Schmerzlinderung? Künstliche Beatmung? Ernährungssonde? Blasenkatheter bei Harnverhalt?',
    officialSolution: '„Ich lehne eine künstliche Beatmung und künstliche Ernährung ab, wenn ich mich im Endstadium einer unheilbaren Erkrankung befinde und keine Aussicht auf Besserung besteht.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 6,
    title: 'Fall 6: „Keine Operation bei schwerer Krankheit.“',
    vignette: 'Frau T. (88) ist pflegebedürftig und möchte nicht mehr ins Krankenhaus verlegt werden, um dort „aufgeschnitten zu werden“, wie sie sagt. Sie diktiert für die Verfügung: „Wenn ich schwer krank bin, will ich keine Operation.“',
    quote: '„Wenn ich schwer krank bin, will ich keine Operation.“',
    hintQuestion: 'Wann ist man „schwer krank“ – und was ist mit palliativen Operationen zur Schmerzlinderung?',
    officialProblem: '„Schwer krank“ ist nicht präzise genug (fehlende Bestimmtheit des Zustands). Zudem fehlt die Art der Operation: Nicht alle OPs sind lebensverlängernd, manche sind rein schmerzlindernd (z. B. bei Darmverschluss oder pathologischer Fraktur).',
    officialSolution: '„Ich lehne operative Eingriffe zur Lebensverlängerung ab, wenn ich mich in einem irreversiblen Koma befinde oder an einer unheilbaren Erkrankung im Endstadium leide.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
];

/**
 * Pure evaluation for Quiz
 */
export function checkQuizAnswers(answers: Record<string, string>): {
  score: number;
  total: number;
  isPerfect: boolean;
  results: Record<string, boolean>;
} {
  let score = 0;
  const results: Record<string, boolean> = {};

  QUIZ_QUESTIONS.forEach((q) => {
    const isCorrect = answers[q.id] === q.correctValue;
    results[q.id] = isCorrect;
    if (isCorrect) score++;
  });

  return {
    score,
    total: QUIZ_QUESTIONS.length,
    isPerfect: score === QUIZ_QUESTIONS.length,
    results,
  };
}

/**
 * Pure validation for learner's WENN-DANN repair formulation
 */
export function evaluateCaseFormulation(wenn: string, dann: string): {
  wennValid: boolean;
  dannValid: boolean;
  isReadyForSolution: boolean;
  characterCount: number;
  message: string;
} {
  const cleanWenn = (wenn || '').trim();
  const cleanDann = (dann || '').trim();

  // At least 10 chars each to ensure a complete, thought-out clause
  const wennValid = cleanWenn.length >= 10;
  const dannValid = cleanDann.length >= 10;
  const isReadyForSolution = wennValid && dannValid;

  let message = 'Formulieren Sie bitte sowohl die WENN-Bedingung als auch die DANN-Rechtsfolge aus.';
  if (wennValid && !dannValid) {
    message = 'WENN-Teil ist erfasst. Ergänzen Sie noch die konkrete DANN-Maßnahme.';
  } else if (!wennValid && dannValid) {
    message = 'DANN-Teil ist erfasst. Präzisieren Sie noch die WENN-Situation (Krankheitszustand).';
  } else if (isReadyForSolution) {
    message = 'Hervorragend! Beide Teilsätze sind ausformuliert. Musterlösung steht bereit.';
  }

  return {
    wennValid,
    dannValid,
    isReadyForSolution,
    characterCount: cleanWenn.length + cleanDann.length,
    message,
  };
}

/**
 * Compute progress metrics across all 6 classroom phases
 */
export interface ClassroomStateSummary {
  quizPassed: boolean;
  pvSentencesEntered: boolean;
  comparisonAnswersCount: number;
  checklistsCheckedCount: number;
  casesCompletedCount: number;
}

export function computeOverallProgress(data: ClassroomStateSummary): {
  percentage: number;
  completedPhases: number[];
  achievements: string[];
} {
  const completedPhases: number[] = [];
  const achievements: string[] = [];

  // Phase 1 check
  if (data.quizPassed) {
    completedPhases.push(1);
    achievements.push('Rechtsbegriff-Profi (Quiz 100%)');
  }

  // Phase 2 check
  if (data.pvSentencesEntered) {
    completedPhases.push(2);
    achievements.push('Selbstbestimmt-Autor');
  }

  // Phase 3 check
  if (data.comparisonAnswersCount >= 3) {
    completedPhases.push(3);
    achievements.push('Tandem-Analytiker');
  }

  // Phase 4 & 5 check
  if (data.checklistsCheckedCount >= 2) {
    completedPhases.push(4);
    completedPhases.push(5);
    achievements.push('Stresstest-Auditor');
  }

  // Phase 6 check
  if (data.casesCompletedCount >= 3) {
    achievements.push('Fallberater (3+ Fälle)');
  }
  if (data.casesCompletedCount === 6) {
    completedPhases.push(6);
    achievements.push('Rechts-Konsil Meister (Alle 6 Fälle)');
  }

  // Weighting
  let points = 0;
  if (data.quizPassed) points += 20;
  if (data.pvSentencesEntered) points += 15;
  points += Math.min(15, data.comparisonAnswersCount * 4);
  points += Math.min(15, data.checklistsCheckedCount * 5);
  points += Math.min(35, data.casesCompletedCount * 6);

  const percentage = Math.min(100, Math.round(points));

  return {
    percentage,
    completedPhases,
    achievements,
  };
}

/**
 * Proposal 3: Instant Keyword-Spotting & Quality Feedback for Student Repairs
 */
export interface ClauseQualityAnalysis {
  wennScore: 'excellent' | 'good' | 'vague' | 'empty';
  dannScore: 'excellent' | 'good' | 'vague' | 'empty';
  wennKeywordsFound: string[];
  dannKeywordsFound: string[];
  wennTip: string;
  dannTip: string;
}

export function analyzeClauseQuality(wennText: string, dannText: string): ClauseQualityAnalysis {
  const w = (wennText || '').toLowerCase().trim();
  const d = (dannText || '').toLowerCase().trim();

  // WENN Keywords (specific disease / condition)
  const wennKeyList = [
    'endstadium', 'unheilbar', 'koma', 'demenz', 'fortgeschritten',
    'tödlich', 'irreversibel', 'sterbeprozess', 'aussichtslos',
    'hirnschädigung', 'versagen', 'tumor', 'metastasen', 'schwerer',
    'krankheit', 'leiden', 'erledigt', 'als', 'copd'
  ];
  const wennFound = wennKeyList.filter((k) => w.includes(k));

  // DANN Keywords (specific medical measures / interventions)
  const dannKeyList = [
    'beatmung', 'ernährung', 'peg', 'dialyse', 'reanimation',
    'palliative', 'schmerztherapie', 'einstellung', 'einstellen',
    'unterlassen', 'schmerzlinderung', 'sedierung', 'ablehnen',
    'verzichten', 'übernahme', 'katheter', 'operation', 'eingriff',
    'lebensverlängernd', 'flüssigkeit'
  ];
  const dannFound = dannKeyList.filter((k) => d.includes(k));

  let wennScore: 'excellent' | 'good' | 'vague' | 'empty' = 'empty';
  let wennTip = 'Geben Sie einen spezifischen Krankheitszustand an (WENN).';
  if (w.length >= 15 && wennFound.length >= 2) {
    wennScore = 'excellent';
    wennTip = '🟢 Perfekt! Konkreter Krankheitszustand / Diagnose eindeutig benannt.';
  } else if (w.length >= 8 && wennFound.length >= 1) {
    wennScore = 'good';
    wennTip = '🟢 Gut! Krankheitszustand erkannt. (Ergänzen Sie ggf. BGH-Details).';
  } else if (w.length > 0) {
    wennScore = 'vague';
    wennTip = '🟡 Vage / unbestimmt – Tipp: Verwenden Sie präzise Diagnosen wie „Endstadium einer unheilbaren Erkrankung“ oder „irreversibles Koma“.';
  }

  let dannScore: 'excellent' | 'good' | 'vague' | 'empty' = 'empty';
  let dannTip = 'Spezifizieren Sie die konkrete medizinische Maßnahme (DANN).';
  if (d.length >= 15 && dannFound.length >= 2) {
    dannScore = 'excellent';
    dannTip = '🟢 Perfekt! Medizinische Maßnahmen (z. B. Beatmung, PEG, Palliative Care) unmissverständlich geregelt.';
  } else if (d.length >= 8 && dannFound.length >= 1) {
    dannScore = 'good';
    dannTip = '🟢 Gut! Medizinische Maßnahme genannt.';
  } else if (d.length > 0) {
    dannScore = 'vague';
    dannTip = '🟡 Unkonkret – Tipp: Benennen Sie explizit Heileingriffe wie „künstliche Beatmung“, „Sondenernährung (PEG)“, „Dialyse“ oder „Palliative Schmerztherapie“.';
  }

  return {
    wennScore,
    dannScore,
    wennKeywordsFound: wennFound,
    dannKeywordsFound: dannFound,
    wennTip,
    dannTip,
  };
}

/**
 * Proposal 1: Adaptive Competence Badges & Micro-Credentials
 */
export interface CompetenceBadge {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  unlocked: boolean;
  phaseId: number;
}

export function getCompetenceBadges(data: any): CompetenceBadge[] {
  const completedPhases: number[] = data?.completedPhases || [];

  return [
    {
      id: 'b1',
      title: 'Rechtsbegriffe-Expert:in',
      subtitle: 'Alle 4 Vorsorgeinstrumente fehlerfrei im Quiz zugeordnet',
      icon: '🎓',
      color: 'from-blue-600 to-indigo-600',
      unlocked: completedPhases.includes(1) || (data?.quizSubmitted && data?.quizScore === 4),
      phaseId: 1,
    },
    {
      id: 'b2',
      title: 'Perspektiven-Pionier:in',
      subtitle: 'Eigenen Verfügungstext erprobt & Stolpersteine dokumentiert',
      icon: '📑',
      color: 'from-sky-600 to-emerald-600',
      unlocked: completedPhases.includes(2) || Boolean((data?.ownPvSentences || '').trim().length > 10),
      phaseId: 2,
    },
    {
      id: 'b3',
      title: 'System-Analytiker:in',
      subtitle: 'Tandem-Vergleich anhand der 4 Leitfragen abgeschlossen',
      icon: '⚖️',
      color: 'from-indigo-600 to-purple-600',
      unlocked:
        completedPhases.includes(3) ||
        [data?.comparisonQ1, data?.comparisonQ2, data?.comparisonQ3, data?.comparisonQ4].filter(
          (a) => (a || '').trim().length > 5
        ).length >= 3,
      phaseId: 3,
    },
    {
      id: 'b4',
      title: 'BGH-Prüfingenieur:in',
      subtitle: '6 Voraussetzungen & Eigen-Check Stresstest absolviert',
      icon: '🛡️',
      color: 'from-amber-500 to-emerald-600',
      unlocked:
        completedPhases.includes(4) ||
        completedPhases.includes(5) ||
        Boolean((data?.selfCheckReflection || '').trim().length > 10),
      phaseId: 5,
    },
    {
      id: 'b5',
      title: 'Klausel-Mechaniker:in',
      subtitle: 'Gebrauchsuntaugliche Patientenverfügungen BGH-konform repariert',
      icon: '🛠️',
      color: 'from-violet-600 to-purple-600',
      unlocked:
        completedPhases.includes(6) ||
        Object.values(data?.cases || {}).filter(
          (c: any) => c.completed || (c.wenn && c.dann)
        ).length >= 3,
      phaseId: 6,
    },
    {
      id: 'b6',
      title: 'Palliative Care Rechtsexpert:in',
      subtitle: 'Gesamtes Schulungsmodul Patientenverfügung & Strafrecht I gemeistert',
      icon: '🏆',
      color: 'from-amber-400 via-emerald-500 to-blue-600',
      unlocked:
        completedPhases.length >= 6 ||
        Object.values(data?.cases || {}).filter((c: any) => c.completed).length === 6,
      phaseId: 6,
    },
  ];
}

