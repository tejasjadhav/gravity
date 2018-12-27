import "./styles/reboot.css";
import Constants from "./Constants";
import Rectangle from "./shapes/Rectangle";
import Sprite from "./shapes/Sprite";
import GObject from "./objects/GObject";
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
const shape = new Sprite(image, new Rectangle(100, 100, 50, 50));
const box = new GObject({ shape, mass: 1 });
const world = new World();
world.addObject("box", box);

function draw() {
  clearCanvas(canvasDom, ctx);
  world.draw(ctx);
  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

window.addEventListener("keydown", (ev: KeyboardEvent) => {
  switch (ev.keyCode) {
    case 32:
      box.setVelocity(box.velocity.add(new Vector(5, -Math.PI / 2)));
      break;

    case 37:
      box.setVelocity(box.velocity.add(new Vector(velocity, Math.PI)));
      break;

    case 39:
      box.setVelocity(box.velocity.add(new Vector(velocity, 0)));
      break;
  }
});
