import {of, from, Observer, Observable, fromEvent, throwError} from 'rxjs'
import {first, last, single, filter, ignoreElements, timeout, finalize} from 'rxjs/operators';
import {debounce, debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {throttle, throttleTime} from 'rxjs/operators';
import {audit, auditTime} from 'rxjs/operators';
import {skip, skipLast, skipUntil, skipWhile} from 'rxjs/operators';
import {take, takeLast, takeUntil, takeWhile} from 'rxjs/operators';
import {range, timer, interval, empty} from 'rxjs';
import {combineLatest, zip, forkJoin, concat, merge} from 'rxjs';
import {startWith, withLatestFrom, pairwise, race} from "rxjs/operators";
import {pluck, reduce, scan} from 'rxjs/operators';
import {map, mapTo, flatMap, mergeMap, switchMap, exhaustMap, concatMap} from "rxjs/operators";
import {catchError, retry, retryWhen} from 'rxjs/operators'
import {tap, delay} from 'rxjs/operators'
import {
    queueScheduler,
    defer,
    SchedulerLike,
} from 'rxjs';
import {
    repeat,
    delayWhen,
} from 'rxjs/operators';

// v^v delay
export const createSpecialInterval = (number: number, scheduler?: SchedulerLike ) => {
  return interval(0, scheduler).pipe(concatMap(v => of(v).pipe(delay(v * 1000, scheduler))), take(number));
}

// createSpecialInterval(10).subscribe(v => {
//   console.log(v);
//   console.timeEnd('interval');
//   console.time('interval');
// });

const myInput = document.querySelector('input');

// myInput.addEventListener('input', (event: KeyboardEvent) => {
//     console.log((event.target as HTMLInputElement).value);
// });

// ---------

// const p = new Promise((resolve) => {
//     myInput.addEventListener('input', (event) => {
//         resolve(event);
//     });
// });
//
// p.then((event: KeyboardEvent) => console.log((event.target as HTMLInputElement).value));

// --------

// function createEventPromise() {
//     let listener: (event: KeyboardEvent) => void;
//
//     const p = new Promise((resolve) => {
//         listener = (event) => {
//             resolve(event);
//         };
//
//         myInput.addEventListener('input', listener);
//     });
//
//     p.then((event: KeyboardEvent) => {
//         console.log((event.target as HTMLInputElement).value);
//         fetch(`https://api.github.com/search/repositories?q=${(event.target as HTMLInputElement).value}`)
//             .then(response => response.json())
//             .then(response => console.log(response.total_count));
//         myInput.removeEventListener('input', listener);
//         createEventPromise();
//     });
// }
//
// createEventPromise();

// ---------

// const observable = fromEvent(myInput, 'input');
//
// observable.pipe(
//     debounceTime(500),
//     switchMap((event: KeyboardEvent) => {
//         return fetch(`https://api.github.com/search/repositories?q=${(event.target as HTMLInputElement).value}`)
//             .then(response => response.json())
//     })
// ).subscribe(response => console.log(response.total_count))




// =============  create  ===============

// const o = Observable.create((observer: Observer<string>) => {
//     observer.next('Hello!');
//     observer.next('Hello!');
//     observer.next('Hello!');
//     setInterval(() => {
//         observer.next('Hello!')
//     }, 1000);
//     setTimeout(() => {
//         observer.complete();
//     }, 10000)
// });
//
// o.subscribe({
//     next: (value: string) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// ===========  create-methods  =============

// const o = of(5, 6, 7, 7, 34, 9);
// const o = from([4, 5, 34, 3, 98]);
// const o = from(Promise.resolve(5));
// const o = fromEvent(document.body, 'mousemove');
// const o = timer(0, 500);
// const o = interval(500);
// const o = range(0, 100);
// const o = empty(); // закінчить процес
// const o = throwError('My error');

// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// ============  filter  ===========

// const o = range(0, 100).pipe(filter(number => number > 50));
// const o = range(0, 100).pipe(first(number => number > 50));
// const o = range(0, 100).pipe(last(number => number > 50));
// const o = range(0, 100).pipe(single(number => number === 50));
// const o = range(0, 100).pipe(ignoreElements());
// const o = range(0, 100).pipe(debounce(number => timer(1000 * number)));
// const o = range(0,100).pipe(debounceTime(1000));
// const o = from([1, 1, 2, 2, 2]).pipe(distinctUntilChanged()); // повертає тільки унікальні значення
// const o = timer(0, 200).pipe(throttleTime(1000));
// const o = timer(0, 200).pipe(auditTime(1000));
// const o = range(0, 100).pipe(skip(10));
// const o = timer(0, 200).pipe(skipUntil(timer(1000)));
// const o = range(0, 200).pipe(skipLast(2));
// const o = range(0, 100).pipe(take(10));
// const o = timer(0, 300).pipe(takeUntil(timer(1000)));
// const o = timer(0, 300).pipe(takeWhile(number => number < 50));

// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// =============  combine  ================

// const timerOne = timer(1000, 4000).pipe(take(3));
// const timerTwo = timer(2000, 4000).pipe(take(3));
// const timerThree = timer(3000, 4000).pipe(take(3));
//
// // const o = combineLatest(timerOne, timerTwo, timerThree);
// // const o = zip(timerOne, timerTwo, timerThree);
// const o = forkJoin(timerOne, timerTwo, timerThree);
//
// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });

// --------

// // const o1 = timer(0, 1000).pipe(take(3));
// // const o2 = timer(0, 100).pipe(take(3));
//
// // const o = concat(o1, o2);
// // const o = merge(o1, o2);
// // const o = o1.pipe(withLatestFrom(o2));
// // const o = o1.pipe(startWith(5));
// // const o = o1.pipe(pairwise());
//
// const o1 = timer(10, 1000).pipe(take(3), mapTo('first'));
// const o2 = timer(0, 500).pipe(take(3), mapTo('second'));
//
// const o = o1.pipe(race(o2));
//
// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// =============  transformation  ==============

// const o = of({name: 'Bob', age: 33},
//     {name: 'Tom', age: 32})
//     .pipe(pluck('name'));

// const o = of(1, 3, 4, 5).pipe(reduce((acc, current) => acc + current));
// const o = of(1, 3, 4, 5).pipe(scan((acc, current) => acc + current));

// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });

// ---------

// // const o = range(0, 100).pipe(map(n => n * 2));
// // const o = range(0, 100).pipe(mapTo('Hi!'));
// const clicks = fromEvent(document.body, 'click');
// // flatMap === mergeMap
// // const o = clicks.pipe(flatMap(() => interval(1000)));
// // const o = clicks.pipe(switchMap(() => interval(1000)));
// // const o = clicks.pipe(exhaustMap(() => interval(1000).pipe(take(5))));
// const o = clicks.pipe(concatMap(() => interval(1000)));
//
// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// ==================  error  ==================

// const o = interval(1000).pipe(
//     mergeMap(value => {
//         if (value > 3) {
//             return throwError('Error > 3');
//         }
//         return  of(value)
//     }),
//     // catchError((error) => {
//     //     console.log(error);
//     //     return of(false)
//     // })
//
//     // retry(2)
//     retryWhen(errorObservable => errorObservable.pipe(delay(3000)))
// );
//
// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });




// ===============  utility  ===============

// const o = interval(1000).pipe(
//     // delay(2000),
//     delayWhen(del => timer(4000 * del)),
//     tap(n => console.log(Math.random())),
//     timeout(3000), // якщо через три секунди не відбудеться події, то вибє помилку
//     finalize(() => console.log('FINISH')) // після помилки можна виконати ще якісь операції (як 'finally' в try/catch
// )

// o.toPromise() // перетворює observable в promise

// const o = interval(1000).pipe()

// o.subscribe({
//     next: (value: any) => console.log('Next:', value),
//     complete: () => console.log('Complete!'),
//     error: (error) => console.log('Error', error)
// });























