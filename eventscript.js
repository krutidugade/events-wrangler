const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const events = JSON.parse(localStorage.getItem("events")) || [];

const eventName = events[id];

document.getElementById("name").innerText = eventName;