let day = document.getElementById("day");
let date = document.getElementById("date");
let month = document.getElementById("month");

let calendar = new Date();
let dy = calendar.getDay();
let mon = calendar.getMonth();

let days = ["Sunday,", "Monday,", "Tuesday,", "Wednesday,","Thursday,", "Friday,", "Saturday,"][dy];
let mnth = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][mon]

month.innerHTML = mnth;
date.innerHTML = calendar.getDate();
day.innerHTML = days;

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        document.getElementById("add").click()
    }
});

function checkInput() {
    let newTaskInput = document.getElementById('input').value;
    if (newTaskInput.trim() === "") {
        alert("Please enter a task!");
     } else {
            return addlist();
        }
    }

    function addlist() {
        let todoItem = document.getElementById('input').value;
        let todoList = JSON.parse(localStorage.getItem('todos')) || [];
        let newTask = { task: todoItem, completed: false }; 
        todoList.push(newTask);
        localStorage.setItem('todos', JSON.stringify(todoList));
        abc();
    }


// Function to display the list
function abc() {
    let todoList = document.getElementById('todoList');
    let savedList = JSON.parse(localStorage.getItem('todos')) || [];
    let check = JSON.parse(localStorage.getItem('check')) || [];
    todoList.innerHTML = '';

    savedList.forEach(function(item, index) {
        let listItem = document.createElement('div');
        listItem.classList.add('list_item');

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.completed; 
        checkbox.onclick = function() {
            savedList[index].completed = checkbox.checked;
            localStorage.setItem('todos', JSON.stringify(savedList));
            if (checkbox.checked) {
                task.classList.add('strikethrough');
                check[index] = true;
            } else {
                task.classList.remove('strikethrough');
                check[index] = false; 
            }
            localStorage.setItem('check', JSON.stringify(check)); 
        };

        let task = document.createElement('h4');
        task.classList.add('task');
        task.textContent = item.task;

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add("btn");
        deleteBtn.onclick = function() {
            listItem.remove();
            savedList.splice(index, 1);
            check.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(savedList));
            localStorage.setItem('check', JSON.stringify(check));
        };

        if (check[index]) {
            task.classList.add('strikethrough');
        }

        listItem.appendChild(checkbox);
        listItem.appendChild(task);
        listItem.appendChild(deleteBtn);

        todoList.appendChild(listItem);
    });

    document.getElementById('input').value = "";

    let count = todoList.length;
    console.log(`length of array is ${count}`)
}

window.addEventListener('load', abc);
