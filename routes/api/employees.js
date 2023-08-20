const express = require("express");
const router = express.Router();
const path = require("path");
const data = {};
data.employees = require("../../model/employees.json");

const employeesController = require("../../controllers/employeeController");

router
  .route("/")
  .get(employeesController.getAllEmployees)
  .post(employeesController.createEmployee)
  .put(employeesController.updateEmployee)
  .delete(employeesController.deleteEmployee);

router.route("/:id").get(employeesController.getEmployee);

module.exports = router;
