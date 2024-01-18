-- Insert sample departments
INSERT INTO department (name) VALUES ('Engineering'), ('Finance'), ('Sales');

-- Insert sample roles (Ensure department IDs match with the ones created above)
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 75000.00, 1), ('Accountant', 65000.00, 2), ('Sales Representative', 55000.00, 3);

-- Insert sample employees (Ensure role IDs and manager IDs are correct)
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Alice', 'Smith', 1, NULL), ('Bob', 'Jones', 2, 1), ('Carol', 'Johnson', 3, 1);