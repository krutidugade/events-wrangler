const token = localStorage.getItem("token");

// if not logged in → go back
if (!token) {
  window.location.href = "index.html";
}

// decode token (just for display)
const payload = JSON.parse(atob(token.split('.')[1]));

document.getElementById("user").innerHTML =
  "Hello " + payload.name + "<br>" + payload.email;

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

let events = JSON.parse(localStorage.getItem("events")) || [];

function saveDB() {
  localStorage.setItem("events", JSON.stringify(events));
}

function render() {
  const list = document.getElementById("list");
  list.innerHTML = "";

  events.forEach((event, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span id="event-${i}">${event}</span>
      <span id="actions-${i}">
        <button onclick="editEvent(${i})">✏️</button>
        <button onclick="deleteEvent(${i})">❌</button>
        </span>
    `;

    list.appendChild(li);
  });
}

function addEvent() {
  const name = document.getElementById("name").value;
  if (!name) return;

  events.push(name);

  saveDB();
  render();

  document.getElementById("name").value = "";
}

function editEvent(index) {
  const span = document.getElementById(`event-${index}`);
  const actions = document.getElementById(`actions-${index}`);

  span.innerHTML = `
    <input
      id="edit-${index}"
      value="${events[index]}"
    />
  `;
  actions.innerHTML = `
    <button onclick="saveEdit(${index})">Save</button>
    <button onclick="render()">Cancel</button>
  `;
}

function saveEdit(index) {
  const input = document.getElementById(`edit-${index}`);
  const newName = input.value.trim();

  if (!newName) return;

  events[index] = newName;

  saveDB();
  render();
}

function deleteEvent(index) {
  events.splice(index, 1);

  saveDB();
  render();
}

render();
