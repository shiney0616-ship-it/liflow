import { calculateDistributionStrength } from '../strength/distribution/calculateDistributionStrength';

describe('calculateDistributionStrength', () => {
  it('己土 일간의 팔자 오행 분포를 계산한다', () => {
    const result = calculateDistributionStrength(
      '己',
      {
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
      },
    );

    expect(result.distributions).toHaveLength(7);
    expect(result.details).toHaveLength(7);

    expect(result.distributions).toEqual([
      expect.objectContaining({
        position: 'year',
        source: 'stem',
        stem: '戊',
        element: 'earth',
        relation: 'same',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),
      expect.objectContaining({
        position: 'year',
        source: 'branch',
        branch: '午',
        element: 'fire',
        relation: 'generatedBy',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),

      expect.objectContaining({
        position: 'month',
        source: 'stem',
        stem: '丁',
        element: 'fire',
        relation: 'generatedBy',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),
      expect.objectContaining({
        position: 'month',
        source: 'branch',
        branch: '巳',
        element: 'fire',
        relation: 'generatedBy',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),

      /*
       * 일간 己는 분포 계산에서 제외하고,
       * 일지 丑만 포함한다.
       */
      expect.objectContaining({
        position: 'day',
        source: 'branch',
        branch: '丑',
        element: 'earth',
        relation: 'same',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),

      expect.objectContaining({
        position: 'hour',
        source: 'stem',
        stem: '甲',
        element: 'wood',
        relation: 'controlledBy',
        baseScore: -3,
        modifier: 0,
        score: -3,
      }),
      expect.objectContaining({
        position: 'hour',
        source: 'branch',
        branch: '戌',
        element: 'earth',
        relation: 'same',
        baseScore: 3,
        modifier: 0,
        score: 3,
      }),
    ]);

    /*
     * 3 + 3 + 3 + 3 + 3 - 3 + 3 = 15
     */
    expect(result.totalScore).toBe(15);
  });

  it('일간 자신은 천간 분포에서 제외한다', () => {
    const result = calculateDistributionStrength(
      '己',
      {
        year: {
          stem: '甲',
          branch: '子',
          full: '甲子',
        },
        month: {
          stem: '乙',
          branch: '亥',
          full: '乙亥',
        },
        day: {
          stem: '己',
          branch: '卯',
          full: '己卯',
        },
        hour: {
          stem: '丙',
          branch: '寅',
          full: '丙寅',
        },
      },
    );

    const dayStemResult = result.distributions.find(
      item =>
        item.position === 'day' &&
        item.source === 'stem',
    );

    expect(dayStemResult).toBeUndefined();

    const dayBranchResult = result.distributions.find(
      item =>
        item.position === 'day' &&
        item.source === 'branch',
    );

    expect(dayBranchResult).toEqual(
      expect.objectContaining({
        position: 'day',
        source: 'branch',
        branch: '卯',
      }),
    );

    expect(result.distributions).toHaveLength(7);
  });

  it('분포 원점수가 음수이면 최종점수를 0점으로 제한한다', () => {
    const result = calculateDistributionStrength(
      '甲',
      {
        year: {
          stem: '庚',
          branch: '申',
          full: '庚申',
        },
        month: {
          stem: '辛',
          branch: '酉',
          full: '辛酉',
        },
        day: {
          stem: '甲',
          branch: '申',
          full: '甲申',
        },
        hour: {
          stem: '庚',
          branch: '酉',
          full: '庚酉',
        },
      },
    );

    expect(result.distributions).toHaveLength(7);

    expect(
      result.distributions.every(
        item =>
          item.relation === 'controlledBy',
      ),
    ).toBe(true);

    expect(result.totalScore).toBe(0);
  });

  it('분포 점수는 최대 15점으로 제한한다', () => {
    const result = calculateDistributionStrength(
      '甲',
      {
        year: {
          stem: '甲',
          branch: '寅',
          full: '甲寅',
        },
        month: {
          stem: '乙',
          branch: '卯',
          full: '乙卯',
        },
        day: {
          stem: '甲',
          branch: '寅',
          full: '甲寅',
        },
        hour: {
          stem: '乙',
          branch: '卯',
          full: '乙卯',
        },
      },
    );

    /*
     * 일간을 제외한 7개가 모두 same이고,
     * 원점수는 7 × 3 = 21점이다.
     */
    expect(
      result.distributions.every(
        item => item.relation === 'same',
      ),
    ).toBe(true);

    expect(result.totalScore).toBe(15);
  });
});