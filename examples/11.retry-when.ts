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
    }).retryWhen(retryStrategy({delay: 1500, attempts: 3})); // complex logic
}

function retryStrategy({delay = 1000, attempts = 4}) {
    return function(errors) {
        return errors
            .scan((acc, value) => {
                console.log(acc, value);
                return acc + 1;
            }, 0)
            .takeWhile(acc => acc < attempts)
            .delay(delay);
    }
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