import BasicElement from "./BasicElement"

export default class SteelBrick extends BasicElement {
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
        this.type = "SteelBrick"
        this.image = new Image()
        this.image.src = "https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1d344bb8024465288dddd59cf04c1fd~tplv-k3u1fbpfcp-watermark.image?"
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.x, this.y, this.w, this.h);
    }
    
    gotShot() {
        // do nothing
    }
    
    destroy() {
        this.parent.remove(this)
    }

    pointInElement(x: number, y: number) {
        return this.x <= x && this.y <= y && this.x + this.w >= x && this.y + this.h >= y;
    }
}