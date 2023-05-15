const container = document.getElementById("container");
const list = document.getElementById("list");
const form = document.getElementById("form");
const input = document.getElementById("input");

// empty list; read DB and append all existing todos to list.
function refresh() {
  $("#list").empty();
  fetch("/todo")
    .then((res) => res.json())
    .then((data) => {
      // data is an array, each element is a todo
      for (let todo of data) {
        // loop through array, create a <li> element and append it to <ul>.
        list.append(createNew(todo));
      }
    });
}
// create new todo as <li>
function createNew(todo) {
  // todo is obj with 2 properties (id, name)
  const newToDo = document.createElement("li");
  newToDo.innerText = `${todo.name}`;
  // add update event
  newToDo.addEventListener("click", (event) => {});

  // add delete button
  const del = document.createElement("button");
  del.setAttribute("type", "submit");
  del.innerText = "delete";
  newToDo.prepend(del);
  // add delete event listener
  del.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`/todo/${todo.id}`, {
      method: "DELETE",
    });
    refresh();
  });
  return newToDo;
}

// add submit event
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // update backend DB -- send post request
  fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: input.value }),
  });
  refresh();
});

refresh();
