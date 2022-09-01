import BasicElement from "./BasicElement"

export default class Heart extends BasicElement{
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
        this.type = "Heart"
        this.image = new Image()
        this.image.src = "https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f68715959d4e4576813677bc2a96ae68~tplv-k3u1fbpfcp-watermark.image?"
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    
    destroy() {
        // 心脏都被摧毁了，直接GG
        this.parent.remove(this)
        alert("GG")
    }

    pointInElement(x: number, y: number) {
        // 假设内置close大小为20*20，在元素右上角
        // 这个判断还是要加上offset，更新后，子元素的xy就是container的xy
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}