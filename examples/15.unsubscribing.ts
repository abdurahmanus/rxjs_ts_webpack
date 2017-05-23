import { Observable } from "rxjs";
import { load } from "./loader";

let output = document.createElement("div");
document.body.appendChild(output);

function renderMovies(movies) {       
    movies.forEach(m => {
        let div = document.createElement("div");
        div.innerText = m.title;
        output.appendChild(div);
    });
}

let subscription = 
    load("data/movies.json")
        .subscribe(renderMovies,
            e => console.log(`error: ${e}`),
            () => console.log("complete"));

console.log(subscription);
subscription.unsubscribe();