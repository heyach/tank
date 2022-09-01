import BasicElement from "./BasicElement";
import flatArrayChildren from "./flatArrayChildren";
import getElementPoints from "./getElementPoints";
import isCollision from "./isCollision";
import config from "./Config"
import Timer from "./Timer";
import EnemyBullet from "./EnemyBullet";
import CheckCollision from "./CheckCollision";

export default class EnemyTank extends BasicElement {
    w: any;
    h: any;
    direction: string;
    image: HTMLImageElement;
    type: string;
    speed: number;
    actionTimer: any;
    moveTimer: any;
    bullet: EnemyBullet;
    constructor(option) {
        super({});
        this.x = option.x;
        this.y = option.y;
        this.w = option.w;
        this.h = option.h;
        this.type = "EnemyTank"
        this.direction = "left";
        this.image = new Image();
        this.image.src = "./enemytankup.png";
        this.parent = null
        this.speed = 10
        this.actionTimer = null
        this.moveTimer = null
        this.bullet = null
    }
    draw(ctx) {
        this.image.src = `./enemytank${this.direction}.png`;
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    pointInElement(x, y) {
        // 假设内置close大小为20*20，在元素右上角
        // 这个判断还是要加上offset，更新后，子元素的xy就是container的xy
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
    setDirection(d) {
        this.direction = d;
    }
    destroy() {
        this.actionTimer && this.actionTimer.clear()
        this.moveTimer && this.moveTimer.clear()
        this.parent.remove(this)
    }
    action() {
        this.actionTimer = new Timer(() => {
            this.fire()
        }, 400)
        this.moveTimer = new Timer(() => {
            this.move()
        }, 400)
    }
    randomDirection() {
        this.setDirection(['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)])
    }
    move() {
        let elms
        // 即将碰撞，先处理xy，如果碰撞了返还
        switch (this.direction) {
            case "up":
                if (this.y >= this.speed) {
                    this.y -= this.speed;
                } else {
                    this.randomDirection()
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["Brick", "Tank", "EnemyTank"], (elm) => {
                    this.y += this.speed
                    // 碰到墙了就随机换方向
                    this.randomDirection()
                })
                break;
            case "right":
                if (this.x < config.stage.w - config.tank.w) {
                    this.x += this.speed;
                } else {
                    this.randomDirection()
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["Brick", "Tank", "EnemyTank"], (elm) => {
                    this.x -= this.speed
                    this.randomDirection()
                })
                break;
            case "down":
                if (this.y < config.stage.h - config.tank.h) {
                    this.y += this.speed;
                } else {
                    this.randomDirection()
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["Brick", "Tank", "EnemyTank"], (elm) => {
                    this.y -= this.speed
                    this.randomDirection()
                })
                break;
            case "left":
                if (this.x >= this.speed) {
                    this.x -= this.speed;
                } else {
                    this.randomDirection()
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["Brick", "Tank", "EnemyTank"], (elm) => {
                    this.x += this.speed
                    this.randomDirection()
                })
                break;
        }
    }
    fire() {
        let opt = {}
        if(this.bullet?.status) {
            return
        }
        switch(this.direction) {
            case "up":
                opt = {
                    sx: this.x + this.w / 2 - config.bullet.w / 2,
                    sy: this.y - config.bullet.h,
                    ex: this.x + this.w / 2 - config.bullet.w / 2,
                    ey: -config.bullet.h,
                    w: config.bullet.w,
                    h: config.bullet.h,
                    direction: "up"
                }
                break
            case "right":
                opt = {
                    sx: this.x + this.w,
                    sy: this.y + this.h / 2 - config.bullet.w / 2,
                    ex: config.stage.w + config.bullet.h,
                    ey: this.y + this.h / 2 - config.bullet.w / 2,
                    w: config.bullet.h,
                    h: config.bullet.w,
                    direction: "right"
                }
                break
            case "down":
                opt = {
                    sx: this.x + this.w / 2 - config.bullet.w / 2,
                    sy: this.y + this.h, 
                    ex: this.x + this.w / 2 - config.bullet.w / 2,
                    ey: config.stage.h + config.bullet.h,
                    w: config.bullet.w,
                    h: config.bullet.h,
                    direction: "down"
                }
                break
            case "left":
                opt = {
                    sx: this.x - config.bullet.h,
                    sy: this.y + this.h / 2 - config.bullet.w / 2,
                    ex: -config.bullet.h,
                    ey: this.y + this.h / 2 - config.bullet.w / 2,
                    w: config.bullet.h,
                    h: config.bullet.w,
                    direction: "left"
                }
                break
            default: 
                break
        }
        this.bullet = new EnemyBullet(opt)
        this.parent.add(this.bullet)
    }
}
