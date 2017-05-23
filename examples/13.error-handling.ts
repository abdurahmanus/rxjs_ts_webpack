import { Observable } from "rxjs";
import { load, loadWithFetch } from "./loader";

// 1) at low level we can call error function
let source1 = Observable.create(observer => {
    observer.next(1);
    observer.next(2);
    observer.error("Stop!");
    observer.next(3);
    observer.complete();
});

// 2) throw error
let source2 = Observable.merge(
    Observable.of(1),
    Observable.from([2, 3, 4]),
    Observable.throw(new Error("Stop")),
    Observable.of(5)
);

// 3) skip all errors
let source3 = Observable.onErrorResumeNext(
    Observable.of(1),
    Observable.from([2, 3, 4]),
    Observable.throw(new Error("Stop")),
    Observable.of(5)
);

// 4) catch an error and continue by returning new observable
let source4 = Observable.merge(
    Observable.of(1),
    Observable.from([2, 3, 4]),
    Observable.throw(new Error("Stop")),
    Observable.of(5)
).catch(e => {
    console.log(`catched error: ${e}`);
    return Observable.of(10);
})

source4.subscribe(
    value => console.log(`value: ${value}`),
    e => console.log(`error: ${e}`),
    () => console.log("complete") 
)