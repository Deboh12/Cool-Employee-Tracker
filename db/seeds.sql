INSERT INTO department (name) 
VALUES 
    ('Engineering'), 
    ('Finance'), 
    ('Sales'),
    ('Human Resources'), 
    ('Marketing'), 
    ('Product Development'),
    ('Customer Support'),
    ('Research and Development');

INSERT INTO role (title, salary, department_id) 
VALUES 
    ('Engineer', 75000.00, 1), 
    ('Accountant', 65000.00, 2), 
    ('Sales Representative', 55000.00, 3),
    ('HR Manager', 80000.00, 4),
    ('Marketing Specialist', 70000.00, 5),  
    ('Product Manager', 85000.00, 6),  
    ('Support Engineer', 65000.00, 7); 



INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ('Alice', 'Smith', 1, NULL), 
    ('Bob', 'Jones', 2, 1), 
    ('Carol', 'Johnson', 3, 1),
    ('Emily', 'Clark', 4, NULL), 
    ('Michael', 'Brown', 5, 1),  
    ('Sarah', 'Davis', 6, 1), 
    ('James', 'Wilson', 7, 3);
