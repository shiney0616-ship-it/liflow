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
        relationKind: 'pair',
        pillars: ['year', 'day'],
        stems: ['甲', '己'],
        element: 'earth',
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '간합',
        relationKind: 'pair',
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
        relationKind: 'pair',
        pillars: ['year', 'month'],
        stems: ['壬', '丙'],
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '간충',
        relationKind: 'pair',
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

  describe('쟁합', () => {
    it('두 양간이 하나의 음간과 합하면 쟁합을 찾는다', () => {
      const result = findStemRelations([
        {
          position: 'year',
          stem: '甲',
        },
        {
          position: 'month',
          stem: '己',
        },
        {
          position: 'day',
          stem: '甲',
        },
        {
          position: 'time',
          stem: '丙',
        },
      ]);
  
      expect(result).toContainEqual({
        type: '쟁합',
        relationKind: 'multi',
        pillars: [
          'month',
          'year',
          'day',
        ],
        stems: [
          '己',
          '甲',
          '甲',
        ],
        score: 2,
      });
    });
    it('두 음간이 하나의 양간과 합하면 투합을 찾는다', () => {
      const result = findStemRelations([
        {
          position: 'year',
          stem: '己',
        },
        {
          position: 'month',
          stem: '甲',
        },
        {
          position: 'day',
          stem: '己',
        },
        {
          position: 'time',
          stem: '丙',
        },
      ]);
    
      expect(result).toContainEqual({
        type: '투합',
        relationKind: 'multi',
        pillars: [
          'month',
          'year',
          'day',
        ],
        stems: [
          '甲',
          '己',
          '己',
        ],
        score: 2,
      });
    });

    it('반복된 상대 천간을 중심으로 잘못된 쟁합을 만들지 않는다', () => {
      const result = findStemRelations([
        {
          position: 'year',
          stem: '甲',
        },
        {
          position: 'month',
          stem: '己',
        },
        {
          position: 'day',
          stem: '己',
        },
        {
          position: 'time',
          stem: '丙',
        },
      ]);
    
      const contestRelations = result.filter(
        relation => relation.type === '쟁합' || relation.type === '투합',
      );
    
      expect(contestRelations).toHaveLength(1);
    });

    it('서로 독립된 간합 두 개는 쟁합이 아니다', () => {
      const result = findStemRelations([
        {
          position: 'year',
          stem: '甲',
        },
        {
          position: 'month',
          stem: '己',
        },
        {
          position: 'day',
          stem: '乙',
        },
        {
          position: 'time',
          stem: '庚',
        },
      ]);
    
      expect(
        result.some(
          relation => relation.type === '쟁합',
        ),
      ).toBe(false);
    });

    it('투합을 쟁합으로 중복 검출하지 않는다', () => {
      const result = findStemRelations([
        {
          position: 'year',
          stem: '己',
        },
        {
          position: 'month',
          stem: '甲',
        },
        {
          position: 'day',
          stem: '己',
        },
        {
          position: 'time',
          stem: '丙',
        },
      ]);
    
      expect(
        result.filter(
          relation =>
            relation.type === '쟁합' ||
            relation.type === '투합',
        ),
      ).toHaveLength(1);
    
      expect(
        result.some(
          relation => relation.type === '쟁합',
        ),
      ).toBe(false);
    });
  });