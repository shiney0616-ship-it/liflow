import type {
    Element,
    ElementRelation,
} from './types';
  
  const GENERATES: Record<Element, Element> = {
    wood: 'fire',
    fire: 'earth',
    earth: 'metal',
    metal: 'water',
    water: 'wood',
  };
  
  const CONTROLS: Record<Element, Element> = {
    wood: 'earth',
    fire: 'metal',
    earth: 'water',
    metal: 'wood',
    water: 'fire',
  };
  
  export function generates(
    source: Element,
    target: Element,
  ): boolean {
    return GENERATES[source] === target;
  }
  
  export function controls(
    source: Element,
    target: Element,
  ): boolean {
    return CONTROLS[source] === target;
  }
  
  export function isSameElement(
    source: Element,
    target: Element,
  ): boolean {
    return source === target;
  }
  
  export function getElementRelation(
    source: Element,
    target: Element,
  ): ElementRelation {
    if (source === target) {
      return 'same';
    }
  
    if (generates(source, target)) {
      return 'generates';
    }
  
    if (generates(target, source)) {
      return 'generatedBy';
    }
  
    if (controls(source, target)) {
      return 'controls';
    }
  
    if (controls(target, source)) {
      return 'controlledBy';
    }
  
    throw new Error(
      `오행 관계를 판별할 수 없습니다: ${source}, ${target}`,
    );
  }