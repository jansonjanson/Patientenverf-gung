import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkQuizAnswers,
  evaluateCaseFormulation,
  computeOverallProgress,
  QUIZ_QUESTIONS,
  CASES_DATA,
} from './legal-learning.ts';

test('QUIZ_QUESTIONS has 4 questions matching official slides', () => {
  assert.equal(QUIZ_QUESTIONS.length, 4);
  assert.equal(CASES_DATA.length, 6);
});

test('checkQuizAnswers scores correct responses accurately', () => {
  const perfectAnswers = {
    q1: 'pv',
    q2: 'vv',
    q3: 'ehe',
    q4: 'bv',
  };

  const result = checkQuizAnswers(perfectAnswers);
  assert.equal(result.score, 4);
  assert.equal(result.total, 4);
  assert.equal(result.isPerfect, true);
  assert.equal(result.results.q1, true);
  assert.equal(result.results.q2, true);
  assert.equal(result.results.q3, true);
  assert.equal(result.results.q4, true);
});

test('checkQuizAnswers identifies wrong responses', () => {
  const partialAnswers = {
    q1: 'bv', // wrong
    q2: 'vv', // right
    q3: 'vv', // wrong
    q4: 'bv', // right
  };

  const result = checkQuizAnswers(partialAnswers);
  assert.equal(result.score, 2);
  assert.equal(result.isPerfect, false);
  assert.equal(result.results.q1, false);
  assert.equal(result.results.q2, true);
  assert.equal(result.results.q3, false);
  assert.equal(result.results.q4, true);
});

test('evaluateCaseFormulation requires both WENN and DANN clauses', () => {
  const incomplete1 = evaluateCaseFormulation('kurz', 'kurz');
  assert.equal(incomplete1.isReadyForSolution, false);
  assert.equal(incomplete1.wennValid, false);
  assert.equal(incomplete1.dannValid, false);

  const incomplete2 = evaluateCaseFormulation(
    'Wenn ich an einer unheilbaren tödlichen Krankheit leide',
    'nein'
  );
  assert.equal(incomplete2.wennValid, true);
  assert.equal(incomplete2.dannValid, false);
  assert.equal(incomplete2.isReadyForSolution, false);

  const complete = evaluateCaseFormulation(
    'Wenn ich mich im Endstadium einer unheilbaren Erkrankung befinde',
    'lehne ich alle lebensverlängernden Maßnahmen ab'
  );
  assert.equal(complete.wennValid, true);
  assert.equal(complete.dannValid, true);
  assert.equal(complete.isReadyForSolution, true);
});

test('computeOverallProgress calculates percentage and unlockable badges', () => {
  const emptyState = computeOverallProgress({
    quizPassed: false,
    pvSentencesEntered: false,
    comparisonAnswersCount: 0,
    checklistsCheckedCount: 0,
    casesCompletedCount: 0,
  });
  assert.equal(emptyState.percentage, 0);
  assert.equal(emptyState.completedPhases.length, 0);

  const fullState = computeOverallProgress({
    quizPassed: true,
    pvSentencesEntered: true,
    comparisonAnswersCount: 4,
    checklistsCheckedCount: 3,
    casesCompletedCount: 6,
  });
  assert.equal(fullState.percentage, 100);
  assert.ok(fullState.completedPhases.includes(1));
  assert.ok(fullState.completedPhases.includes(6));
  assert.ok(fullState.achievements.length >= 4);
});
