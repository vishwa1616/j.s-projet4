let currentUser = '';

function register() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('http://localhost:8080/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => res.text()).then(alert);
}

function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }).then(res => {
    if (res.ok) {
      currentUser = username;
      alert('Login successful');
      getTasks();
    } else {
      alert('Login failed');
    }
  });
}

function createTask() {
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const priority = document.getElementById('priority').value;
  const deadline = document.getElementById('deadline').value;
  fetch(`http://localhost:8080/api/tasks?username=${currentUser}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description, priority, deadline, status: 'pending' })
  }).then(() => getTasks());
}

function getTasks(status = '') {
  let url = `http://localhost:8080/api/tasks?username=${currentUser}`;
  if (status) url += `&status=${status}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('task-list');
      list.innerHTML = '';
      data.forEach(task => {
        const div = document.createElement('div');
        div.className = 'task';
        div.innerHTML = `<strong>${task.title}</strong><br>${task.description}<br>Priority: ${task.priority}<br>Status: ${task.status}<br>Deadline: ${task.deadline}`;
        list.appendChild(div);
      });
    });
}
