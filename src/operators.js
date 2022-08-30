import {interval, fromEvent} from "rxjs";
import {
  map, filter, tap, take, takeLast, takeWhile, scan, reduce, switchMap
} from 'rxjs/operators';

// const stream$ = interval(1000)
//   .pipe(
//     tap(value => console.log('Tap: ', value)),
//     map(value => value * 3),
//     filter(value => value % 2 === 0),
//     take(5)
//   )
//
// stream$.subscribe({
//   next: value => console.log('Next: ', value),
//   complete: () => console.log('Complete')
// })

// ==================================================

// const stream$ = interval(1000)
//   .pipe(
//     tap(value => console.log('Tap: ', value)),
//     take(5),
//     takeLast(5)
//   )
//
// stream$.subscribe({
//   next: value => console.log('Next: ', value),
//   complete: () => console.log('Complete')
// })

// ==================================================

// const stream$ = interval(1000)
//   .pipe(
//     tap(value => console.log('Tap: ', value)),
//     takeWhile(value => value < 7),
//   )
//
// stream$.subscribe({
//   next: value => console.log('Next: ', value),
//   complete: () => console.log('Complete')
// })

// =================================================

// const stream$ = interval(1000)
//   .pipe(
//     scan((acc, value) => acc + value, 0)
//   )
//
//
// stream$.subscribe({
//   next: value => console.log('Next: ', value),
//   complete: () => console.log('Complete')
// })

// ================================================

// const stream$ = interval(1000)
//   .pipe(
//     tap(value => console.log(value)),
//     take(10),
//     reduce((acc, value) => acc + value, 0)
//   )
//
//
// stream$.subscribe({
//   next: value => console.log('Next: ', value),
//   complete: () => console.log('Complete')
// })

// ==============================================

// fromEvent(document, 'click')
//   .subscribe(() => {
//     const stream$ = interval(1000)
//       .pipe(
//         tap(value => console.log(value)),
//         take(5),
//         reduce((acc, value) => acc + value, 0)
//       )
//     stream$.subscribe({
//       next: value => console.log('Next: ', value),
//       complete: () => console.log('Complete')
//     })
//   })

// =================   else   =======================

fromEvent(document, 'click')
  .pipe(
    switchMap(event => {
      return interval(1000)
        .pipe(
          tap(value => console.log(value)),
          take(5),
          reduce((acc, value) => acc + value, 0)
        )
    })
  )
  .subscribe({
    next: value => console.log('Next: ', value),
    complete: () => console.log('Complete')
  });

