const items = ["One", "Two", "Three", "Four", "Five"];

let positions = {
    left: [],
    right: [],
};

let savedPositions = localStorage.getItem("positions");

if (savedPositions) {
    positions = JSON.parse(savedPositions);
} else {
    positions.left = Object.keys(items);
}

const select = (element) => document.querySelector(element);

const leftBar = select("#left");
const rightBar = select("#right");

let selected;

let movingFrom;
let movingTo;

items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("item");
    div.setAttribute("draggable", true);
    div.setAttribute("id", index);
    div.textContent = `Item number :: ${item}`;

    div.addEventListener("dragstart", (e) => {
        movingFrom = e.target.parentElement.id;
        selected = e.target;
    });

    if (positions.left.includes(String(index))) {
        leftBar.appendChild(div);
    } else rightBar.appendChild(div);
});

rightBar.addEventListener("dragover", (e) => {
    e.preventDefault();
});

rightBar.addEventListener("drop", (e) => {
    movingTo = e.target.id;
    rightBar.appendChild(selected);
    updatePositions();
});

leftBar.addEventListener("dragover", (e) => {
    e.preventDefault();
});

leftBar.addEventListener("drop", (e) => {
    movingTo = e.target.id;
    leftBar.appendChild(selected);
    updatePositions();
});

const updatePositions = () => {
    const id = String(selected.id);
    if (!positions.left.includes(id)) {
        positions.right.push(id);
        positions.left = positions.left.filter((item) => item != id);
    }

    if (!positions.right.includes(id)) {
        positions.left.push(id);
        positions.right = positions.right.filter((item) => item != id);
    }

    selected = null;
    console.log(positions);
    saveToLocaStorage();
};

const saveToLocaStorage = () =>
    localStorage.setItem("positions", JSON.stringify(positions));
