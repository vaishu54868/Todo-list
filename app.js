let tasks = [];
const messages = [
    "🎉 Well Done! You're unstoppable!",
    "🚀 Keep going, the sky is the limit!",
    "🌟 Every small step counts!",
    "💡 You’re on fire! Keep it up!",
    "🏆 Success is just around the corner!"
];

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if (text) {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateTasksList();
    }
};

const updateTasksList = () => {
    const taskList = document.querySelector('.task-list');
    const progress = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    taskList.innerHTML = '';

    let completedTasks = 0;

    tasks.forEach((task, index) => {
        if (task.completed) completedTasks++;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="taskItem">
                <div class="task ${task.completed ? 'completed' : ''}">
                    <input type="checkbox" class="checkbox" ${task.completed ? 'checked' : ''}/>
                    <p>${task.text}</p>
                </div>
                <div class="icons">
                    <img src="./img/edit.png" onClick="editTask(${index})"/>
                    <img src="./img/bin.png" onClick="deleteTask(${index})"/>
                </div>
            </div>
        `;

        listItem.querySelector(".checkbox").addEventListener('change', () => toggleTaskComplete(index));
        taskList.appendChild(listItem);
    });

    const totalTasks = tasks.length;
    const percentage = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
    progress.style.width = `${percentage}%`;
    numbers.textContent = `${completedTasks} / ${totalTasks}`;

    if (completedTasks === totalTasks && totalTasks > 0) {
        triggerCompletionEffect();
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    updateTasksList();
};

const editTask = (index) => {
    const newTask = prompt("Edit your task:", tasks[index].text);
    if (newTask !== null && newTask.trim() !== '') {
        tasks[index].text = newTask.trim();
        updateTasksList();
    }
};

document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});

// 🎇 Completion Effect 🎇
const triggerCompletionEffect = () => {
    const effectContainer = document.getElementById('completionEffect');
    effectContainer.innerHTML = '';
    effectContainer.style.display = 'block';

    // Coin Animation
    for (let i = 0; i < 30; i++) {
        const coin = document.createElement('div');
        coin.classList.add('coin');
        coin.style.left = Math.random() * 100 + 'vw';
        coin.style.top = Math.random() * -100 + 'px';
        effectContainer.appendChild(coin);
    }

    // Random Inspirational Message
    const message = document.createElement('div');
    message.classList.add('message');
    message.textContent = messages[Math.floor(Math.random() * messages.length)];
    effectContainer.appendChild(message);

    // Remove effect after 3 seconds
    setTimeout(() => {
        effectContainer.style.display = 'none';
    }, 3000);
};
