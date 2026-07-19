import {
    findStemRelations,
    getStemHapInfo,
    isStemChung,
    isStemHap
} from '../relations/stemRelations';
  
  describe('천간합', () => {
    it('갑기합을 찾는다', () => {
      expect(
        getStemHapInfo('甲', '己'),
      ).toEqual({
        stems: ['甲', '己'],
        element: 'earth',
      });
    });
  
    it('순서가 반대여도 갑기합을 찾는다', () => {
      expect(
        getStemHapInfo('己', '甲'),
      ).toEqual({
        stems: ['甲', '己'],
        element: 'earth',
      });
    });
  
    it('합이 아니면 undefined를 반환한다', () => {
      expect(
        getStemHapInfo('甲', '乙'),
      ).toBeUndefined();
    });
  
    it('isStemHap으로 간합 여부를 판별한다', () => {
      expect(isStemHap('丁', '壬')).toBe(true);
      expect(isStemHap('丁', '甲')).toBe(false);
    });
  });

  describe('findStemRelations', () => {
    it('네 천간에서 간합을 찾는다', () => {
      const result = findStemRelations([
        { position: 'year', stem: '甲' },
        { position: 'month', stem: '丙' },
        { position: 'day', stem: '己' },
        { position: 'time', stem: '辛' },
      ]);
  
      expect(result).toContainEqual({
        type: '간합',
        pillars: ['year', 'day'],
        stems: ['甲', '己'],
        element: 'earth',
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '간합',
        pillars: ['month', 'time'],
        stems: ['丙', '辛'],
        element: 'water',
        score: 3,
      });
    });
  
    it('간합이 없으면 빈 배열을 반환한다', () => {
      const result = findStemRelations([
        { position: 'year', stem: '甲' },
        { position: 'month', stem: '乙' },
        { position: 'day', stem: '丙' },
        { position: 'time', stem: '丁' },
      ]);
      expect(result).toEqual([]);
    });
  });

  describe('isStemChung', () => {

    it('갑경충', () => {
        expect(
            isStemChung('甲','庚')
        ).toBe(true);
    });

    it('병임충', () => {
        expect(
            isStemChung('丙','壬')
        ).toBe(true);
    });

    it('충이 아니다', () => {
        expect(
            isStemChung('甲','乙')
        ).toBe(false);
    });
});

describe('findStemRelations', () => {
    it('천간에서 간충을 찾는다', () => {
      const result = findStemRelations([
        { position: 'year', stem: '壬' },
        { position: 'month', stem: '丙' },
        { position: 'day', stem: '乙' },
        { position: 'time', stem: '辛' },
      ]);
  
      expect(result).toContainEqual({
        type: '간충',
        pillars: ['year', 'month'],
        stems: ['壬', '丙'],
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '간충',
        pillars: ['day', 'time'],
        stems: ['乙', '辛'],
        score: 3,
      });
    });
  
    it('간충이 없으면 빈 배열을 반환한다', () => {
      const result = findStemRelations([
        { position: 'year', stem: '甲' },
        { position: 'month', stem: '乙' },
        { position: 'day', stem: '丙' },
        { position: 'time', stem: '丁' },
      ]);
      expect(result).toEqual([]);
    });
  });