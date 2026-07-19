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
  