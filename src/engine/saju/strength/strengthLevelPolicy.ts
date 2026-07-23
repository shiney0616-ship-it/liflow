import type {
    StrengthLevel,
} from './types';
  
  export function getStrengthLevel(
    totalScore: number,
  ): StrengthLevel {
    if (totalScore >= 80) {
      return 'veryStrong';
    }
  
    if (totalScore >= 60) {
      return 'strong';
    }
  
    if (totalScore >= 40) {
      return 'balanced';
    }
  
    if (totalScore >= 20) {
      return 'weak';
    }
  
    return 'veryWeak';
  }