import BaseShape from "../shapes/Base";
import Vector from "../physics/Vector";

export interface GObjectOptions {
  shape: BaseShape;
  mass: number;
  velocity?: Vector;
}

export default class GObject {
  public static MAX_VELOCITY = 5;

  readonly shape: BaseShape;
  public velocity: Vector;
  public mass: number;

  constructor(options: GObjectOptions) {
    this.shape = options.shape;
    this.velocity = options.velocity || new Vector();
    this.mass = options.mass;
  }

  public setVelocity(velocity: Vector) {
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
