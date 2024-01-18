const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');

// Database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'company_db' 
};

async function mainMenu() {
  const connection = await mysql.createConnection(dbConfig);
  console.log('Connected to the MySQL server.');

  let exit = false;
  while (!exit) {
    const { action } = await inquirer.prompt({
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add a Department',
        'Add a Role',
        'Add an Employee',
        'Update an Employee Role',
        'Exit'
      ]
    });

    switch (action) {
      case 'View All Departments':
        await viewAllDepartments(connection);
        break;
      case 'View All Roles':
        await viewAllRoles(connection);
        break;
      case 'View All Employees':
        await viewAllEmployees(connection);
        break;
      case 'Add a Department':
        await addDepartment(connection);
        break;
      case 'Add a Role':
        await addRole(connection);
        break;
      case 'Add an Employee':
        await addEmployee(connection);
        break;
      case 'Update an Employee Role':
        await updateEmployeeRole(connection);
        break;
      case 'Exit':
        console.log('Exiting application.');
        exit = true;
        break;
    }
  }

  connection.end();
}

async function viewAllDepartments(connection) {
  const query = 'SELECT * FROM department';
  const [departments] = await connection.query(query);
  console.table(departments);
}

async function viewAllRoles(connection) {
  // ... Implement viewAllRoles function
}

async function viewAllEmployees(connection) {
  // ... Implement viewAllEmployees function
}

async function addDepartment(connection) {
  // ... Implement addDepartment function
}

async function addRole(connection) {
  // ... Implement addRole function
}

async function addEmployee(connection) {
  // ... Implement addEmployee function
}

async function updateEmployeeRole(connection) {
  // ... Implement updateEmployeeRole function
}

mainMenu();