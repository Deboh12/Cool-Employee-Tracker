const mysql = require('mysql2');
const inquirer = require('inquirer');

// create a connection to the mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'company_db'
});

// Function to start the application and display the main menu
function startApp() {
    inquirer.prompt({
        type: 'list',
        name: 'option',
        message: 'Select an action:',
        choices: [
            'List All Employees',
            'Add New Employee',
            'Update Employee Role',
            'List All Roles',
            'Create New Role',
            'List All Departments',
            'Create New Department',
            'Exit'
        ]
    })
    .then(answer => {
        // Handle the user's choice
        switch (answer.option) {
            case 'List All Employees':
                listAllEmployees();
                break;
            case 'Add New Employee':
                addNewEmployee();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'List All Roles':
                listAllRoles();
                break;
            case 'Create New Role':
                createNewRole();
                break;
            case 'List All Departments':
                listAllDepartments();
                break;
            case 'Create New Department':
                createNewDepartment();
                break;
            case 'Exit':
                db.end();
                return;
        }
    });
}

// Function to list all employees
function listAllEmployees() {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
                   FROM employee 
                   LEFT JOIN role ON employee.role_id = role.id
                   LEFT JOIN department ON role.department_id = department.id
                   LEFT JOIN employee manager ON employee.manager_id = manager.id`;
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function listAllRoles() {
    const query = `SELECT role.id, role.title, department.name AS department, role.salary
                   FROM role
                   INNER JOIN department ON role.department_id = department.id`;
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

function listAllDepartments() {
    const query = 'SELECT * FROM department';
    db.query(query, (err, results) => {
        if (err) throw err;
        console.table(results);
        startApp();
    });
}

// Function to add a new employee
function addNewEmployee() {
    // Retrieve roles for selection
    db.promise().query('SELECT id, title FROM role')
      .then(([roles]) => {
        return Promise.all([
          roles,
          db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee')
        ]);
      })
      .then(([roles, [managers]]) => {
        // Adding 'None' option for manager
        managers.push({ id: null, name: 'None' });
  
        return inquirer.prompt([
          {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name:",
          },
          {
            type: 'list',
            name: 'roleId',
            message: "Select the employee's role:",
            choices: roles.map(role => ({ name: role.title, value: role.id }))
          },
          {
            type: 'list',
            name: 'managerId',
            message: "Select the employee's manager:",
            choices: managers.map(manager => ({ name: manager.name, value: manager.id }))
          }
        ]);
      })
      .then(answer => {
        const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
        db.query(query, [answer.firstName, answer.lastName, answer.roleId, answer.managerId || null], (err) => {
          if (err) throw err;
          console.log('Employee added successfully.');
          startApp();
        });
      });
  }
  

  // function to create a new role
  function createNewRole() {
    db.query('SELECT id, name FROM department', (err, departments) => {
      if (err) throw err;
      inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the new role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary of the new role:',
        },
        {
          type: 'list',
          name: 'departmentId',
          message: 'Which department does the role belong to?',
          choices: departments.map(dept => ({ name: dept.name, value: dept.id }))
        }
      ])
      .then(answer => {
        const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
        db.query(query, [answer.title, parseFloat(answer.salary), answer.departmentId], (err) => {
          if (err) throw err;
          console.log('Role added successfully.');
          startApp();
        });
      });
    });
  }
  
  // Function to create a new department
  function createNewDepartment() {
    inquirer.prompt({
      type: 'input',
      name: 'name',
      message: 'Enter the name of the new department:',
    })
    .then(answer => {
      const query = 'INSERT INTO department (name) VALUES (?)';
      db.query(query, answer.name, (err) => {
        if (err) throw err;
        console.log('Department added successfully.');
        startApp();
      });
    });
  }
  
  // Function to update an employee's role
  function updateEmployeeRole() {
    // Retrieve employees and roles for selection
    db.promise().query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employee')
      .then(([employees]) => {
        return Promise.all([
          employees,
          db.promise().query('SELECT id, title FROM role')
        ]);
      })
      .then(([employees, [roles]]) => {
        return inquirer.prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Which employee\'s role do you want to update?',
            choices: employees.map(emp => ({ name: emp.name, value: emp.id }))
          },
          {
            type: 'list',
            name: 'roleId',
            message: 'Which role do you want to assign to the selected employee?',
            choices: roles.map(role => ({ name: role.title, value: role.id }))
          }
        ]);
      })
      .then(answer => {
        const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
        db.query(query, [answer.roleId, answer.employeeId], (err) => {
          if (err) throw err;
          console.log('Employee role updated successfully.');
          startApp();
        });
      });
  }

  // connect to the databse adn start the application
db.connect(err => {
    if (err) throw err;
    console.log('Connected to the company_db database.');
    startApp();
});