import BaseShape from "../shapes/Base";
import Vector from "../physics/Vector";
import World from "../world/World";

export interface GObjectOptions {
  name: string;
  shape: BaseShape;
  mass: number;
  velocity?: Vector;
  isSolid?: boolean;
  isFixed?: boolean;
  elasticity?: number;
}

export interface CollisionBox {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

export default class GObject {
  public static MAX_VELOCITY = 5;

  readonly shape: BaseShape;
  readonly name: string;
  public velocity: Vector;
  public mass: number;
  public elasticity: number;
  protected world?: World;

  public isSolid: boolean;
  private isFixed: boolean;

  public static checkCollision(
    objA: GObject,
    objB: GObject
  ): CollisionBox | null {
    const bboxA = objA.shape.getBoundingBox();
    const bboxB = objB.shape.getBoundingBox();

    const topCollision = bboxA.x1 < bboxB.x2;
    const bottomCollision = bboxA.x2 > bboxB.x1;
    const leftCollision = bboxA.y1 < bboxB.y2;
    const rightCollision = bboxA.y2 > bboxB.y1;

    if (topCollision && bottomCollision && leftCollision && rightCollision) {
      return {
        top: topCollision,
        bottom: bottomCollision,
        left: leftCollision,
        right: rightCollision
      };
    }

    return null;
  }

  constructor(options: GObjectOptions) {
    this.name = options.name;
    this.shape = options.shape;
    this.velocity = options.velocity || new Vector();
    this.mass = options.mass;
    this.elasticity = options.elasticity || 0;
    this.isSolid = !!options.isSolid;
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

  public onCollision(other: GObject, collisionBox: CollisionBox) {
    this.setVelocity(
      new Vector(
        this.velocity.magnitude * this.elasticity * other.elasticity,
        this.velocity.angle + Math.PI
      )
    );
  }

  public simulate(ctx: CanvasRenderingContext2D) {
    const v = this.velocity.result;
    this.shape.x += v.x;
    this.shape.y += v.y;

    this.shape.draw(ctx);
  }
}
