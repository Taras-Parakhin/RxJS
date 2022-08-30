import {Subject, BehaviorSubject, ReplaySubject} from "rxjs";

// document.addEventListener('click', () => {
//   const stream$ = new Subject()
//
//   stream$.subscribe(value => console.log(value))
//
//   stream$.next('hello')
//   stream$.next('rx')
//   stream$.next('js')
// })

// =================================================

// document.addEventListener('click', () => {
//   const stream$ = new BehaviorSubject('first')
//
//   // stream$.subscribe(value => console.log(value))
//
//   stream$.next('hello')
//   stream$.next('rx')
//   stream$.next('js')
//
//   stream$.subscribe(value => console.log(value))
// })

// ================================================

document.addEventListener('click', () => {
  const stream$ = new ReplaySubject(1)

  stream$.next('hello')
  stream$.next('rx')
  stream$.next('js')

  stream$.subscribe(value => console.log(value))
})