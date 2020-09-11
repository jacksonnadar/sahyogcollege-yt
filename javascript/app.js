const todo_input_form = document.querySelector('.todo-input-form');
const todo_lists = document.querySelector('.todo-lists');
getFromLocalStorage();
const ticks = todo_lists.querySelectorAll('.tick');
const crosses = todo_lists.querySelectorAll('.cross');
console.log(ticks);
ticks.forEach((tick) =>
  tick.addEventListener('click', () => onTickCliked(tick))
);
crosses.forEach((cross) =>
  cross.addEventListener('click', () => onCrossClicked(cross))
);

//get from localstorage
function getFromLocalStorage() {
  const locally_saved_todo = localStorage.getItem('todo_lists_storage');
  locally_saved_todo ? (todo_lists.innerHTML = locally_saved_todo) : null;
}

const onTickCliked = (tick) => {
  tick.parentNode.parentNode.children[0].classList.toggle('line-through');
  saveInLocalStorage();
};

const onCrossClicked = (cross) => {
  cross.parentNode.parentNode.parentNode.removeChild(
    cross.parentNode.parentNode
  );
  saveInLocalStorage();
};

function newTodoList(todo_text, completed) {
  const new_todo = document.createElement('div');
  new_todo.classList.add('list');
  new_todo.innerHTML = `
  <div class="todo truncate ${
    completed ? 'line-through' : ''
  }" title="${todo_text}">${todo_text}</div>
  <div class="buttons">
    <div class="tick">
      <svg
        width="25"
        height="20"
        viewBox="0 0 25 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 10.75L9 17L23 2"
          stroke="#69DE5F"
          stroke-width="4"
        />
      </svg>
    </div>
    <div class="cross">
      <svg
        width="24"
        height="17"
        viewBox="0 0 24 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2 2L22 15M22 2L2 15"
          stroke="#EB6A6A"
          stroke-width="4"
        />
      </svg>
    `;
  todo_lists.appendChild(new_todo);
  const todo = new_todo.querySelector('.todo');
  const tick = new_todo.querySelector('.tick');
  const cross = new_todo.querySelector('.cross');

  todo.addEventListener('click', () => todo.classList.toggle('truncate'));
  console.log({ tick, cross });
  tick.addEventListener('click', onTickCliked.bind(null, tick));
  cross.addEventListener('click', () => onCrossClicked(cross));
}
todo_input_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input_value = todo_input_form.input.value;
  todo_input_form.input.value = '';
  if (input_value == '') return;

  newTodoList(input_value, false);
  saveInLocalStorage();
});

function saveInLocalStorage() {
  localStorage.todo_lists_storage = document.querySelector(
    '.todo-lists'
  ).innerHTML;
}
