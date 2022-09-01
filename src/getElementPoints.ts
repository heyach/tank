export default function getElementPoints(element: {x: number, y: number, w: number, h: number}) {
    let t = [];
    t.push({
        x: element.x,
        y: element.y,
    });
    t.push({
        x: element.x + element.w,
        y: element.y,
    });
    t.push({
        x: element.x + element.w,
        y: element.y + element.h,
    });
    t.push({
        x: element.x,
        y: element.y + element.h,
    });
    return {
        points: t,
    };
}
