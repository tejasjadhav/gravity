import BaseShape, { BoundingBox2D } from "./Base";

export default class Sprite extends BaseShape {
  private image: CanvasImageSource;
  private shape: BaseShape;

  constructor(image: CanvasImageSource, shape: BaseShape) {
    super();
    this.image = image;
    this.shape = shape;
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
