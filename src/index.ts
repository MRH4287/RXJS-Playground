import { BehaviorSubject, forkJoin, merge, Observable, of, Subject, timer } from "rxjs";
import { delay, distinctUntilChanged, filter, finalize, map, mergeMap, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Api, ApiResult } from "./fakeApi";
import { Playground } from "./playground";

/*
  What is on the Playground?
  - A button
  - An Output-Element
  - A list of indicators


  Explaination for Playground-Class:
  - It allows the interaction with the Playground
  - It automates small, not important, tasks which are used for visualization


  What methods are used?
  - getButton -> Returns the instance of the Button used in the Playground
  - getButtonEvent -> Returns an Observable that is triggered when the button is used
  - setResult -> Prints a result to the Result-Element and console
  - lightIcon -> Generates a pipeable method that briefly flash one of the indicators
  - lightIconImediate -> briefly flash one of the indicators
  - enableIndicator -> Enable a given count of indicators for the current test
  - makePublic -> Make sure some RxJs Classes are in the Window, to test some data

*/

Playground.makePublic();

// Hide Icons for now
Playground.enableIcon(0);


/*
  - mergeMap (flatMap)
  - switchMap
  - forkJoin
  - map
  - delay
  - takeUntil
  - take
  - merge
  - combineLatest


  - Subject
  - BehaviorSubject

  - Subscription
  - Subscriber

  - timer

*/


/* Part1 -- How does RxJS work? */
// Try in Console:
// var event = Playground.getButtonEvent();
// try pressing the button

//var subscription = event.subscribe(data => console.log(data));
// try pressing the button

// subscription.unsubscribe();
// try pressing the button











/* Part2 -- How does RxJS work? */

if (false) {

  Playground.enableIcon(1);

  const dataSource = new Subject<string>();
  dataSource
    .pipe(
      Playground.lightIcon(1),
      tap(result => Playground.setResult(result))
    ).subscribe();
    // .subscribe(result => {

    //   Playground.setResult(result);

    // });

  // What happens?
  //A: Nothing. Why? -> No Data

  dataSource.next("Hi");


  // -------------- Closing of Observable -------
  dataSource.complete();
  dataSource.next("Hello World");

  // Try in console:

  // var data = new Subject();
  // data.subscribe(el => console.log(el));
  // data.next("Data");
  // data.complete();
  // data.next("Data 2");



}


/* Part 3 - Data Sources */

if (false) {

  const subject = new Subject<string>();
  // Replace with: new BehaviorSubject<string>(null);

  subject.next("1");
  subject.subscribe(value => Playground.setResult(value));

  subject.next("2");
  subject.next("3");


  // Static Source

  const ofSource = of('Hello World');
  const ofSourceSubscription = ofSource.subscribe(v => Playground.setResult(v));

  Playground.setResult('Is Completed? ' + ofSourceSubscription.closed)


}



/* Part 4 -- Transformations */

if (false) {


  of('hello world').pipe(

    startWith('start'),
    tap(input => Playground.setResult(input), error => console.error(error), () => console.log('Completed')),
    map(input => {
      return input.toUpperCase();
    })

  ).subscribe(Playground.setResult);

}




/* Part 5 -- Filter */

if (false) {

  // Delay 0ms - Every 1000ms

  const source = timer(0, 500);


  source
    .pipe(
      filter(input => input % 2 === 0)
    )
    .subscribe(Playground.setResult);


}




/* Part 6 -- Async Methods */

if (true) {
  Playground.enableIcon(3);


  // Api.echoCall("Hello World").subscribe(Playground.setResult);


  // Anti-Pattern
  // Playground.getButtonEvent().subscribe(() => {
  //   Playground.lightIconImediate(1);

  //   Api.echoCall("Call 1").subscribe(result => {
  //     Playground.lightIconImediate(2);
  //     Playground.setResult(result);
  //     if (result.success) {

  //       Api.echoCall("Call 2").pipe(Playground.lightIcon(3)).subscribe(Playground.setResult);
  //     } else {
  //       Api.echoCall("Call 3").pipe(Playground.lightIcon(3)).subscribe(Playground.setResult);
  //     }
  //   })
  // });


  Playground.getButtonEvent().pipe(
    Playground.lightIcon(1),
    mergeMap(() => {
      return Api.echoCall("Call 1").pipe(
        tap(Playground.setResult),
        Playground.lightIcon(2),
        mergeMap(result => {
          if (result.success) {
            return Api.echoCall("Call 2");
          } else {
            return Api.echoCall("Call 3");
          }
        })
      )
    }),
    Playground.lightIcon(3)
  ).subscribe(Playground.setResult);



}


// const buttonClick = Playground.getButtonEvent();
// const button = Playground.getButton();

// buttonClick.pipe(
//   tap(() => button.disabled = true),
//   Playground.lightIcon('icon1'),
//   mergeMap(event => Api.getResultRandom(event)),
//   map(e => JSON.stringify({
//     success: e.success,
//     data: {
//       x: e.data?.clientX,
//       y: e.data?.clientY
//     }
//   })),
//   tap(() => button.disabled = false),
//   Playground.lightIcon('icon2'),
// ).subscribe(result => {
//   Playground.setResult(result);
// });

// const observables: Observable<ApiResult<number>>[] = [];
// for (let i = 0; i < 100; i++) {
//   observables[i] = Api.getResultRandom(i);
// }

// forkJoin(observables).subscribe(res => setResult(res));
// merge(...observables).subscribe(res => setResult(res));


// of(2).pipe(
//   switchMap(val => {
//     return timer(1, 23).pipe(map(_ => val))
//   })
// );






