import BaseShape, { BoundingBox2D } from "./Base";

export default class Rectangle extends BaseShape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  private color: string;

  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string = "#000000"
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
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
