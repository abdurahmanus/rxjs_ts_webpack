import { Observable, Observer } from "rxjs";

let numbers = [1,2,3,4,5];
let source = Observable.from(numbers);

class MyObserver implements Observer<number> {
    next(value: number) {
        console.log(`value: ${value}`);
    }

    error(err) {
        console.log(`error: ${err}`);
    }

    complete() {
        console.log("complete");
    }
}

source.subscribe(new MyObserver());