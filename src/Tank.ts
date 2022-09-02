import BasicElement from "./BasicElement";
import Bullet from "./Bullet";
import flatArrayChildren from "./flatArrayChildren";
import getElementPoints from "./getElementPoints";
import isCollision from "./isCollision";
import config from "./Config"
import CheckCollision from "./CheckCollision";
import Timer from "./Timer";

export default class Tank extends BasicElement {
    w: number;
    h: number;
    direction: string;
    image: HTMLImageElement;
    type: string;
    speed: number;
    bullet: Bullet;
    directionImage: { up: string; right: string; down: string; left: string; };
    star: number;
    constructor(option) {
        super({});
        this.x = option.x;
        this.y = option.y;
        this.w = option.w;
        this.h = option.h;
        this.type = "Tank"
        this.direction = "up";
        this.directionImage = {
            "up": "https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bca9c499b8174b65b39c462b5cd9139e~tplv-k3u1fbpfcp-watermark.image?",
            "right": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d5bd37c406a4ae3932389acb5d486fa~tplv-k3u1fbpfcp-watermark.image?",
            "down": "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b942170125284efe9789d89e5c0df736~tplv-k3u1fbpfcp-watermark.image?",
            "left": "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0af07850e9464e9c931e62167bc61547~tplv-k3u1fbpfcp-watermark.image?",
        }
        this.image = new Image();
        this.image.src = this.directionImage[this.direction]
        this.parent = null
        this.speed = 10
        this.star = 0
        this.bullet = null
    }
    draw(ctx: CanvasRenderingContext2D) {
        this.image.src = this.directionImage[this.direction]
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }

    pointInElement(x: number, y: number) {
        // 假设内置close大小为20*20，在元素右上角
        // 这个判断还是要加上offset，更新后，子元素的xy就是container的xy
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
    setDirection(d: string) {
        this.direction = d;
    }
    gotShot() {
        this.destroy()
    }
    destroy() {
        this.parent.remove(this)
    }
    move() {
        let elms
        // 即将碰撞，先处理xy，如果碰撞了返还
        switch (this.direction) {
            case "up":
                if (this.y >= this.speed) {
                    this.y -= this.speed;
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["WaterBrick", "SteelBrick", "Brick", "EnemyTank", "SeniorEnemyTank"], (elm) => {
                    this.y += this.speed
                })
                // 单独加上吃道具逻辑，后续可以扩展
                CheckCollision(elms, this, ["Star"], (elm) => {
                    elm.eat(this)
                })
                break;
            case "right":
                if (this.x < config.stage.w - config.tank.w) {
                    this.x += this.speed;
                } 
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["WaterBrick", "SteelBrick", "Brick", "EnemyTank", "SeniorEnemyTank"], (elm) => {
                    this.x -= this.speed
                })   
                // 单独加上吃道具逻辑，后续可以扩展
                CheckCollision(elms, this, ["Star"], (elm) => {
                    elm.eat(this)
                })
                break;
            case "down":
                if (this.y < config.stage.h - config.tank.h) {
                    this.y += this.speed;
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["WaterBrick", "SteelBrick", "Brick", "EnemyTank", "SeniorEnemyTank"], (elm) => {
                    this.y -= this.speed
                })     
                // 单独加上吃道具逻辑，后续可以扩展
                CheckCollision(elms, this, ["Star"], (elm) => {
                    elm.eat(this)
                })
                break;
            case "left":
                if (this.x >= this.speed) {
                    this.x -= this.speed;
                }
                elms = flatArrayChildren(this.parent.children);
                CheckCollision(elms, this, ["WaterBrick", "SteelBrick", "Brick", "EnemyTank", "SeniorEnemyTank"], (elm) => {
                    this.x += this.speed
                })
                // 单独加上吃道具逻辑，后续可以扩展
                CheckCollision(elms, this, ["Star"], (elm) => {
                    elm.eat(this)
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
                    direction: "up",
                    hurt: this.star + 1
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
                    direction: "right",
                    hurt: this.star + 1
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
                    direction: "down",
                    hurt: this.star + 1
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
                    direction: "left",
                    hurt: this.star + 1
                }
                break
            default: 
                break
        }
        this.bullet = new Bullet(opt)
        this.parent.add(this.bullet)
    }
}
