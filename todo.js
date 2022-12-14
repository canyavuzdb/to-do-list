// Tum elementleri secme islemi
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton  = document.querySelector("#clear-todos");

eventListeners();

function eventListeners(){ // Tum element listenerlar
    form.addEventListener("submit",addTodo);
}

function addTodo(e){
    const newtTodo = todoInput.value.trim();

    addTodoToUI(newtTodo);


    e.preventDefault();
}

function addTodoToUI(newtTodo){//string degerini list item olarak UI'ya ekleyecek.

    // List Item olusturma
    const listItem = document.createElement("li");
    // Link olusturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    listItem.className = ("list-group-item d-flex justify-content-between");

    // Text Node ekleme
    listItem.appendChild(document.createTextNode(newtTodo));
    listItem.appendChild(link);
    
    //Todo List'e List Item'i ekleme
    todoList.appendChild(listItem);
    todoInput.value = ""; 

}