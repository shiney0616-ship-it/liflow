  export const BRANCH_CHUNG = [
    ['子', '午'],
    ['丑', '未'],
    ['寅', '申'],
    ['卯', '酉'],
    ['辰', '戌'],
    ['巳', '亥'],
  ] as const;
  
  export const BRANCH_YUKHAP = [
    ['子', '丑'],
    ['寅', '亥'],
    ['卯', '戌'],
    ['辰', '酉'],
    ['巳', '申'],
    ['午', '未'],
  ] as const;

  export const BRANCH_HYUNG = [
    //무은지형 
    { branches: ['寅', '巳'], subtype: '인사형'},
    { branches: ['巳', '申'], subtype: '사신형'},
    { branches: ['申', '寅'], subtype: '신인형'},

    //지세지형
    { branches: ['丑', '戌'], subtype: '축술형'},
    { branches: ['戌', '未'], subtype: '술미형'},
    { branches: ['未', '丑'], subtype: '미축형'},

    //무례지형
    { branches: ['子', '卯'], subtype: '자묘형'},

    //자형
    { branches: ['辰', '辰'], subtype: '진진자형'},
    { branches: ['午', '午'], subtype: '오오자형'},
    { branches: ['酉', '酉'], subtype: '유유자형'},
    { branches: ['亥', '亥'], subtype: '해해자형'},
  ] as const;

  export const BRANCH_PA = [
    ['子', '酉'],
    ['丑', '辰'],
    ['寅', '亥'],
    ['卯', '午'],
    ['巳', '申'],
    ['未', '戌'],
  ] as const;

  export const BRANCH_HAE = [
    ['子', '未'],
    ['丑', '午'],
    ['寅', '巳'],
    ['卯', '辰'],
    ['申', '亥'],
    ['酉', '戌'],
  ] as const;