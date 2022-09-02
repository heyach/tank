import BasicElement from "./BasicElement"

export default class WaterBrick extends BasicElement {
    x: number
    y: number
    w: number
    h: number
    image: HTMLImageElement
    type: string
    constructor(option) {
        super({})
        this.x = option.x
        this.y = option.y
        this.w = option.w
        this.h = option.h
        this.type = "WaterBrick"
        this.image = new Image()
        this.image.src = "./shuizhuan.png"
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    
    destroy() {
        this.parent.remove(this)
    }

    pointInElement(x: number, y: number) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}