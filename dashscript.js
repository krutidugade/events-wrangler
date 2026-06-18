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
      ${event}
      <button onclick="deleteEvent(${i})">X</button>
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

function deleteEvent(index) {
  events.splice(index, 1);

  saveDB();
  render();
}

render();