
const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};


const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let itemCount = 0;
let uncheckedCount = 0;


function newTodo() {
  const text = prompt('Введіть назву завдання:');

  if (!text || text.trim() === '') return;

  const todoItem = document.createElement('li');
  todoItem.className = classNames.TODO_ITEM;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = classNames.TODO_CHECKBOX;

  checkbox.addEventListener('change', function () {
    if (this.checked) {
      uncheckedCount--;
    } else {
      uncheckedCount++;
    }
    updateCounters();
  });

  const spanText = document.createElement('span');
  spanText.className = classNames.TODO_TEXT;
  spanText.textContent = text;

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Видалити';
  deleteBtn.className = classNames.TODO_DELETE;


  deleteBtn.addEventListener('click', function () {
    if (!checkbox.checked) {
      uncheckedCount--;
    }
    itemCount--;
    todoItem.remove();
    updateCounters();
  });

  todoItem.appendChild(checkbox);
  todoItem.appendChild(spanText);
  todoItem.appendChild(deleteBtn);

  list.appendChild(todoItem);
  itemCount++;
  uncheckedCount++;
  updateCounters();
}

function updateCounters() {
  itemCountSpan.textContent = itemCount;
  uncheckedCountSpan.textContent = uncheckedCount;
}