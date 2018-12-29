import Vector from "../physics/Vector";
import GObject from "../objects/GObject";

export interface WorldOptions {
  ctx: CanvasRenderingContext2D;
  gravity?: Vector;
  friction?: number;
}

export default class World {
  public gravity: Vector;
  public friction: number;

  private ctx: CanvasRenderingContext2D;
  private objects: Map<string, GObject>;

  constructor(options: WorldOptions) {
    this.ctx = options.ctx;
    this.gravity = options.gravity || new Vector(0, 0);
    this.friction = options.friction || 0;
    this.objects = new Map();
  }

  public addObject(obj: GObject) {
    this.objects.set(obj.name, obj);
    obj.onLoad(this);
  }

  public removeObject(name: string) {
    this.objects.delete(name);
  }

  public calculateFriction(mass: number, velocity: Vector): Vector {
    return new Vector(
      velocity.magnitude * mass * this.friction,
      velocity.angle + Math.PI
    );
  }

  detectCollisions() {
    this.objects.forEach((objA: GObject, keyA: string) => {
      this.objects.forEach((objB: GObject, keyB: string) => {
        if (keyA === keyB) {
          return;
        }

        if (!objA.isSolid || !objB.isSolid) {
          return;
        }

        const collisionBox = GObject.checkCollision(objA, objB);

        if (collisionBox) {
          objA.onCollision(objB, collisionBox);
        }
      });
    });
  }

  draw() {
    this.objects.forEach((obj: GObject, key: string) => {
      let velocity = obj.velocity.add(this.gravity);
      const friction = this.calculateFriction(obj.mass, velocity);
      obj.setVelocity(velocity.add(friction));
      obj.simulate(this.ctx);
    });
  }

  simulate() {
    this.draw();
    this.detectCollisions();
  }
}
