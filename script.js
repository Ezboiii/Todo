// Get the todo list container and input field
const todoContainer = document.getElementById('todo-container');
const todoInput = document.getElementById('todo-input');

// Load the todos from local storage if they exist
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add event listener to the add button to add new todos
const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', () => {
	const todoText = todoInput.value.trim();
	if (todoText) {
		const newTodo = { text: todoText };
		todos.push(newTodo);
		renderTodos();
		saveTodos();
		todoInput.value = '';
	}
});

// Function to render the list of todos
function renderTodos() {
	const todoList = document.getElementById('todo-list');
	todoList.innerHTML = '';
	todos.forEach((todo, index) => {
		const li = document.createElement('li');
		const textSpan = document.createElement('span');
		const todoInput = document.createElement('input');
		todoInput.type = 'text';
		todoInput.value = todo.text;
		todoInput.style.display = 'none';
		textSpan.textContent = todo.text;
		textSpan.addEventListener('click', () => {
			textSpan.style.display = 'none';
			todoInput.style.display = 'inline-block';
			todoInput.focus();
		});
		todoInput.addEventListener('blur', () => {
			if (todoInput.value.trim()) {
				todo.text = todoInput.value.trim();
				renderTodos();
				saveTodos();
			}
	
		});
		todoInput.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				if (todoInput.value.trim()) {
					todo.text = todoInput.value.trim();
					renderTodos();
					saveTodos();
				}
			}
		});
		const deleteBtn = document.createElement('button');
		deleteBtn.innerHTML = '&times;';
		deleteBtn.addEventListener('click', () => {
			todos.splice(index, 1);
			renderTodos();
			saveTodos();
		});
		li.appendChild(textSpan);
		li.appendChild(todoInput);
		li.appendChild(deleteBtn);
		todoList.appendChild(li);
	});
}

// Function to save the todos to local storage
function saveTodos() {
	localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the initial list of todos
renderTodos();
