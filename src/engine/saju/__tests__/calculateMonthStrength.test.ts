import {
  calculateMonthStrength,
} from '../strength/month/calculateMonthStrength';
  
  describe('calculateMonthStrength', () => {
    it('같은 오행의 월지는 일간을 돕는다', () => {
      const result = calculateMonthStrength(
        '己',
        '丑',
      );
    
      expect(result).toMatchObject({
        monthBranch: '丑',
        monthElement: 'earth',
        dayMasterElement: 'earth',
        relation: 'same',
        effect: 'support',
        totalScore: 40,
      });
    
      expect(result.details).toHaveLength(1);
    
      expect(result.details[0]).toMatchObject({
        category: 'month',
        baseScore: 40,
        modifier: 0,
        score: 40,
        reasonCode: 'MONTH_SAME',
      });
    });
  
    it('월지 오행이 일간을 생하면 일간을 돕는다', () => {
      const result = calculateMonthStrength(
        '己',
        '巳',
      );
    
      expect(result).toMatchObject({
        monthBranch: '巳',
        monthElement: 'fire',
        dayMasterElement: 'earth',
        relation: 'generates',
        effect: 'support',
        totalScore: 30,
      });
    
      expect(result.details).toHaveLength(1);
    
      expect(result.details[0]).toMatchObject({
        category: 'month',
        baseScore: 30,
        modifier: 0,
        score: 30,
        reasonCode: 'MONTH_GENERATES',
      });
    });
  
    it('월지 오행이 일간을 극하면 일간을 강하게 억제한다', () => {
      const result = calculateMonthStrength(
        '己',
        '寅',
      );
  
      expect(result.relation).toBe('controls');
      expect(result.effect).toBe('suppress');
      expect(result.totalScore).toBe(-40);
    });
  
    it('일간이 월지 오행을 생하면 일간의 힘이 소모된다', () => {
      const result = calculateMonthStrength(
        '己',
        '申',
      );
  
    expect(result.relation).toBe('generatedBy');
    expect(result.effect).toBe('drain');
    expect(result.totalScore).toBe(-25);
    });
  
    it('일간이 월지 오행을 극하면 일간의 힘이 소모된다', () => {
      const result = calculateMonthStrength(
        '己',
        '子',
      );
  
    expect(result.relation).toBe('controlledBy');
    expect(result.effect).toBe('drain');
    expect(result.totalScore).toBe(-15);
    });

    it('기토 일간은 사화 월령으로부터 30점의 지원을 받는다', () => {
        const result = calculateMonthStrength(
          '己',
          '巳',
        );
      
        expect(result).toMatchObject({
          relation: 'generates',
          effect: 'support',
          totalScore: 30,
        });
      });
  });