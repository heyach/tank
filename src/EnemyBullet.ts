// 子弹，从起点位置到终点位置，中间做碰撞检测，碰撞了就销毁

import BasicElement from "./BasicElement";
import CheckCollision from "./CheckCollision";
import flatArrayChildren from "./flatArrayChildren";
import getElementPoints from "./getElementPoints";
import isCollision from "./isCollision";
import Timer from "./Timer";

class Bullet extends BasicElement{
    sx: any
    sy: any
    ex: any;
    ey: any;
    w: number;
    h: number;
    type: string;
    image: HTMLImageElement;
    x: number;
    y: number;
    dx: number
    dy: number
    timer: any;
    direction: any
    fps: number;
    speed: number;
    status: number;
    constructor(option) {
        super(option)
        this.sx = option.sx
        this.sy = option.sy
        this.ex = option.ex
        this.ey = option.ey
        this.x = this.sx
        this.y = this.sy
        this.status = 1
        this.w = option.w;
        this.h = option.h;
        this.direction = option.direction // 直接初始化传入即可，不再更新，子弹不拐弯
        this.type = "EnemyBullet";
        this.image = new Image();
        this.image.src = `./bullet${this.direction}.png`;

        this.speed = 10 // 根据这个speed和fps算出dx和dy,
        this.fps = 16

        // 初始化就发射出去
        this.fire()
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    destroy() {
        this.status = 0
        this.parent.remove(this)
    }
    fire() {
        this.timer = new Timer(() => {
            // 从初始位置逐渐运动到终止位置，这里暂时只处理y，x不变，100次（可以优化成动态速率）
            // this.y += this.ey / 1000
            // 进行碰撞检测
            // 先拿到场景里所有要检测碰撞的元素，这里固定获取TextElm
            // let elms = flatArrayChildren(this.parent.children);
            // let textElms = elms.filter(item => item.type == "TextElm")
            // let p = false
            // for(let i = 0;i < textElms.length;i++) {
            //     if(isCollision(getElementPoints(textElms[i]), getElementPoints(this))) {
            //         p = true
            //         return
            //     }
            // }
            // // 更新 如果碰了，就停止变化，这里只考虑y，因为下面有元素，y就被托住了
            // if(!p) {
            //     this.y += this.ey / 1000
            // }
            // if(this.y >= this.ey) {
            //     this.timer.clear()
            // }
            
            // 子弹需要考虑碰撞，有子弹对敌方坦克的，也有敌方子弹对我们坦克的，还有子弹对墙体的，墙体还要分类型，子弹还要分等级和类型，这里简化一点，任何东西和子弹对上了，就挂了
            let elms = flatArrayChildren(this.parent.children);
            let p = CheckCollision(elms, this, ["Brick", "Tank", "Heart"], (elm) => {
                elm.destroy()
                this.destroy()
                this.timer.clear()
            })
            if(!p) {
                this.x += this.ex - this.sx != 0 ? Math.sign(this.ex - this.sx) * this.speed : 0
                this.y += this.ey - this.sy != 0 ? Math.sign(this.ey - this.sy) * this.speed : 0
            } 
            if(this.x < -10 || this.x > 1210 || this.y < -10 || this.y > 810) {
                this.destroy()
                this.timer.clear()
            }
        }, this.fps)
    }
}

export default Bullet