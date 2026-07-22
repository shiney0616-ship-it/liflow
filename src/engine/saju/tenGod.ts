import type {
  Element,
  TenGod,
  YinYang,
} from './types';

type StemInfo = {
  element: Element;
  yinYang: YinYang;
};
  
  const STEM_INFO: Record<string, StemInfo> = {
    甲: { element: 'wood', yinYang: 'yang' },
    乙: { element: 'wood', yinYang: 'yin' },
  
    丙: { element: 'fire', yinYang: 'yang' },
    丁: { element: 'fire', yinYang: 'yin' },
  
    戊: { element: 'earth', yinYang: 'yang' },
    己: { element: 'earth', yinYang: 'yin' },
  
    庚: { element: 'metal', yinYang: 'yang' },
    辛: { element: 'metal', yinYang: 'yin' },
  
    壬: { element: 'water', yinYang: 'yang' },
    癸: { element: 'water', yinYang: 'yin' },
  };
  
  const GENERATED_ELEMENT: Record<Element, Element> = {
    wood: 'fire',
    fire: 'earth',
    earth: 'metal',
    metal: 'water',
    water: 'wood',
  };
  
  const CONTROLLED_ELEMENT: Record<Element, Element> = {
    wood: 'earth',
    fire: 'metal',
    earth: 'water',
    metal: 'wood',
    water: 'fire',
  };
  
  export function getStemYinYang(
    stem: string,
  ): YinYang {
    const info = STEM_INFO[stem];
  
    if (!info) {
      throw new Error(`알 수 없는 천간입니다: ${stem}`);
    }
  
    return info.yinYang;
  }
  
  export function calculateTenGod(
    dayStem: string,
    targetStem: string,
  ): TenGod {
    const day = STEM_INFO[dayStem];
    const target = STEM_INFO[targetStem];
  
    if (!day) {
      throw new Error(`알 수 없는 일간입니다: ${dayStem}`);
    }
  
    if (!target) {
      throw new Error(`알 수 없는 천간입니다: ${targetStem}`);
    }
  
    const sameYinYang =
      day.yinYang === target.yinYang;
  
    // 같은 오행: 비견 / 겁재
    if (day.element === target.element) {
      return sameYinYang ? '비견' : '겁재';
    }
  
    // 내가 생하는 오행: 식신 / 상관
    if (
      GENERATED_ELEMENT[day.element] ===
      target.element
    ) {
      return sameYinYang ? '식신' : '상관';
    }
  
    // 내가 극하는 오행: 편재 / 정재
    if (
      CONTROLLED_ELEMENT[day.element] ===
      target.element
    ) {
      return sameYinYang ? '편재' : '정재';
    }
  
    // 나를 극하는 오행: 편관 / 정관
    if (
      CONTROLLED_ELEMENT[target.element] ===
      day.element
    ) {
      return sameYinYang ? '편관' : '정관';
    }
  
    // 나를 생하는 오행: 편인 / 정인
    if (
      GENERATED_ELEMENT[target.element] ===
      day.element
    ) {
      return sameYinYang ? '편인' : '정인';
    }
  
    throw new Error(
      `십성을 계산할 수 없습니다: ${dayStem}, ${targetStem}`,
    );
  }