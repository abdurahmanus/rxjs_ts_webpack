import { Observable } from "rxjs";

let button = document.createElement("button");
button.textContent = "Load movies";
document.body.appendChild(button);

let output = document.createElement("div");
document.body.appendChild(output);

let click = Observable.fromEvent(button, "click");

function loadWithFetch(url:string) {
    // lazy loading
    return Observable.defer(() =>
        Observable.fromPromise(
            fetch(url).then(r => r.json()))
    );
}

function renderMovies(movies) {       
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// lazy loading works (see network tab)
loadWithFetch("data/movies.json");

// simulate network error (not found)
click.flatMap(e => loadWithFetch("data/movies.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );