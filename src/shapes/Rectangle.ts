import BaseShape, { BoundingBox2D } from "./Base";

export interface RectangleOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

export default class Rectangle extends BaseShape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private color: string;

  constructor(options: RectangleOptions) {
    super();
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.color = options.color || "#000000";
  }

  public getBoundingBox(): BoundingBox2D {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    return {
      x1: this.x - halfWidth,
      y1: this.y - halfHeight,
      x2: this.x + halfWidth,
      y2: this.y + halfHeight
    };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
