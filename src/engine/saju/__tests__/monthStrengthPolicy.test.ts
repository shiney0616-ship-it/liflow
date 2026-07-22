import {
    MONTH_STRENGTH_MAX_SCORE,
    MONTH_STRENGTH_POLICY,
} from '../strength/month/monthStrengthPolicy';
  
  describe('MONTH_STRENGTH_POLICY', () => {
    it('월령의 최대 절대 점수는 40점이다', () => {
      expect(MONTH_STRENGTH_MAX_SCORE).toBe(40);
    });
  
    it('모든 오행 관계에 대한 정책이 존재한다', () => {
      expect(
        Object.keys(MONTH_STRENGTH_POLICY).sort(),
      ).toEqual(
        [
          'same',
          'generates',
          'generatedBy',
          'controls',
          'controlledBy',
        ].sort(),
      );
    });
  
    it('모든 월령 점수는 최대 절대 점수를 넘지 않는다', () => {
      Object.values(MONTH_STRENGTH_POLICY).forEach(
        ({ score }) => {
          expect(
            Math.abs(score),
          ).toBeLessThanOrEqual(
            MONTH_STRENGTH_MAX_SCORE,
          );
        },
      );
    });
  
    it('지원 관계는 양수이고 소모·억제 관계는 음수이다', () => {
      Object.values(MONTH_STRENGTH_POLICY).forEach(
        ({ effect, score }) => {
          if (effect === 'support') {
            expect(score).toBeGreaterThan(0);
          } else {
            expect(score).toBeLessThan(0);
          }
        },
      );
    });
  });