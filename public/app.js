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
  input.value = "";
}
// create new todo as <li>
function createNew(todo) {
  // todo is obj with 2 properties (id, name)
  const newToDo = document.createElement("form");
  newToDo.className = "todo";
  // add update event
  const update = document.createElement("input");
  update.setAttribute("id", `${todo.id}`);
  update.className = "newToDo";
  update.setAttribute("type", "text");
  update.setAttribute("placeholder", `${todo.name}`);
  newToDo.append(update);
  newToDo.addEventListener("submit", (event) => {
    event.preventDefault();
    fetch(`todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: update.value }),
    });
    refresh();
  });

  // add delete/checkbox button
  const del = document.createElement("input");
  del.setAttribute("type", "checkbox");
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
