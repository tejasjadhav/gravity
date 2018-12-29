import BaseShape from "../shapes/Base";
import Vector from "../physics/Vector";

export interface GObjectOptions {
  name: string;
  shape: BaseShape;
  mass: number;
  velocity?: Vector;
  isFixed?: boolean;
}

export default class GObject {
  public static MAX_VELOCITY = 5;

  readonly shape: BaseShape;
  readonly name: string;
  public velocity: Vector;
  public mass: number;
  private isFixed: boolean;

  constructor(options: GObjectOptions) {
    this.name = options.name;
    this.shape = options.shape;
    this.velocity = options.velocity || new Vector();
    this.mass = options.mass;
    this.isFixed = !!options.isFixed;
  }

  public setVelocity(velocity: Vector) {
    if (this.isFixed) return;

    this.velocity.magnitude =
      velocity.magnitude > GObject.MAX_VELOCITY
        ? GObject.MAX_VELOCITY
        : velocity.magnitude;
    this.velocity.angle = velocity.angle;
  }

  public simulate(ctx: CanvasRenderingContext2D) {
    const v = this.velocity.result;
    this.shape.x += v.x;
    this.shape.y += v.y;

    this.shape.draw(ctx);
  }
}
