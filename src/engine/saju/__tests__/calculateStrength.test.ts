import {
    calculateStrength,
} from '../strength/calculateStrength';
  
  describe('calculateStrength', () => {
    it('戊午 丁巳 己丑 甲戌 명식의 강약을 계산한다', () => {
      const result = calculateStrength({
        year: {
          stem: '戊',
          branch: '午',
          full: '戊午',
        },
        month: {
          stem: '丁',
          branch: '巳',
          full: '丁巳',
        },
        day: {
          stem: '己',
          branch: '丑',
          full: '己丑',
        },
        hour: {
          stem: '甲',
          branch: '戌',
          full: '甲戌',
        },
      });
  
      expect(result.month.totalScore).toBe(30);
      expect(result.root.totalScore).toBe(30);
      expect(result.stem.totalScore).toBe(7);
      expect(result.distribution.totalScore).toBe(15);
  
      expect(result.totalScore).toBe(82);
      expect(result.level).toBe('veryStrong');
  
      expect(result.details).toHaveLength(
        result.month.details.length +
        result.root.details.length +
        result.stem.details.length +
        result.distribution.details.length,
      );
    });
  });