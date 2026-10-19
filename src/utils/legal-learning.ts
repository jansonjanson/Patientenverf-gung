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
    title: 'Beispiel 1: „Würdevoll sterben“',
    quote: '„Wenn ich einmal sehr krank und nicht mehr in der Lage bin, ein für mich erträgliches umweltbezogenes Leben zu führen…, dann möchte ich würdevoll sterben.“',
    hintQuestion: 'Prüfen Sie WENN- und DANN-Satzteil auf Bestimmtheit.',
    officialProblem: 'WENN: Fehlende Bestimmtheit hinsichtlich des Krankheitszustandes („sehr krank“, „erträgliches umweltbezogenes Leben“). DANN: Fehlende Bestimmtheit hinsichtlich der Handlung oder des Unterlassens („würdevoll sterben“ sagt nichts darüber aus, welche medizinischen Maßnahmen konkret gewünscht oder abgelehnt werden).',
    officialSolution: '„Wenn ich an einer fortschreitenden, unheilbaren Erkrankung leide und keine Aussicht auf Besserung besteht, wünsche ich, dass alle lebensverlängernden Maßnahmen (insbesondere künstliche Beatmung, künstliche Ernährung und Flüssigkeitszufuhr sowie Dialyse) eingestellt und eine palliative Behandlung zur Symptomlinderung durchgeführt wird.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 2,
    title: 'Beispiel 2: „Ich möchte nicht leiden“',
    quote: '„Ich möchte nicht leiden.“',
    hintQuestion: 'Was bedeutet „leiden“ im klinischen Alltag – und welche Situation/Maßnahme ist gemeint?',
    officialProblem: 'Zu unbestimmt – es ist nicht klar, was „leiden“ bedeutet (körperlich, psychisch, sozial?). Keine spezifische medizinische Situation (WENN) oder konkrete Maßnahme (DANN) genannt.',
    officialSolution: '„Wenn ich mich im Endstadium einer unheilbaren, tödlich verlaufenden Erkrankung befinde und starke Schmerzen habe, wünsche ich eine umfassende palliative Versorgung, auch wenn dies mein Bewusstsein trübt.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 3,
    title: 'Beispiel 3: „Keine lebensverlängernden Maßnahmen“',
    quote: '„Ich möchte keine lebensverlängernden Maßnahmen.“',
    hintQuestion: 'Wann genau soll das gelten? Welche Maßnahmen zählen dazu?',
    officialProblem: 'Zu unbestimmt – Wann (in welchem Krankheitszustand)? Welche konkreten Maßnahmen sind mit „lebensverlängernd“ gemeint?',
    officialSolution: '„Wenn ich mich in einem irreversiblen Koma befinde und keine Aussicht auf Wiedererlangung des Bewusstseins besteht, lehne ich lebensverlängernde Maßnahmen wie künstliche Beatmung oder künstliche Ernährung ab.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 4,
    title: 'Beispiel 4: „Meine Familie soll entscheiden“',
    quote: '„Meine Familie soll entscheiden, was mit mir passiert.“',
    hintQuestion: 'Wer genau ist „die Familie“ rechtlich – und was ist der Unterschied zwischen Patientenverfügung und Vorsorgevollmacht?',
    officialProblem: 'Unkonkret – Welche Person genau (Name, Geburtsdatum)? Wann? Was soll entschieden werden? („Die Familie“ hat als Kollektiv kein automatisches Vertretungsrecht).',
    officialSolution: '„Meine bevollmächtigte Person (Name, Geburtsdatum) soll meinen in dieser Verfügung festgelegten Willen gegenüber Ärzten durchsetzen. Falls keine genauen Anweisungen vorliegen, soll sie in meinem Sinne entscheiden.“',
    keyIssues: ['vertretung_unklar', 'dann_unbestimmt'],
  },
  {
    id: 5,
    title: 'Beispiel 5: „Nicht an Schläuche angeschlossen werden“',
    quote: '„Ich will nicht an Schläuche angeschlossen werden.“',
    hintQuestion: 'Welche Schläuche gibt es im Krankenhaus – und dienen alle nur der Lebensverlängerung?',
    officialProblem: 'Unkonkret / vage – Welche Schläuche sind gemeint? Infusion zur Schmerzlinderung? Künstliche Beatmung? Ernährungssonde? Blasenkatheter bei Harnverhalt?',
    officialSolution: '„Ich lehne eine künstliche Beatmung und künstliche Ernährung ab, wenn ich mich im Endstadium einer unheilbaren Erkrankung befinde und keine Aussicht auf Besserung besteht.“',
    keyIssues: ['wenn_unbestimmt', 'dann_unbestimmt'],
  },
  {
    id: 6,
    title: 'Beispiel 6: „Keine Operation bei schwerer Krankheit“',
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
