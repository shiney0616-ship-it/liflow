import {
    calculateMonthStrength,
} from '../strength/month/calculateMonthStrength';
  
  describe('calculateMonthStrength', () => {
    it('같은 오행의 월지는 일간을 돕는다', () => {
      const result = calculateMonthStrength(
        '丑',
        'earth',
        'earth',
      );
  
      expect(result).toEqual({
        monthBranch: '丑',
        monthElement: 'earth',
        dayMasterElement: 'earth',
        relation: 'same',
        effect: 'support',
        score: 40,
        maxAbsScore: 40,
      });
    });
  
    it('월지 오행이 일간을 생하면 일간을 돕는다', () => {
      const result = calculateMonthStrength(
        '巳',
        'fire',
        'earth',
      );
  
      expect(result).toEqual({
        monthBranch: '巳',
        monthElement: 'fire',
        dayMasterElement: 'earth',
        relation: 'generates',
        effect: 'support',
        score: 30,
        maxAbsScore: 40,
      });
    });
  
    it('월지 오행이 일간을 극하면 일간을 강하게 억제한다', () => {
      const result = calculateMonthStrength(
        '寅',
        'wood',
        'earth',
      );
  
      expect(result.relation).toBe('controls');
      expect(result.effect).toBe('suppress');
      expect(result.score).toBe(-40);
    });
  
    it('일간이 월지 오행을 생하면 일간의 힘이 소모된다', () => {
      const result = calculateMonthStrength(
        '申',
        'metal',
        'earth',
      );
  
    expect(result.relation).toBe('generatedBy');
    expect(result.effect).toBe('drain');
    expect(result.score).toBe(-25);
    });
  
    it('일간이 월지 오행을 극하면 일간의 힘이 소모된다', () => {
      const result = calculateMonthStrength(
        '子',
        'water',
        'earth',
      );
  
    expect(result.relation).toBe('controlledBy');
    expect(result.effect).toBe('drain');
    expect(result.score).toBe(-15);
    });

    it('기토 일간은 사화 월령으로부터 30점의 지원을 받는다', () => {
        const result = calculateMonthStrength(
          '巳',
          'fire',
          'earth',
        );
      
        expect(result).toMatchObject({
          relation: 'generates',
          effect: 'support',
          score: 30,
        });
      });
  });