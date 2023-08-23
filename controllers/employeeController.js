const Employee = require("../model/Employee");

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  if (!employees)
    return res.status(204).json({ message: "No employee found!" });
  res.json(employees);
};

const createEmployee = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName)
    return res
      .status(400)
      .json({ message: "First and Last name are required!" });

  try {
    const result = await Employee.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Employee ID is required~~" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.json({ message: `Employee ID ${req.body.id} not found!` });
  }
  if (req.body?.firstName) employee.firstName = req.body.firstName;
  if (req.body?.lastName) employee.lastName = req.body.lastName;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Employee ID is required~~" });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.json({ message: `Employee ID ${req.body.id} not found!!` });
  }
  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Params ID is required~~" });
  }
  const employee = Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res.json({ message: `Employee ID ${req.params.id} not found!!` });
  }

  res.json(employee);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  updateEmployee,
  createEmployee,
  deleteEmployee,
};
