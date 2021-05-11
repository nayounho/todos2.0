let todos = [];

const $todos = document.querySelector(".todos");
const $inputTodos = document.querySelector(".input-todos");
const $addTodo = document.querySelector(".addTodo");
const $todoForm = document.querySelector(".todoForm");
const $nav = document.querySelector(".nav");
const $all = document.querySelector("#all");
const $active = document.querySelector("#active");
const $completed = document.querySelector("#completed");
const $allChecked = document.querySelector(".all-checked");
const $completedDelBtn = document.querySelector(".completed-del-btn");
const $completedDelText = document.querySelector(".completed-del-text");
const $completedActiveBtn = document.querySelector(".completed-active-btn");

const render = () => {
  let renderTodos = [];
  if ($all.classList.contains("active")) {
    renderTodos = todos;
  } else if ($active.classList.contains("active")) {
    renderTodos = todos.filter(todo => todo.completed === true);
  } else if ($completed.classList.contains("active")) {
    renderTodos = todos.filter(todo => todo.completed === false);
  }
  $todos.innerHTML = renderTodos
    .map(
      todo => `
      <li id=${todo.id} class='todo-item'>
      <input id=ck-${todo.id} class='checkbox' type='checkbox' ${todo.completed ? "checked" : ""} />
      <label id=ck=${todo.id} ${
        todo.completed ? "style='text-decoration: line-through red'" : ""
      }>${todo.content}</label>
      <button class='removeTodo'>X</button>
      </li>`
    )
    .join("");

  $completedDelText.textContent = todos.filter(todo => todo.completed === true).length;
  $completedActiveBtn.textContent = todos.length - $completedDelText.textContent;
};

const fetchTodos = () => {
  todos = [
    { id: 1, content: "HTML", completed: false },
    { id: 2, content: "CSS", completed: true },
    { id: 3, content: "JS", completed: false }
  ];

  todos = [...todos].sort((todo1, todo2) => todo2.id - todo1.id);
  render();
};

const addTodo = content => {
  todos = [
    {
      id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      content,
      completed: false
    },
    ...todos
  ];
  render();
};

const toggleTodo = id => {
  todos = todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  render();
};

$todoForm.addEventListener("submit", e => {
  e.preventDefault();
  if ($inputTodos.value === "") return;
  const inputValue = $inputTodos.value;
  addTodo(inputValue);
  $inputTodos.value = "";
  $inputTodos.focus();
});

$todos.addEventListener("change", e => {
  toggleTodo(+e.target.parentNode.id);
});

$todos.addEventListener("click", e => {
  if (!e.target.matches(".todos > li > button.removeTodo")) return;
  todos = todos.filter(todo => todo.id !== +e.target.parentNode.id);
  render();
});

$nav.addEventListener("click", e => {
  const navChild = [...$nav.children];
  const targetId = e.target.id;
  navChild.forEach(li => {
    targetId === li.id ? e.target.classList.add("active") : li.classList.remove("active");
  });
  render();
});

$allChecked.addEventListener("change", () => {
  todos = todos.map(todo => ({
    ...todo,
    completed: $allChecked.checked
  }));
  render();
});

$completedDelBtn.addEventListener("click", () => {
  todos = todos.filter(todo => todo.completed === false);
  render();
});

document.addEventListener("DOMContentLoaded", fetchTodos);
