class Timer {
    interval: any
    fn: any
    lastTime: number
    timer: any
    constructor(fn, interval) {
        this.interval = interval
        this.fn = fn
        this.lastTime = 0
        this.timer = null

        this.loop(0)
    }
    loop(timestamp){
        this.timer = requestAnimationFrame(Timer.prototype.loop.bind(this))
        if(timestamp - this.lastTime > this.interval) { 
            this.lastTime = timestamp;
            typeof this.fn == "function" && this.fn()
        }
    }
    clear() {
        cancelAnimationFrame(this.timer)
        this.timer = null
    }
}

export default Timer