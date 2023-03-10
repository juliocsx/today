import { storage, createElement } from "./utils.js"

const todoForm = document.getElementById("todo-form");
const todoListContainer = document.querySelector(".todo-container ul");
const chuckNorrisPhrase = document.querySelector("#chuck-phrase")

let todos = storage.get("todoList") || "[]";
todos = JSON.parse(todos);

function createToDo(todo) {
    const taskTitle = createElement("h4", null, todo.name);
    const taskDescriptionParagraphy = createElement("p", null, todo.description);
    const taskDate = createElement("p", null, todo.createdAt);
    const taskInfo = createElement("div", null, [taskTitle, taskDescriptionParagraphy]);
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", 20);
    svg.setAttribute("height", 20);
    svg.setAttribute("viewBox", "0 0 20 20");
    svg.setAttribute("fill", "none");
    svg.setAttribute("class", "delete-button");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M6.25 14.8L10 11.05L13.75 14.8L14.8 13.75L11.05 10L14.8 6.25L13.75 5.2L10 8.95L6.25 5.2L5.2 6.25L8.95 10L5.2 13.75L6.25 14.8ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.63333 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20Z");
    path.setAttribute("fill", "#FFA5A5");
    svg.appendChild(path);
    svg.addEventListener("click", (event) => {
        if (confirm(`Você deseja realmente deletar: ${todo.name}`)) {
            const listItemToRemove = event.currentTarget.parentElement;
            listItemToRemove.classList.add("hide");

            const filteredTodos = todos.filter((storageTodo) => {
                if(storageTodo.id !== todo.id) {
                    return storageTodo
                }
            })

            storage.set("todoList", JSON.stringify(filteredTodos))

            setTimeout(function () {
                listItemToRemove.remove()
            }, 300)
        }
    })

    const listItem = createElement("li", null, [taskInfo, taskDate, svg]);
    return listItem
}

todoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const [taskName, taskDescription] = event.target.elements; 
    
    const todo = {
        id: todos.length,
        name: taskName.value,
        description: taskDescription.value,
        createdAt: new Date().toLocaleString()
    };

    
    const li = document.createElement("li");
    const div = document.createElement("div"); 
    
    
    todos.push(todo);
    todoListContainer.appendChild(createToDo(todo));

    storage.set("todoList", JSON.stringify(todos));
});

todos.forEach((todo) => {
    todoListContainer.appendChild(createToDo(todo));
})

setInterval(() => {
    fetch("https://api.chucknorris.io/jokes/random")
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        chuckNorrisPhrase.innerText = data.value;
    })
}, 1000 * 15)