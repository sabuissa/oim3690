import { items } from "./data.js";

const list = document.getElementById("list");

for (const item of items) {
  const li = document.createElement("li");
  li.textContent = item;
  list.appendChild(li);
}