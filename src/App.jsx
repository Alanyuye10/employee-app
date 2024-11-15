import './App.css'
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import EditEmployee from "./assets/component/EditEmployee";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");

  const API_URL = "https://employee-server-4qhq.onrender.com"; // Use the deployed server URL

  // Fetch employees when the component mounts
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from the API
  const fetchEmployees = async () => {
    const response = await axios.get(`${API_URL}/employees`);
    setEmployees(response.data);
  };

  // Add a new employee
  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmployee = { name, email, status };
    await axios.post(`${API_URL}/employees`, newEmployee);
    setName("");
    setEmail("");
    setStatus("active");
    fetchEmployees(); // Refresh the employee list after adding
  };

  // Delete an employee
  const handleDeleteEmployee = async (id) => {
    await axios.delete(`${API_URL}/employees/${id}`);
    fetchEmployees(); // Refresh the employee list after deletion
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Employee Management</h1>

        <div className="mb-6">
          <form onSubmit={handleAddEmployee} className="flex space-x-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="p-2 border border-gray-300"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border border-gray-300"
              required
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border border-gray-300"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="bg-gray-300 text-black p-2"
            >
              Add Employee
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td className="border p-2">{employee.id}</td>
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.status}</td>
                  <td className="border p-2">
                    <Link to={`/edit/${employee.id}`} className="text-blue-500 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDeleteEmployee(employee.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Routes>
          <Route
            path="/edit/:id"
            element={<EditEmployee fetchEmployees={fetchEmployees} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
