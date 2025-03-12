const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list_container");

function addTask() {
    if (inputBox.value === '') {
        alert("Cannot add an empty task. Write something before you add!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        // Create the edit button
        let editSpan = document.createElement("span");
        editSpan.innerHTML = "✎";
        editSpan.setAttribute("class", "edit-button");
        li.appendChild(editSpan);

        // Create the delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);

        listContainer.appendChild(li);
    }

    inputBox.value = " ";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("edit-button")) {
        editTask(e.target.parentElement);
    } else if (e.target.tagName === "SPAN" && e.target !== e.target.parentElement.querySelector('.edit-button')) {
        e.target.parentElement.remove();
    }
}, false);

function editTask(taskElement) {
    const currentText = taskElement.childNodes[0].nodeValue; 
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentText;

    taskElement.innerHTML = ''; // Clear the current task
    taskElement.appendChild(input); // Add the input for editing

    input.focus();
    input.addEventListener("blur", () => updateTask(taskElement, input));
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            updateTask(taskElement, input);
        }
    });

    // Restore the edit button after editing
    let editSpan = document.createElement("span");
    editSpan.innerHTML = "✎";
    editSpan.setAttribute("class", "edit-button");
    taskElement.appendChild(editSpan);
}

function updateTask(taskElement, input) {
    taskElement.innerHTML = input.value;

    let editSpan = document.createElement("span");
    editSpan.innerHTML = "✎";
    editSpan.setAttribute("class", "edit-button");
    taskElement.appendChild(editSpan);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    taskElement.appendChild(span);

    saveData();
}

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function displayTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

displayTask();
