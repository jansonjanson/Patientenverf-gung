/**
 * Audio synthesis helper - disabled / silenced per classroom requirements.
 * Functions are no-ops so no unexpected sounds play on student devices.
 */

export const sounds = {
  isMuted: true,
  playClick: () => {},
  playCorrect: () => {},
  playSuccess: () => {},
  playUnlock: () => {},
  playTriumph: () => {},
};
