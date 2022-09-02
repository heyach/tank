import BasicElement from "./BasicElement"

export default class Star extends BasicElement{
    x: number
    y: number
    w: number
    h: number
    image: HTMLImageElement
    type: string
    constructor(option) {
        super(option)
        this.x = option.x
        this.y = option.y
        this.w = option.w
        this.h = option.h
        this.type = "Star"
        this.image = new Image()
        this.image.src = "./daojuxingxing.png"
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    
    eat(elm) {
        // 星星不中弹，但是会被坦克吃，给吃的目标升级
        elm.star ++
        this.destroy()
    }

    destroy() {
        this.parent.remove(this)
    }

    pointInElement(x: number, y: number) {
        // 假设内置close大小为20*20，在元素右上角
        // 这个判断还是要加上offset，更新后，子元素的xy就是container的xy
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}