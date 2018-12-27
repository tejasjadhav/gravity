import Vector from "../physics/Vector";
import GObject from "../objects/GObject";

export interface WorldOptions {
  gravity?: Vector;
  friction?: number;
}

export default class World {
  public gravity: Vector;
  public friction: number;

  private objects: Map<string, GObject>;

  constructor(options: WorldOptions = {}) {
    this.gravity = options.gravity || new Vector(0, 0);
    this.friction = options.friction || 0;
    this.objects = new Map();
  }

  public addObject(name: string, obj: GObject) {
    this.objects.set(name, obj);
  }

  public calculateFriction(mass: number, velocity: Vector): Vector {
    return new Vector(
      velocity.magnitude * mass * this.friction,
      velocity.angle + Math.PI
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.objects.forEach((obj: GObject, key: string) => {
      let velocity = obj.velocity.add(this.gravity);
      const friction = this.calculateFriction(obj.mass, velocity);
      obj.setVelocity(velocity.add(friction));
      obj.simulate(ctx);
    });
  }
}