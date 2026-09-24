
$(document).ready(function () {
  const classNames = {
    TODO_ITEM: 'todo-container',
    TODO_CHECKBOX: 'todo-checkbox',
    TODO_TEXT: 'todo-text',
    TODO_DELETE: 'todo-delete',
  };

  const $list = $('#todo-list');
  const $itemCountSpan = $('#item-count');
  const $uncheckedCountSpan = $('#unchecked-count');
  const $loadingMsg = $('#loading-msg');
  const $adviceBox = $('#advice-box');
  const $adviceText = $('#advice-text');
  const $adviceBtn = $('#advice-btn');

  let itemCount = 0;
  let uncheckedCount = 0;

  function updateCounters() {
    $itemCountSpan.text(itemCount);
    $uncheckedCountSpan.text(uncheckedCount);
  }

  function createTodoElement(text, checked) {
    const $todoItem = $('<li>').addClass(classNames.TODO_ITEM).hide();

    const $checkbox = $('<input>')
      .attr('type', 'checkbox')
      .addClass(classNames.TODO_CHECKBOX)
      .prop('checked', checked);

    const $text = $('<span>').addClass(classNames.TODO_TEXT).text(text);
    if (checked) {
      $text.addClass('checked-text');
    }

    $checkbox.on('change', function () {
      if ($(this).is(':checked')) {
        uncheckedCount--;
        $text.addClass('checked-text');
      } else {
        uncheckedCount++;
        $text.removeClass('checked-text');
      }
      updateCounters();
    });

    const $deleteBtn = $('<button>')
      .addClass(classNames.TODO_DELETE)
      .text('Видалити');

    $deleteBtn.on('click', function () {
      if (!$checkbox.is(':checked')) {
        uncheckedCount--;
      }
      itemCount--;

      $todoItem.fadeOut(400, function () {
        $(this).remove(); 
        updateCounters();
      });
    });

    $todoItem.append($checkbox, $text, $deleteBtn);
    return $todoItem;
  }

  function addTodoToList(text, checked, animate) {
    const $todoItem = createTodoElement(text, checked);
    $list.append($todoItem);

    itemCount++;
    if (!checked) {
      uncheckedCount++;
    }
    updateCounters();

    if (animate) {
      $todoItem.slideDown(400); 
      $todoItem.show();
    }
  }

  window.newTodo = function () {
    const text = prompt('Введіть назву завдання:');
    if (!text || text.trim() === '') return;
    addTodoToList(text.trim(), false, true);
  };

  function loadInitialTodos() {
    $.ajax({
      url: 'https://jsonplaceholder.typicode.com/todos',
      method: 'GET',
      data: { _limit: 5 },
      dataType: 'json',
      success: function (todos) {
        todos.forEach(function (todo) {
          addTodoToList(todo.title, todo.completed, true);
        });
      },
      error: function () {
        const $errorItem = $('<li>')
          .addClass(classNames.TODO_ITEM)
          .text('Не вдалося завантажити початкові задачі. Спробуйте оновити сторінку.');
        $list.append($errorItem);
      },
      complete: function () {
        $loadingMsg.fadeOut(300);
      },
    });
  }


  window.fetchAdvice = function () {
    $adviceBtn.prop('disabled', true);
    $adviceText.text('Завантаження поради...');

    $.ajax({
      url: 'https://api.adviceslip.com/advice',
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        $adviceText.text('💡 ' + data.slip.advice);
      },
      error: function () {
        $adviceText.text('Не вдалося отримати пораду. Перевірте інтернет-з’єднання.');
      },
      complete: function () {
        $adviceBtn.prop('disabled', false);
      },
    });
  };

  loadInitialTodos();
});