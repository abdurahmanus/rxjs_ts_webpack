import { Observable } from "rxjs";

let circle = createCircle();
document.body.appendChild(circle);

let source = Observable.fromEvent(document, "mousemove")
    .map((e: MouseEvent) => ({
        x: e.clientX,
        y: e.clientY
    }))
    .filter(value => value.x < 500)
    .delay(100);

source.subscribe(
    onNext,
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);

function createCircle() : HTMLDivElement {
    let circle = document.createElement("div");
    circle.style.position = "absolute";
    circle.style.width = "20px";
    circle.style.height = "20px";
    circle.style.background = "red";
    circle.style.borderRadius = "50%";
    return circle;
}

function onNext(value) {
    circle.style.left = value.x + "px";
    circle.style.top = value.y + "px";
}