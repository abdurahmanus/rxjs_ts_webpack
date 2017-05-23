import { Observable } from "rxjs";
import { loadWithFetch } from "./loader";

let button = document.createElement("button");
button.textContent = "Load movies";
document.body.appendChild(button);

let output = document.createElement("div");
document.body.appendChild(output);

let click = Observable.fromEvent(button, "click");

function renderMovies(movies) {       
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// simulate network error (not found)
click.flatMap(e => loadWithFetch("data/moviess.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );