import { Observable } from "rxjs";

let button = document.createElement("button");
button.textContent = "Load movies";
document.body.appendChild(button);

let output = document.createElement("div");
document.body.appendChild(output);

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    let xhr = new XMLHttpRequest();
    
    xhr.addEventListener("load", () => {
        let movies = JSON.parse(xhr.responseText);
        movies.forEach(m => {
            let div = document.createElement("div");
            div.innerText = m.title;
            output.appendChild(div);
        });
    });
    
    xhr.open("GET", url);
    xhr.send();
}

click.subscribe(
    e => load("data/movies.json"),
    e => console.log(`error: ${e}`),
    () => console.log("complete")
);