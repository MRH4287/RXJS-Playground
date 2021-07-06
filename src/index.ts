import { forkJoin, merge, Observable, of, Subject, timer } from "rxjs";
import { delay, distinctUntilChanged, filter, finalize, map, mergeMap, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Api, ApiResult } from "./fakeApi";

// -- Setup
const setResult = (value: any) => {
  document.getElementById('result').innerText = String(value);
  console.log(value);
}

const buttonClick = new Subject<MouseEvent>();
const button: HTMLButtonElement = <HTMLButtonElement>document.getElementById('button');
button.onclick = event => buttonClick.next(event);

// ---------- End Setup


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

buttonClick.pipe(
  tap(() => button.disabled = true),
  mergeMap(event => Api.getResultRandom(event)),
  map(e => JSON.stringify({
    success: e.success,
    data: {
      x: e.data?.clientX,
      y: e.data?.clientY
    }
  })),
  tap(() => button.disabled = false)
).subscribe(result => {
  setResult(result);
});

const observables: Observable<ApiResult<number>>[] = [];
for (let i = 0; i < 100; i++) {
  observables[i] = Api.getResultRandom(i);
}

// forkJoin(observables).subscribe(res => setResult(res));
// merge(...observables).subscribe(res => setResult(res));







