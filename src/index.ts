import "./styles/reboot.css";
import Constants from "./Constants";
import Rectangle from "./shapes/Rectangle";
import Sprite from "./shapes/Sprite";
import GObject, { CollisionBox } from "./objects/GObject";
import World from "./world/World";
import Vector from "./physics/Vector";

function clearCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const canvasDom = <HTMLCanvasElement>(
  document.getElementById(Constants.ROOT_ELEMENT_ID)
);
const ctx = <CanvasRenderingContext2D>canvasDom.getContext("2d");
const velocity = 1;

const image = new Image();
image.src = "/images/avatar.png";
const avatarSprite = new Sprite({
  image: image,
  angle: Math.PI / 6,
  showBoundingBox: true,
  shape: new Rectangle({
    x: 100,
    y: 100,
    width: 50,
    height: 50
  })
});

class Player extends GObject {
  onCollision(other: GObject, collisionBox: CollisionBox) {
    this.world!.removeObject(other.name);
  }
}

const avatar = new Player({
  name: "avatar",
  shape: avatarSprite,
  mass: 1,
  elasticity: 0.5,
  isSolid: true
});

const boxShape = new Rectangle({
  x: 200,
  y: 100,
  width: 50,
  height: 50,
  angle: Math.PI / 6,
  showBoundingBox: true
});
const box = new GObject({
  name: "box",
  shape: boxShape,
  mass: 1,
  elasticity: 1,
  isSolid: true,
  isFixed: true
});

const world = new World({
  ctx: ctx,
  gravity: new Vector(0, Math.PI / 2),
  friction: 0.05
});
world.addObject(avatar);
world.addObject(box);

function draw() {
  clearCanvas(canvasDom, ctx);
  world.simulate();
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

// setInterval(draw, 100);
const keysPressed: { [i: number]: boolean } = {};

function handlePlayerKeys(keyCode: number) {
  switch (keyCode) {
    case 32:
      avatar.setVelocity(new Vector(0, 0));
      break;

    case 37:
      avatar.setVelocity(avatar.velocity.add(new Vector(velocity, Math.PI)));
      break;

    case 38:
      avatar.setVelocity(
        avatar.velocity.add(new Vector(velocity, -Math.PI / 2))
      );
      break;

    case 39:
      avatar.setVelocity(avatar.velocity.add(new Vector(velocity, 0)));
      break;

    case 40:
      avatar.setVelocity(
        avatar.velocity.add(new Vector(velocity, Math.PI / 2))
      );
      break;
  }
}

window.addEventListener("keydown", (ev: KeyboardEvent) => {
  keysPressed[ev.keyCode] = true;

  for (const keyCode in keysPressed) {
    keysPressed[keyCode] && handlePlayerKeys(parseInt(keyCode));
  }
});

window.addEventListener("keyup", (ev: KeyboardEvent) => {
  keysPressed[ev.keyCode] = false;
});
