//to-do//

// Selectors
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// Event Listeners
todoForm.addEventListener('submit', addTodo);
todoList.addEventListener('click', deleteCheck);

// Functions
function addTodo(event) {
  // Prevent form from submitting
    event.preventDefault();

  // Create todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

  // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

  // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);

  // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

  // Append to list
    todoList.appendChild(todoDiv);

  // Clear todo input value
    todoInput.value = '';
}

function deleteCheck(event) {
    const item = event.target;

  // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function() {
            todo.remove();
    });
}

  // Check mark
        if (item.classList[0] === 'complete-btn') {
            const todo = item.parentElement;
            todo.classList.toggle('completed');
    }
}


//calculator//


const display = document.getElementById('result');
let operand1 = null;
let operand2 = null;
let operator = null;
let result = null;
let decimal = false;

function clear() {
	operand1 = null;
	operand2 = null;
	operator = null;
	result = null;
	decimal = false;
	display.innerHTML = '0';
}

function calculate() {
	switch (operator) {
		case '+':
			result = operand1 + operand2;
			break;
		case '-':
			result = operand1 - operand2;
			break;
		case '*':
			result = operand1 * operand2;
			break;
		case '/':
			result = operand1 / operand2;
			break;
		default:
			result = null;
	}
	display.innerHTML = result;
}

function handleOperator(op) {
	if (operand1 === null) {
		operand1 = parseFloat(display.innerHTML);
		operator = op;
		display.innerHTML = '0';
		decimal = false;
	} else if (operator !== null && operand2 === null) {
		operator = op;
	} else if (operator !== null && operand2 !== null) {
		operand2 = parseFloat(display.innerHTML);
		calculate();
		operand1 = result;
		operand2 = null;
		operator = op;
		decimal = false;
	}
}

function handleDecimal() {
	if (!decimal) {
		decimal = true;
		display.innerHTML += '.';
	}
}

function handleNumber(num) {
	if (display.innerHTML === '0' || operator !== null) {
		display.innerHTML = num;
		operator = null;
	} else {
		display.innerHTML += num;
	}
}

function handleClick(e) {
	const element = e.target;
	if (element.matches('.number')) {
		handleNumber(element.innerHTML);
	} else if (element.matches('.operator')) {
		handleOperator(element.innerHTML);
	} else if (element.matches('#decimal')) {
		handleDecimal();
	} else if (element.matches('#clear')) {
		clear();
	} else if (element.matches('#equals')) {
		if (operator !== null && operand2 === null) {
			operand2 = parseFloat(display.innerHTML);
			calculate();
			operand1 = result;
			operand2 = null;
			operator = null;
			decimal = false;
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('button');
	buttons.forEach((button) => {
		button.addEventListener('click', handleClick);
	});
});


// calendar //


// Get the calendar table element
const calendarTable = document.querySelector('#calendar-table');

// Define the current date
const currentDate = new Date();

// Define the year and month of the calendar
let calendarYear = currentDate.getFullYear();
let calendarMonth = currentDate.getMonth();

// Function to generate the calendar
function generateCalendar() {
  // Get the number of days in the current month
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  // Get the first day of the current month
  const firstDayOfMonth = new Date(calendarYear, calendarMonth, 1).getDay();

  // Create a document fragment to hold the table elements
  const tableFragment = document.createDocumentFragment();

  // Set the calendar month and year in the table header
  const tableHeader = document.createElement('thead');
  const tableHeaderRow = document.createElement('tr');
  const tableHeaderCell = document.createElement('th');
  tableHeaderCell.colSpan = '7';
  tableHeaderCell.innerText = `${new Date(calendarYear, calendarMonth, 1).toLocaleString('default', { month: 'long' })} ${calendarYear}`;
  tableHeaderRow.appendChild(tableHeaderCell);
  tableHeader.appendChild(tableHeaderRow);
  tableFragment.appendChild(tableHeader);

  // Create the table rows for the calendar days
  const tableBody = document.createElement('tbody');
  let dayOfMonth = 1;
  for (let i = 0; i < 6; i++) {
    const tableRow = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDayOfMonth) || dayOfMonth > daysInMonth) {
        // Create an empty cell for days outside the current month
        const tableCell = document.createElement('td');
        tableCell.innerText = '';
        tableRow.appendChild(tableCell);
      } else {
        // Create a cell with the day of the month
        const tableCell = document.createElement('td');
        tableCell.innerText = dayOfMonth;
        tableRow.appendChild(tableCell);
        dayOfMonth++;
      }
    }
    tableBody.appendChild(tableRow);
  }
  tableFragment.appendChild(tableBody);

  // Remove the existing calendar table and append the new one
  calendarTable.innerHTML = '';
  calendarTable.appendChild(tableFragment);
}

// Call the generateCalendar function to display the calendar for the current month
generateCalendar();