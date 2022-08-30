import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  EMPTY,
  filter,
  fromEvent,
  map,
  mergeMap,
  switchMap,
  tap
} from "rxjs";
import {ajax} from "rxjs/internal/ajax/ajax";

const url = 'https://api.github.com/search/users?q=';

const search = document.getElementById('search');
const result = document.getElementById('result');

const stream$ = fromEvent(search, 'input')
  .pipe(
    map(e => e.target.value),
    debounceTime(1000),  // виводить інформацю з інпут після сукундної затримки після того як перестав щось вводити в інпут
    distinctUntilChanged(),  // не дозволяє посилати запит, якщо в інпут ввести таке ж саме значення як поперднє
    tap(() => result.innerHTML = ''),  //  очищає сторінку після поперднього запиту
    filter(value => value.trim()),
    switchMap(value => ajax.getJSON(url + value).pipe(
      catchError(() => EMPTY)  //  при відправці запиту з пустим інпут, обробляється помилка і спрацьовує complete (EMPTY)
    )), // ajax - функція для асинхронних запитів, яка являється стрімом, тому використовується switchMap, щоб переключитися на цей стрім
    map(response => response.items),
    mergeMap(items => items)  // виводить кожен об"єкт окремо (викликає метод subscribe для кожного об"єкта)
  );

stream$.subscribe(user => {
  const html = `
      <div class="card">
      <div class="card-image">
        <img src="${user.avatar_url}"  alt="${user.login}"/>
        <span class="card-title">${user.login}</span>
      </div>

      <div class="card-action">
        <a href="${user.html_url}" target="_blank">Open GitHub</a>
      </div>
    </div>
  `;

  result.insertAdjacentHTML('beforeend', html);
});