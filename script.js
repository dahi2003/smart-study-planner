function addTask() {
  const title = document.getElementById('taskTitle').value;
  const date = document.getElementById('taskDate').value;

  if (!title || !date) {
    alert("Please enter both task and date.");
    return;
  }

  const task = { title, date };
  let tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];
  tasks.push(task);
  localStorage.setItem('studyTasks', JSON.stringify(tasks));
  renderTasks();
}
function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('studyTasks', JSON.stringify(tasks));
  renderTasks();
}


function renderCalendar(tasks) {
  const calendarEl = document.getElementById('calendar');
  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 600,
    events: tasks.map(task => ({
      title: task.title,
      start: task.date,
      color: task.completed ? '#2ecc71' : '#3498db'
    }))
  });
  calendar.render();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('studyTasks')) || [];

  let completedCount = 0;

  tasks.forEach((task, index) => {
    if (task.completed) completedCount++;

    const div = document.createElement('div');
    div.className = 'task-item';
    div.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleComplete(${index})" />
      <strong>${task.title}</strong><br><small>📅 ${task.date}</small>
    `;
    taskList.appendChild(div);
  });

  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;
  document.getElementById('progressBar').style.width = `${progress}%`;
  document.getElementById('progressText').innerText = `Progress: ${progress}%`;

  renderCalendar(tasks); // 👈 Add this line
}