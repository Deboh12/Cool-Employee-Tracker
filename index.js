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
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the MySQL server.');

    // Main menu logic using inquirer
    // Example of menu item handling
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View All Departments',
          // ... other choices
          'Exit'
        ]
      }
    ]);

    switch (action) {
      case 'View All Departments':
        // Function to view all departments
        break;
      // ... handle other cases
      case 'Exit':
        console.log('Exiting application.');
        connection.end();
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

mainMenu();