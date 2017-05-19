import {Observable, Observer} from "rxjs";

let numbers = [1,2,3,4,5,6];
// lower level api
let source = Observable.create(observer => {
     for (let n of numbers) {
         
         // error example
         if (n === 5) {
             observer.error("Something went wrong");
         }

         observer.next(n);
     }
     observer.complete();
});

source.subscribe(
    value => console.log(`value: ${value}`),
    error => console.log(`error: ${error}`),
    () => console.log("complete")
)