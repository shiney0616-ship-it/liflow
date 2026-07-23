import { calculateStemStrength } from '../strength/stem/calculateStemStrength';

describe('calculateStemStrength', () => {
  it('己土 일간의 천간 득세를 계산한다', () => {
    const result = calculateStemStrength(
      '己',
      [
        {
          position: 'year',
          stem: '戊',
        },
        {
          position: 'month',
          stem: '丁',
        },
        {
          position: 'day',
          stem: '己',
        },
        {
          position: 'hour',
          stem: '甲',
        },
      ],
    );

    expect(result.stems).toEqual([
      expect.objectContaining({
        position: 'year',
        stem: '戊',
        relation: 'same',
        baseScore: 5,
        modifier: 0,
        score: 5,
      }),

      expect.objectContaining({
        position: 'month',
        stem: '丁',
        relation: 'generatedBy',
        baseScore: 4,
        modifier: 0,
        score: 4,
      }),

      expect.objectContaining({
        position: 'hour',
        stem: '甲',
        relation: 'controlledBy',
        baseScore: -2,
        modifier: 0,
        score: -2,
      }),
    ]);

    expect(result.totalScore).toBe(7);
    expect(result.details).toHaveLength(3);
  });

  it('일간 자신은 천간 득세 계산에서 제외한다', () => {
    const result = calculateStemStrength(
      '己',
      [
        {
          position: 'day',
          stem: '己',
        },
      ],
    );
  
    expect(result.stems).toEqual([]);
    expect(result.totalScore).toBe(0);
    expect(result.details).toEqual([]);
  });

  it('천간 득세 점수는 최대 15점으로 제한한다', () => {
    const result = calculateStemStrength(
      '甲',
      [
        {
          position: 'year',
          stem: '甲',
        },
        {
          position: 'month',
          stem: '乙',
        },
        {
          position: 'hour',
          stem: '甲',
        },
      ],
    );
  
    expect(result.totalScore).toBe(15);
  });

  it('천간 득세 합계가 음수이면 0점으로 제한한다', () => {
    const result = calculateStemStrength(
      '甲',
      [
        {
          position: 'year',
          stem: '庚',
        },
        {
          position: 'month',
          stem: '辛',
        },
        {
          position: 'hour',
          stem: '庚',
        },
      ],
    );
  
    expect(result.totalScore).toBe(0);
  });
});