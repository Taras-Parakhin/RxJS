// import {of, from, Observable, fromEvent} from 'rxjs';
import {interval, range, timer} from 'rxjs';
import {scan, map} from 'rxjs/operators';

// const stream$ = of('hello', 'world', 3, 4);
//
// stream$.subscribe(value => {
//   console.log(value);
// });

// ======================================================================

// const arr$ = from([1, 2, 3, 4]).pipe(
//   scan((acc, value) => [...acc, value], [])
// );
//
// arr$.subscribe(value => console.log(value));

// ======================================================================

// const stream$ = new Observable(observer => {
//   observer.next('first value')
//   setTimeout(() => observer.next('after 1000ms'), 1000)
//   setTimeout(() => observer.complete(), 1500)
//   setTimeout(() => observer.error('something went wrong after 2000ms'), 2000)
//   setTimeout(() => observer.next('after 3000ms'), 3000)
// });

// stream$.subscribe(
//   value => console.log(value),
//   (err) => console.log(err),
//   () => console.log('complete')
// );

// stream$.subscribe({
//   next(value) {
//     console.log(value)
//   },
//   error(error) {
//     console.log(error)
//   },
//   complete() {
//     console.log('Complete')
//   }
// });

// =======================================================================

// fromEvent(document.querySelector('canvas'), 'mousemove')
//   .pipe(
//     map(e => ({
//       x: e.offsetX,
//       y: e.offsetY,
//       ctx: e.target.getContext('2d')
//     }))
//   )
//   .subscribe(pos => pos.ctx.fillRect(pos.x, pos.y, 2, 2))
//
// const clear$ = fromEvent(document.getElementById('clear'), 'click')
//
// clear$.subscribe(() => {
//   const canvas = document.querySelector('canvas');
//   canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
// });

// =========================================================================

// const sub = interval(500).subscribe(value => console.log(value))
//
// setTimeout(() => {
//   sub.unsubscribe()
// }, 4000)

// ========================================================================

timer(2500).subscribe(value => console.log(value))

// =======================================================================

// range(20, 10).subscribe(value => console.log(value))