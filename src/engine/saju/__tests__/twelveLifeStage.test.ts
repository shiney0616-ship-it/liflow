import { calculateTwelveLifeStage } from '../twelveLifeStage';

describe('12운성', () => {
  test('己일간', () => {
    expect(calculateTwelveLifeStage('己', '午')).toBe('건록');
    expect(calculateTwelveLifeStage('己', '巳')).toBe('제왕');
    expect(calculateTwelveLifeStage('己', '丑')).toBe('묘');
    expect(calculateTwelveLifeStage('己', '戌')).toBe('양');
  });

  test('甲일간', () => {
    expect(calculateTwelveLifeStage('甲', '亥')).toBe('장생');
    expect(calculateTwelveLifeStage('甲', '子')).toBe('목욕');
    expect(calculateTwelveLifeStage('甲', '丑')).toBe('관대');
    expect(calculateTwelveLifeStage('甲', '寅')).toBe('건록');
    expect(calculateTwelveLifeStage('甲', '卯')).toBe('제왕');
  });

  test('乙일간', () => {
    expect(calculateTwelveLifeStage('乙', '午')).toBe('장생');
    expect(calculateTwelveLifeStage('乙', '巳')).toBe('목욕');
    expect(calculateTwelveLifeStage('乙', '辰')).toBe('관대');
    expect(calculateTwelveLifeStage('乙', '卯')).toBe('건록');
    expect(calculateTwelveLifeStage('乙', '寅')).toBe('제왕');
  });

  test('甲은 12운성이 중복 없이 나온다', () => {
    const branches = [
      '子','丑','寅','卯','辰','巳',
      '午','未','申','酉','戌','亥',
    ];

    const result = branches.map(branch =>
      calculateTwelveLifeStage('甲', branch)
    );

    expect(new Set(result).size).toBe(12);
  });
});