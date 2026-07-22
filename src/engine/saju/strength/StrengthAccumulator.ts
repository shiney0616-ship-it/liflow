import type {
    ScoreDetail,
} from './types';
  
  export class StrengthAccumulator {
    private details: ScoreDetail[] = [];
  
    add(detail: ScoreDetail): void {
      const expectedScore =
        detail.baseScore + detail.modifier;
  
      if (detail.score !== expectedScore) {
        throw new Error(
          `신강 점수가 올바르지 않습니다: ` +
          `${detail.baseScore} + ${detail.modifier} !== ${detail.score}`,
        );
      }
  
      this.details.push(detail);
    }
  
    addMany(details: ScoreDetail[]): void {
      details.forEach((detail) => {
        this.add(detail);
      });
    }
  
    getDetails(): ScoreDetail[] {
      return [...this.details];
    }
  
    getTotalScore(): number {
      return this.details.reduce(
        (sum, detail) => sum + detail.score,
        0,
      );
    }
  
    clear(): void {
      this.details = [];
    }
  }