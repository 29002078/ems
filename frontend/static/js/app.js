const API_URL = 'http://localhost:5000/api/employees';

document.addEventListener('DOMContentLoaded', () => {
  const employeeList = document.getElementById('employees');
  const employeeForm = document.getElementById('employeeForm');
  const employeeIdInput = document.getElementById('employeeId');
  const employeeNameInput = document.getElementById('employeeName');
  const employeeRoleInput = document.getElementById('employeeRole');

  // Fetch and display employees
  const fetchEmployees = async () => {
    const response = await fetch(API_URL);
    const employees = await response.json();
    employeeList.innerHTML = '';
    employees.forEach(employee => {
      const li = document.createElement('li');
      li.textContent = `${employee.name} - ${employee.role}`;
      li.dataset.id = employee.id;

      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.onclick = () => loadEmployee(employee);

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = () => deleteEmployee(employee.id);

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      employeeList.appendChild(li);
    });
  };

  // Load employee data into the form
  const loadEmployee = (employee) => {
    employeeIdInput.value = employee.id;
    employeeNameInput.value = employee.name;
    employeeRoleInput.value = employee.role;
  };

  // Create or update an employee
  employeeForm.onsubmit = async (e) => {
    e.preventDefault();
    const id = employeeIdInput.value;
    const name = employeeNameInput.value;
    const role = employeeRoleInput.value;

    if (!name || !role) {
      alert('Name and role are required!');
      return;
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `${API_URL}/${id}` : API_URL;

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role })
    });

    employeeForm.reset();
    fetchEmployees();
  };

  // Delete an employee
  const deleteEmployee = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchEmployees();
  };

  // Initial fetch
  fetchEmployees();
});