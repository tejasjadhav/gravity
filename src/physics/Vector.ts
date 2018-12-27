export interface VectorResult {
  x: number;
  y: number;
}

export default class Vector {
  public magnitude: number;
  public angle: number;

  constructor(value: number = 0, angle: number = 0) {
    this.magnitude = value;
    this.angle = angle;
  }

  get result(): VectorResult {
    return {
      x: this.magnitude * Math.cos(this.angle),
      y: this.magnitude * Math.sin(this.angle)
    };
  }

  add(other: Vector) {
    const thisResult = this.result;
    const otherResult = other.result;
    const x = thisResult.x + otherResult.x;
    const y = thisResult.y + otherResult.y;

    const magnitude = Math.sqrt(x * x + y * y);
    const angle = Math.atan2(y, x);

    return new Vector(magnitude, angle);
  }
}
