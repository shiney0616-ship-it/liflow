import {
    StrengthAccumulator,
} from '../strength/StrengthAccumulator';
  
  import type {
    ScoreDetail,
} from '../strength/types';
  
  describe('StrengthAccumulator', () => {
    const monthDetail: ScoreDetail = {
      category: 'month',
  
      baseScore: 30,
      modifier: 0,
      score: 30,
  
      reasonCode: 'MONTH_GENERATES',
  
      metadata: {
        monthElement: 'fire',
        dayMasterElement: 'earth',
      },
    };
  
    const rootDetail: ScoreDetail = {
      category: 'root',
  
      baseScore: 12,
      modifier: 2,
      score: 14,
  
      reasonCode: 'ROOT_MAIN',
  
      metadata: {
        position: 'day',
        branch: '丑',
      },
    };
  
    it('최종 점수를 누적한다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.add(monthDetail);
      accumulator.add(rootDetail);
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(44);
    });
  
    it('원점수가 아니라 최종 score를 합산한다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.add({
        category: 'root',
  
        baseScore: 10,
        modifier: 5,
        score: 15,
  
        reasonCode: 'ROOT_MAIN',
      });
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(15);
    });
  
    it('음수 보정이 적용된 최종 점수를 누적한다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.add({
        category: 'month',
  
        baseScore: 30,
        modifier: -5,
        score: 25,
  
        reasonCode: 'MONTH_GENERATES',
      });
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(25);
    });
  
    it('addMany로 여러 점수 상세를 추가한다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.addMany([
        monthDetail,
        rootDetail,
      ]);
  
      expect(
        accumulator.getDetails(),
      ).toHaveLength(2);
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(44);
    });
  
    it('추가한 상세 정보를 반환한다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.add(monthDetail);
  
      expect(
        accumulator.getDetails(),
      ).toEqual([
        monthDetail,
      ]);
    });
  
    it('반환된 배열을 수정해도 내부 데이터는 바뀌지 않는다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.add(monthDetail);
  
      const details =
        accumulator.getDetails();
  
      details.push(rootDetail);
  
      expect(
        accumulator.getDetails(),
      ).toHaveLength(1);
    });
  
    it('clear를 호출하면 모든 상세 정보와 점수가 초기화된다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      accumulator.addMany([
        monthDetail,
        rootDetail,
      ]);
  
      accumulator.clear();
  
      expect(
        accumulator.getDetails(),
      ).toEqual([]);
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(0);
    });
  
    it('초기 상태의 총점은 0이다', () => {
      const accumulator =
        new StrengthAccumulator();
  
      expect(
        accumulator.getTotalScore(),
      ).toBe(0);
    });

    it('원점수와 보정점수의 합이 최종 점수와 다르면 오류가 발생한다', () => {
        const accumulator =
          new StrengthAccumulator();
      
        expect(() => {
          accumulator.add({
            category: 'month',
      
            baseScore: 30,
            modifier: -5,
            score: 30,
      
            reasonCode: 'MONTH_GENERATES',
          });
        }).toThrow(
          '신강 점수가 올바르지 않습니다',
        );
      });
  });