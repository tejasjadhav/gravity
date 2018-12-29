import BaseShape, { BoundingBox2D } from "./Base";

export interface RectangleOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  color?: string;
}

export default class Rectangle extends BaseShape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public angle: number;
  private color: string;

  constructor(options: RectangleOptions) {
    super();
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.angle = options.angle || 0;
    this.color = options.color || "#000000";
  }

  public getBoundingBox(): BoundingBox2D {
    const sine = Math.sin(this.angle);
    const cosine = Math.cos(this.angle);
    const width = cosine * this.width + sine * this.height;
    const height = sine * this.width + cosine * this.height;

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    return {
      x1: this.x - halfWidth,
      y1: this.y - halfHeight,
      x2: this.x + halfWidth,
      y2: this.y + halfHeight
    };
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
