const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get a single employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

// Create a new employee
router.post('/', async (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) {
    return res.status(400).json({ error: 'Name and role are required' });
  }
  console.error('Request Body:', req.body);
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create employee' });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Employee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedEmployee = await Employee.findByPk(req.params.id);
      res.json(updatedEmployee);
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Employee.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Employee deleted' });
    } else {
      res.status(404).json({ error: 'Employee not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete employee' });
  }
});

module.exports = router;