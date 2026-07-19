import { calculateSaju } from '../calculateSaju';
import { findBranchRelations } from '../relations/branchRelations';

/**
 * 통합 테스트 기준 사주
 *
 * 1978년 5월 27일 20시 00분
 * 양력 / 여성
 *
 * 戊午년 丁巳월 己丑일 甲戌시
 */
describe('내 사주 통합 테스트', () => {
  const result = calculateSaju({
    name:'신은영',
    calendarType: 'solar',
    isLeapMonth: true,
    gender: 'female',

    year: 1978,
    month: 5,
    day: 27,

    hour: 20,
    minute: 0,
    unknownTime: false,
  });

  test('사주 원국이 정확하게 계산된다', () => {
    expect(result.yearPillar.stem).toBe('戊');
    expect(result.yearPillar.branch).toBe('午');

    expect(result.monthPillar.stem).toBe('丁');
    expect(result.monthPillar.branch).toBe('巳');

    expect(result.dayPillar.stem).toBe('己');
    expect(result.dayPillar.branch).toBe('丑');

    expect(result.timePillar?.stem).toBe('甲');
    expect(result.timePillar?.branch).toBe('戌');
  });

  test('천간 십성이 정확하게 계산된다', () => {
    expect(result.yearPillar.stemTenGod).toBe('겁재');
    expect(result.monthPillar.stemTenGod).toBe('편인');
    expect(result.dayPillar.stemTenGod).toBe('비견');
    expect(result.timePillar?.stemTenGod).toBe('정관');
  });

  test('지지 본기 십성이 정확하게 계산된다', () => {
    expect(result.yearPillar.branchMainStem).toBe('丁');
    expect(result.yearPillar.branchTenGod).toBe('편인');

    expect(result.monthPillar.branchMainStem).toBe('丙');
    expect(result.monthPillar.branchTenGod).toBe('정인');

    expect(result.dayPillar.branchMainStem).toBe('己');
    expect(result.dayPillar.branchTenGod).toBe('비견');

    expect(result.timePillar?.branchMainStem).toBe('戊');
    expect(result.timePillar?.branchTenGod).toBe('겁재');
  });

  test('12운성이 정확하게 계산된다', () => {
    expect(result.yearPillar.twelveLifeStage).toBe('건록');
    expect(result.monthPillar.twelveLifeStage).toBe('제왕');
    expect(result.dayPillar.twelveLifeStage).toBe('묘');
    expect(result.timePillar?.twelveLifeStage).toBe('양');
  });

  test('지장간이 정확하게 계산된다', () => {
    expect(result.yearPillar.hiddenStems).toEqual([
      {
        stem: '丙',
        role: 'initial',
        element: 'fire',
        yinYang: 'yang',
        tenGod: '정인',
      },
      {
        stem: '己',
        role: 'middle',
        element: 'earth',
        yinYang: 'yin',
        tenGod: '비견',
      },
      {
        stem: '丁',
        role: 'main',
        element: 'fire',
        yinYang: 'yin',
        tenGod: '편인',
      },
    ]);

    expect(result.monthPillar.hiddenStems).toEqual([
      {
        stem: '戊',
        role: 'initial',
        element: 'earth',
        yinYang: 'yang',
        tenGod: '겁재',
      },
      {
        stem: '庚',
        role: 'middle',
        element: 'metal',
        yinYang: 'yang',
        tenGod: '상관',
      },
      {
        stem: '丙',
        role: 'main',
        element: 'fire',
        yinYang: 'yang',
        tenGod: '정인',
      },
    ]);

    expect(result.dayPillar.hiddenStems).toEqual([
      {
        stem: '癸',
        role: 'initial',
        element: 'water',
        yinYang: 'yin',
        tenGod: '편재',
      },
      {
        stem: '辛',
        role: 'middle',
        element: 'metal',
        yinYang: 'yin',
        tenGod: '식신',
      },
      {
        stem: '己',
        role: 'main',
        element: 'earth',
        yinYang: 'yin',
        tenGod: '비견',
      },
    ]);

    expect(result.timePillar?.hiddenStems).toEqual([
      {
        stem: '辛',
        role: 'initial',
        element: 'metal',
        yinYang: 'yin',
        tenGod: '식신',
      },
      {
        stem: '丁',
        role: 'middle',
        element: 'fire',
        yinYang: 'yin',
        tenGod: '편인',
      },
      {
        stem: '戊',
        role: 'main',
        element: 'earth',
        yinYang: 'yang',
        tenGod: '겁재',
      },
    ]);
  });

  test('무오년 정사월 기축일 갑술시에서 축술형을 찾는다', () => {
    const result = findBranchRelations([
        {position: 'year', branch: '午'},
        {position: 'month', branch: '巳'},
        {position: 'day', branch: '丑'},
        {position: 'time', branch: '戌'},
    ]);

    expect(result).toContainEqual({
        type: '형',
        subtype: '축술형',
        pillars: ['day', 'time'],
        branches: ['丑','戌'],
        score: 2,
    });
  });
});