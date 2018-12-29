import BaseShape, { BoundingBox2D } from "./Base";

export interface SpriteOptions {
  image: CanvasImageSource;
  shape: BaseShape;
}

export default class Sprite extends BaseShape {
  private image: CanvasImageSource;
  private shape: BaseShape;

  constructor(options: SpriteOptions) {
    super();
    this.image = options.image;
    this.shape = options.shape;
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
    ctx.drawImage(
      this.image,
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }
}
