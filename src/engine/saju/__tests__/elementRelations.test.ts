import {
    controls,
    generates,
    getElementRelation,
    isSameElement,
} from '../elementRelations';
  
  describe('elementRelations', () => {
    describe('generates', () => {
      it('목은 화를 생한다', () => {
        expect(
          generates('wood', 'fire'),
        ).toBe(true);
      });
  
      it('목은 토를 생하지 않는다', () => {
        expect(
          generates('wood', 'earth'),
        ).toBe(false);
      });
    });
  
    describe('controls', () => {
      it('목은 토를 극한다', () => {
        expect(
          controls('wood', 'earth'),
        ).toBe(true);
      });
  
      it('목은 화를 극하지 않는다', () => {
        expect(
          controls('wood', 'fire'),
        ).toBe(false);
      });
    });
  
    describe('isSameElement', () => {
      it('같은 오행을 판별한다', () => {
        expect(
          isSameElement('earth', 'earth'),
        ).toBe(true);
      });
    });
  
    describe('getElementRelation', () => {
      it('같은 오행 관계를 반환한다', () => {
        expect(
          getElementRelation(
            'earth',
            'earth',
          ),
        ).toBe('same');
      });
  
      it('내가 상대를 생하는 관계를 반환한다', () => {
        expect(
          getElementRelation(
            'wood',
            'fire',
          ),
        ).toBe('generates');
      });
  
      it('상대가 나를 생하는 관계를 반환한다', () => {
        expect(
          getElementRelation(
            'fire',
            'wood',
          ),
        ).toBe('generatedBy');
      });
  
      it('내가 상대를 극하는 관계를 반환한다', () => {
        expect(
          getElementRelation(
            'wood',
            'earth',
          ),
        ).toBe('controls');
      });
  
      it('상대가 나를 극하는 관계를 반환한다', () => {
        expect(
          getElementRelation(
            'earth',
            'wood',
          ),
        ).toBe('controlledBy');
      });
    });
  });