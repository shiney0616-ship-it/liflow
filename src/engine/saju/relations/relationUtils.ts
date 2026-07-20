const YANG_STEMS = [
  '甲',
  '丙',
  '戊',
  '庚',
  '壬',
] as const;

const YIN_STEMS = [
  '乙',
  '丁',
  '己',
  '辛',
  '癸',
] as const;

export function isYangStem(
  stem: string,
): boolean {
  return (YANG_STEMS as readonly string[])
    .includes(stem);
}

export function isYinStem(
  stem: string,
): boolean {
  return (YIN_STEMS as readonly string[])
    .includes(stem);
}

export function hasRelation(
    table: readonly (readonly [string, string])[],
    a: string,
    b: string,
  ): boolean {
    return table.some(
      ([x, y]) =>
        (x === a && y === b) ||
        (x === b && y === a),
    );
  }
  