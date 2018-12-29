import BaseShape, { BoundingBox2D } from "./Base";

export interface SpriteOptions {
  image: CanvasImageSource;
  angle?: number;
  shape: BaseShape;
}

export default class Sprite extends BaseShape {
  private image: CanvasImageSource;
  private shape: BaseShape;
  public angle: number;

  constructor(options: SpriteOptions) {
    super();
    this.image = options.image;
    this.angle = options.angle || 0;
    this.shape = options.shape;
    this.shape.angle = this.angle;
  }

  get x(): number {
    return this.shape.x;
  }

  set x(value: number) {
    this.shape.x = value;
  }

  get y(): number {
    return this.shape.y;
  }

  set y(value: number) {
    this.shape.y = value;
  }

  get width(): number {
    return this.shape.width;
  }

  get height(): number {
    return this.shape.height;
  }

  getBoundingBox(): BoundingBox2D {
    return this.shape.getBoundingBox();
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
