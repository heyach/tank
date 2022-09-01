import BasicElement from "./BasicElement"

export default class Brick extends BasicElement{
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
        this.type = "Brick"
        this.image = new Image()
        this.image.src = "https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62326ab976a84c968bef496c1a15b2cb~tplv-k3u1fbpfcp-watermark.image?"
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
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