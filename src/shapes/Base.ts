export interface BoundingBox2D {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export default abstract class BaseShape {
  abstract x: number;
  abstract y: number;
  abstract width: number;
  abstract height: number;
  abstract angle: number;

  abstract getBoundingBox(): BoundingBox2D;
  abstract draw(ctx: CanvasRenderingContext2D): void;
}
