import {
    createScoreDetail,
} from '../strength/createScoreDetail';

describe('createScoreDetail', () => {
  it('보정값이 없으면 0으로 처리한다', () => {
    const result = createScoreDetail({
      category: 'month',
      baseScore: 30,
      reasonCode: 'MONTH_GENERATES',
    });

    expect(result).toEqual({
      category: 'month',

      baseScore: 30,
      modifier: 0,
      score: 30,

      reasonCode: 'MONTH_GENERATES',
      metadata: undefined,
    });
  });

  it('원점수와 보정점수를 합산한다', () => {
    const result = createScoreDetail({
      category: 'root',
      baseScore: 12,
      modifier: 3,
      reasonCode: 'ROOT_MAIN',
    });

    expect(result.score).toBe(15);
    expect(result.baseScore).toBe(12);
    expect(result.modifier).toBe(3);
  });

  it('음수 보정값을 적용한다', () => {
    const result = createScoreDetail({
      category: 'month',
      baseScore: 30,
      modifier: -5,
      reasonCode: 'MONTH_GENERATES',
    });

    expect(result.score).toBe(25);
  });

  it('metadata를 그대로 보존한다', () => {
    const result = createScoreDetail({
      category: 'month',
      baseScore: 30,
      reasonCode: 'MONTH_GENERATES',

      metadata: {
        monthElement: 'fire',
        dayMasterElement: 'earth',
      },
    });

    expect(result.metadata).toEqual({
      monthElement: 'fire',
      dayMasterElement: 'earth',
    });
  });
});