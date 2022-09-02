import Brick from "./Brick";
import Stage from "./Stage";
import Tank from "./Tank";
import config from "./Config"
import Heart from "./Heart";
import EnemyTank from "./EnemyTank";
import Timer from "./Timer";
import SteelBrick from "./SteelBrick";
import WaterBrick from "./WaterBrick";
import SeniorEnemyTank from "./SeniorEnemyTank";
import Star from "./Star";

// 初始化一个800 * 700的舞台
let s2 = new Stage(document.getElementById("stage"));

let allzhuan = config.shut.one
Object.keys(allzhuan).forEach(key => {
    allzhuan[key].forEach(item => {
        if(key == "tuzhuan") {
            let t = new Brick({
                x: item[0],
                y: item[1],
                w: config.tuzhuan.w,
                h: config.tuzhuan.h
            })
            s2.add(t)
        }
        if(key == "tiezhuan") {
            let t = new SteelBrick({
                x: item[0],
                y: item[1],
                w: config.tuzhuan.w,
                h: config.tuzhuan.h
            })
            s2.add(t)
        }
        if(key == "shuizhuan") {
            let t = new WaterBrick({
                x: item[0],
                y: item[1],
                w: config.tuzhuan.w,
                h: config.tuzhuan.h
            })
            s2.add(t)
        }
    })
})
let heart = new Heart({
    x: config.heart.startX,
    y: config.heart.startY,
    w: config.heart.w,
    h: config.heart.h
})
s2.add(heart)

let tank = new Tank({
    x: config.tank.startX,
    y: config.tank.startY,
    w: config.tank.w,
    h: config.tank.h
})
s2.add(tank)

document.getElementById("btn-begin").addEventListener("click", () => {
    // let enemyTanks = [[60, 0], [180, 0], [300, 0], [420, 0], [540, 0], [660, 0],
    //                 [180, 420], [540, 420]]
    // enemyTanks.forEach(item => {
    //     let t = new EnemyTank({
    //         x: item[0],
    //         y: item[1],
    //         w: 60,
    //         h: 60
    //     })
    //     t.action()
    //     s2.add(t)
    // })
    let set = new SeniorEnemyTank({
        x: 720,
        y: 720,
        w: 60,
        h: 60
    })
    s2.add(set)
    let set2 = new SeniorEnemyTank({
        x: 720,
        y: 660,
        w: 60,
        h: 60
    })
    s2.add(set2)
    
    // let set2 = new EnemyTank({
    //     x: 720,
    //     y: 660,
    //     w: 60,
    //     h: 60
    // })
    // s2.add(set2)
    let star = new Star({
        x: 480,
        y: 500,
        w: 30,
        h: 30
    })
    s2.add(star)
    document.addEventListener("keyup", (e) => {
        switch(e.code) {
            case "ArrowUp":
                tank.setDirection("up")
                tank.move()
                break
            case "ArrowRight": 
                tank.setDirection("right")
                tank.move()
                break
            case "ArrowDown": 
                tank.setDirection("down")
                tank.move()
                break
            case "ArrowLeft": 
                tank.setDirection("left")
                tank.move()
                break
            case "Space":
                tank.fire()
                break
            default: 
                break
        }
    })
}) 
