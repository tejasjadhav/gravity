export const ROUNDING_PRECISION = 10e-10;

export function round(n: number): number {
  return Math.round(n / ROUNDING_PRECISION) * ROUNDING_PRECISION;
}

export function randomColor(): string {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
