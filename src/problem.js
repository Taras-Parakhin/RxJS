import {
  filter, interval, map, scan, take,
}
  from 'rxjs';

const btn = document.getElementById('interval');
const rxjsBtn = document.getElementById('rxjs');
const display = document.querySelector('#problem .result');

const people = [
  { name: 'Vladilen', age: 25 },
  { name: 'Elena', age: 17 },
  { name: 'Ivan', age: 18 },
  { name: 'Igor', age: 14 },
  { name: 'Lisa', age: 32 },
  { name: 'Irina', age: 23 },
  { name: 'Oleg', age: 20 },
];

btn.addEventListener('click', () => {
  btn.disabled = true;
  let i = 0;
  const canDrink = [];

  // eslint-disable-next-line no-shadow
  const interval = setInterval(() => {
    if (people[i]) {
      if (people[i].age >= 18) {
        canDrink.push(people[i].name);
      }
      display.textContent = canDrink.join(' ');
      i += 1;
    } else {
      clearInterval(interval);
      btn.disabled = false;
    }
  }, 1000);
});

rxjsBtn.addEventListener('click', () => {
  rxjsBtn.disabled = true;

  interval(1000)
    .pipe(
      take(people.length),
      filter((value) => people[value].age >= 18),
      map((value) => people[value].name),
      scan((acc, value) => [...acc, value], []),
    )
    .subscribe((res) => {
      display.textContent = res.join(' ');
      // eslint-disable-next-line no-return-assign
    }, null, () => rxjsBtn.disabled = false);
});
