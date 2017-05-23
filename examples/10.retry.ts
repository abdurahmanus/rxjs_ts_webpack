import { Observable } from "rxjs";

let button = document.createElement("button");
button.textContent = "Load movies";
document.body.appendChild(button);

let output = document.createElement("div");
document.body.appendChild(output);

let click = Observable.fromEvent(button, "click");

function load(url: string) {
    return Observable.create(observer => {
        let xhr = new XMLHttpRequest();

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                observer.next(data);
                observer.complete();
            } else {
                observer.error(xhr.statusText);
            }
        });

        xhr.open("GET", url);
        xhr.send();
    }).retry(3); // simple retry logic
}

function renderMovies(movies) {       
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

// simulate network error (not found)
click.flatMap(e => load("data/error.json"))
    .subscribe(
        renderMovies,
        e => console.log(`error: ${e}`),
        () => console.log("complete")
    );