import BaseShape, { BoundingBox2D } from "./Base";
import { randomColor } from "../utils";

export interface RectangleOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  angle?: number;
  color?: string;
  showBoundingBox?: boolean;
  boundingBoxColor?: string;
}

export default class Rectangle extends BaseShape {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public angle: number;
  private color: string;
  protected showBoundingBox: boolean;
  protected boundingBoxColor: string;

  constructor(options: RectangleOptions) {
    super();
    this.x = options.x;
    this.y = options.y;
    this.width = options.width;
    this.height = options.height;
    this.angle = options.angle || 0;
    this.color = options.color || "#000000";
    this.showBoundingBox = !!options.showBoundingBox;
    this.boundingBoxColor = options.boundingBoxColor || randomColor();
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

    if (this.showBoundingBox) {
      const bbox = this.getBoundingBox();
      ctx.beginPath();
      ctx.rect(bbox.x1, bbox.y1, bbox.x2 - bbox.x1, bbox.y2 - bbox.y1);
      ctx.strokeStyle = this.boundingBoxColor;
      ctx.stroke();
      ctx.closePath();
    }

    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    ctx.restore();
  }
}
