const request = require('supertest');
const app = require('../server'); // Assuming server.js exports the Express app
const Employee = require('../models/employee'); // Sequelize model
const SequelizeMock = require('sequelize-mock');

// Mock database connection
const DBConnectionMock = new SequelizeMock();
const MockEmployee = DBConnectionMock.define('Employee', {
  id: 1,
  name: 'John Doe',
  email: 'john.doe@example.com',
  department: 'Engineering',
  role: 'Developer',
  hireDate: '2023-01-01',
  salary: 60000,
});

// Unit tests

describe('Employee API Endpoints', () => {
  beforeAll(() => {
    // Mock the Employee model
    jest.spyOn(Employee, 'findAll').mockImplementation(() => MockEmployee.findAll());
    jest.spyOn(Employee, 'create').mockImplementation((data) => MockEmployee.create(data));
    jest.spyOn(Employee, 'findByPk').mockImplementation((id) => MockEmployee.findByPk(id));
    jest.spyOn(Employee, 'update').mockImplementation((data, options) => MockEmployee.update(data, options));
    jest.spyOn(Employee, 'destroy').mockImplementation((options) => MockEmployee.destroy(options));
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('GET /api/employees should return all employees', async () => {
    const res = await request(app).get('/api/employees');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  test('POST /api/employees should create a new employee', async () => {
    const newEmployee = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      department: 'HR',
      role: 'Manager',
      hireDate: '2023-02-01',
      salary: 70000,
    };
    const res = await request(app).post('/api/employees').send(newEmployee);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
  });

  test('PUT /api/employees/:id should update an employee', async () => {
    const updatedEmployee = {
      name: 'John Smith',
    };
    const res = await request(app).put('/api/employees/1').send(updatedEmployee);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', 'John Smith');
  });

  test('DELETE /api/employees/:id should delete an employee', async () => {
    const res = await request(app).delete('/api/employees/1');
    expect(res.statusCode).toEqual(200);
  });
});