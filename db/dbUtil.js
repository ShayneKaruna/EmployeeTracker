const mysql = require("mysql2"); 
const util = require("util"); 

const connection = mysql.createConnection({
    port: 3306,
    host     : 'localhost',
    user     : 'root',
    password : 'Shayne_K23',
    database : 'employees',
  });
   
  connection.connect();

  connection.query = util.promisify(connection.query); 

class databaseQueryUtil {
  constructor(connection) {
    this.connection = connection;
  }
  //Employee (get, add, update)
  getAllEmployees() {
    return this.connection.query("SELECT * FROM employee");
  }
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }

  updateEmployee() {
    return this.connection.query("UPDATE employee SET role_id = role_id WHERE first_name = name");
  }

  //Role. (get, add)
  viewAllRoles() {
    return this.connection.query("SELECT id, title, salary, department_id AS role FROM role");
  }

  addRole(newRole) {
    return this.connection.query("INSERT INTO role SET ?", newRole);
  }

  //Department (get, add)
  viewAllDepartments() {
    return this.connection.query("SELECT * FROM department");
  }

  createDepartment(department) {
    return this.connection.query("INSERT INTO department SET ?", department);
  }

  updateEmployeeRole(employeeId, newRoleId) {
    console.log("inside query");
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [newRoleId, employeeId]);
  }

  removeEmployee(id) {
    return this.connection.query("DELETE FROM employee WHERE id = ?", id);
  }
  removeRole(id) {
    return this.connection.query("DELETE FROM role WHERE id = ?", id);
  }
  removeDepartment(id) {
    return this.connection.query("DELETE FROM department WHERE id = ?", id);
  }
}

module.exports = new databaseQueryUtil(connection);
