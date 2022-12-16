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
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
}

function deleteTodo(e){
    
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo basariyla silindi...")

    }
}

function deleteTodoFromStorage(removeTodo){
    let todos = getTodosFormStorage();
    todos.forEach(function(todo,index){
        if(todo === removeTodo){
            todos.splice(index,1);

        }

    })
    localStorage.setItem("todos",JSON.stringify(todos));
}


function loadAllTodosToUI(){
    let todos = getTodosFormStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);
    })
}

function addTodo(e){
    const newtTodo = todoInput.value.trim();

    if(newtTodo === ""){

        showAlert("danger","Lutfen bir todo girin...")
    }
    else {
        addTodoToUI(newtTodo);
        addTodoToStorage(newtTodo);
        showAlert("success","Todo basariyla eklendi...");
    }


    e.preventDefault();
}

function getTodosFormStorage(){
    let todos;
    
    if (localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos;
    
}

function addTodoToStorage(newtTodo){
    let todos = getTodosFormStorage();
    todos.push(newtTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function showAlert(type,message){ // 
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    // setTimeout
    setTimeout(function(){
        alert.remove();
    },1000);
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