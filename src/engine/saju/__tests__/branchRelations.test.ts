import {
    findBranchRelations,
    getHyungInfo,
    isChung,
    isHae,
    isHyung,
    isPa,
    isYukhap,
} from '../relations/branchRelations';
  
describe('충', () => {
    test('자오충', () => {
      expect(isChung('子', '午')).toBe(true);
      expect(isChung('午', '子')).toBe(true);
    });
  
    test('축미충', () => {
      expect(isChung('丑', '未')).toBe(true);
    });
  
    test('충이 아니다', () => {
      expect(isChung('子', '丑')).toBe(false);
    });
  });
  
  describe('육합', () => {
    test('자축합', () => {
      expect(isYukhap('子', '丑')).toBe(true);
      expect(isYukhap('丑', '子')).toBe(true);
    });
  
    test('육합이 아니다', () => {
      expect(isYukhap('子', '午')).toBe(false);
    });
  });
  
  describe('findBranchRelations', () => {
    test('네 기둥의 모든 조합에서 충과 육합을 찾는다', () => {
      const result = findBranchRelations([
        { position: 'year', branch: '子' },
        { position: 'month', branch: '午' },
        { position: 'day', branch: '丑' },
        { position: 'time', branch: '子' },
      ]);
  
      expect(result).toContainEqual({
        type: '충',
        pillars: ['year', 'month'],
        branches: ['子', '午'],
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '충',
        pillars: ['month', 'time'],
        branches: ['午', '子'],
        score: 3,
      });
  
      expect(result).toContainEqual({
        type: '육합',
        pillars: ['year', 'day'],
        branches: ['子', '丑'],
        score: 2,
      });
  
      expect(result).toContainEqual({
        type: '육합',
        pillars: ['day', 'time'],
        branches: ['丑', '子'],
        score: 2,
      });
    });
  
    test('관계가 없으면 빈 배열을 반환한다', () => {
      const result = findBranchRelations([
        { position: 'year', branch: '子' },
        { position: 'month', branch: '寅' },
        { position: 'day', branch: '辰' },
        { position: 'time', branch: '寅' },
      ]);
  
      expect(result).toEqual([]);
    });

    describe('형', () => {
        test('축술형을 판정한다', () => {
          expect(isHyung('丑', '戌')).toBe(true);
          expect(isHyung('戌', '丑')).toBe(true);
        });
      
        test('형의 세부 유형을 반환한다', () => {
          expect(getHyungInfo('丑', '戌')).toEqual({
            subtype: '축술형',
          });
        });
      
        test('자묘형을 판정한다', () => {
          expect(isHyung('子', '卯')).toBe(true);
          expect(isHyung('卯', '子')).toBe(true);
        });
      
        test('진진자형을 판정한다', () => {
          expect(isHyung('辰', '辰')).toBe(true);
      
          expect(getHyungInfo('辰', '辰')).toEqual({
            subtype: '진진자형',
          });
        });
      
        test('형이 아닌 관계는 false를 반환한다', () => {
          expect(isHyung('子', '寅')).toBe(false);
          expect(getHyungInfo('子', '寅')).toBeUndefined();
        });
      });

      describe('파', () => {
        test('자유파를 판정한다', () => {
          expect(isPa('子', '酉')).toBe(true);
          expect(isPa('酉', '子')).toBe(true);
        });

        test('축진파를 판정한다', () => {
            expect(isPa('丑', '辰')).toBe(true);
            expect(isPa('辰', '丑')).toBe(true);
          });
      
        test('파가 아닌 관계는 false를 반환한다', () => {
            expect(isPa('子', '寅')).toBe(false);
        });

        test('findBranchRelations에서 파를 찾는다', () => {
            const result = findBranchRelations([
                { position: 'year', branch: '子' },
                { position: 'month', branch: '酉' },
            ]);

            expect(result).toContainEqual({
                type: '파',
                pillars: ['year', 'month'],
                branches: ['子', '酉'],
                score: 1,
            });
        });
      });

      describe('해', () => {
        test('자미해를 판정한다', () => {
          expect(isHae('子', '未')).toBe(true);
          expect(isHae('未', '子')).toBe(true);
        });
      
        test('축오해를 판정한다', () => {
          expect(isHae('丑', '午')).toBe(true);
        });
      
        test('해가 아니면 false를 반환한다', () => {
          expect(isHae('子', '午')).toBe(false);
        });
      
        test('findBranchRelations에서 해를 찾는다', () => {
          const result = findBranchRelations([
            { position: 'year', branch: '子' },
            { position: 'month', branch: '未' },
          ]);
      
          expect(result).toContainEqual({
            type: '해',
            pillars: ['year', 'month'],
            branches: ['子', '未'],
            score: 1,
          });
        });
      });
  });