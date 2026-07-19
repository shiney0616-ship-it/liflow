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

  export const BRANCH_SAMHAP = [
    {branches: ['申', '子', '辰'], element: 'water'},
    {branches: ['亥', '卯', '未'], element: 'wood'},
    {branches: ['寅', '午', '戌'], element: 'fire'},
    {branches: ['巳', '酉', '丑'], element: 'metal'},
  ] as const;

  export const BRANCH_BANGHAP = [
    {branches: ['寅', '卯', '辰'], element: 'wood'},
    {branches: ['巳', '午', '未'], element: 'fire'},
    {branches: ['申', '酉', '戌'], element: 'metal'},
    {branches: ['亥', '子', '丑'], element: 'water'},
  ] as const;

  export const BRANCH_WONJIN = [
    ['子', '未'],
    ['丑', '午'],
    ['寅', '酉'],
    ['卯', '申'],
    ['辰', '亥'],
    ['巳', '戌'],
  ] as const;

  export const BRANCH_GWIMUN = [
    ['子', '酉'],
    ['丑', '午'],
    ['寅', '未'],
    ['卯', '申'],
    ['辰', '亥'],
    ['巳', '戌'],
  ] as const;

  export const STEM_HAP = [
    {
        stems:['甲','己'],
        element:'earth',
    },
    {
        stems:['乙','庚'],
        element:'metal',
    },
    {
        stems:['丙','辛'],
        element:'water',
    },
    {
        stems:['丁','壬'],
        element:'wood',
    },
    {
        stems:['戊','癸'],
        element:'fire',
    },
  ] as const;

  export const STEM_CHUNG = [
    ['甲', '庚'],
    ['乙', '辛'],
    ['丙', '壬'],
    ['丁', '癸'],
  ] as const;