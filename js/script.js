/// Database Simulation
let tasksDb = [];
let editingIndex = null;
/// Add Functionality
function addTask() {
    /// Get Input Values
    const taskInput = document.getElementById('todo-input');
    const taskDate = document.getElementById('todo-date');
    const btn = document.getElementById('add-task-button');


    /// Validate Input
    if (validateInput(taskInput.value, taskDate.value)) {
        if (editingIndex !== null) {
            // Update existing task
            tasksDb[editingIndex].task = taskInput.value;
            tasksDb[editingIndex].date = taskDate.value;

            editingIndex = null;
            btn.innerHTML = '<i class="fa fa-plus"></i>';
        } 
        else 
        {
            /// Create Task Object
            const newTask = {
                task: taskInput.value,
                date: taskDate.value,
                status: 'Pending'
            }

            /// Add to database
            tasksDb.push(newTask);
        }
        /// Render
        renderTasks();

        taskInput.value = '';
        taskDate.value = '';
    }
}

/// Render Functionality
function renderTasks() {
    /// Clear Existing List
    const taskList = document.getElementById('task-lists');
    taskList.innerHTML = '';

    /// Render Each Task
    tasksDb.forEach((taskObj, index) => {
        //taskList.innerHTML += `<li>${taskObj.task} - ${taskObj.date}</li>`;
        taskList.innerHTML += `<tr data-index="${tasksDb.indexOf(taskObj)}">
                                    <td class="border border-gray-300 px-4 py-2">${taskObj.task}</td>
                                    <td class="border border-gray-300 px-4 py-2">${taskObj.date}</td>
                                    <td class="border border-gray-300 px-4 py-2">${taskObj.status}</td>
                                    <td class="border border-gray-300 px-4 py-2">
                                        <i class="far fa-edit" onclick="editTasks(this)" style="cursor:pointer;"></i> 
                                        <i class="fa fa-check" onclick="completeTasks(this)" style="cursor:pointer;"></i>
                                        <i class="far fa-trash-alt" onclick="deleteTasks(this)" style="cursor:pointer;"></i>
                                    </td>
                               </tr>`;

    });
}

/// Delete All Functionality
function deleteAllTasks() {
    /// Clear Database
    tasksDb = [];

    /// Render
    renderTasks();
}

function toggleDropdown() {
  document.getElementById("dropdownMenu").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    const dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      const openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};

/// Filter Functionality (Placeholder)
function filterTasks(statusFilter) { 
    const taskList = document.getElementById('task-lists');
    taskList.innerHTML = '';

    const filteredTasks = tasksDb.filter(task => {
        if (statusFilter === 'All') return true;
        return task.status === statusFilter;
    });

    filteredTasks.forEach((taskObj, index) => {
        taskList.innerHTML += `<tr data-index="${tasksDb.indexOf(taskObj)}">
            <td class="border border-gray-300 px-4 py-2">${taskObj.task}</td>
            <td class="border border-gray-300 px-4 py-2">${taskObj.date}</td>
            <td class="border border-gray-300 px-4 py-2">${taskObj.status}</td>
            <td class="border border-gray-300 px-4 py-2">
                <i class="far fa-edit" onclick="editTasks(this)" style="cursor:pointer;"></i> 
                <i class="fa fa-check" onclick="completeTasks(this)" style="cursor:pointer;"></i>
                <i class="far fa-trash-alt" onclick="deleteTasks(this)" style="cursor:pointer;"></i>
            </td>
            <td></td>
        </tr>`;
    });
}

function deleteTasks(icon){
    const row = icon.closest('tr'); 
    row.remove(); 
    const index = row.getAttribute('data-index');

    if(index !== null){
        tasksDb.splice(index, 1);
        renderTasks();
    }
}

function completeTasks(icon){
    const row = icon.closest('tr');
    const index = row.getAttribute('data-index');

    if (index !== null) {
        tasksDb[index].status = 'Completed';
        
        renderTasks();
    }
    
}

function editTasks (icon){
    const row = icon.closest('tr');
    const index = row.getAttribute('data-index');
    const taskObj = tasksDb[index];

    if(taskObj.status !== 'Completed'){
        // Set values to input fields
        document.getElementById('todo-input').value = taskObj.task;
        document.getElementById('todo-date').value = taskObj.date;

        // Set the editing index
        editingIndex = index;

        const btn = document.getElementById('add-task-button');
        btn.innerHTML = '<i class="fa fa-check"></i>';
    }
    else{
        alert('Status Already Completed cannot be edited');
    }
}

/// Input Validation
function validateInput(task, date) {
    /// Simple Validation
    if (task.trim() === '' || date.trim() === '') {
        alert('Please enter both task and due date.');
        return false;
    }
    return true;
}