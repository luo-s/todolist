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
  return newToDo;
}

// add new todo
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(input.value);
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
