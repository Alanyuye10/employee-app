import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditEmployee({ fetchEmployees }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({ name: "", email: "", status: "" });

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await axios.get(`http://localhost:3000/employees/${id}`);
      setEmployee(response.data);
    };
    fetchEmployee();
  }, [id]);

  const handleSave = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3000/employees/${id}`, employee);
    fetchEmployees();  // Trigger refresh of the employee list
    navigate("/");  // Navigate back to the home page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Employee</h2>

      <form onSubmit={handleSave} className="space-y-4">
        <input
          type="text"
          value={employee.name}
          onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
          placeholder="Name"
          className="p-2 border border-gray-300"
          required
        />
        <input
          type="email"
          value={employee.email}
          onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
          placeholder="Email"
          className="p-2 border border-gray-300"
          required
        />
        <select
          value={employee.status}
          onChange={(e) => setEmployee({ ...employee, status: e.target.value })}
          className="p-2 border border-gray-300"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button type="submit" className="bg-blue-500 text-white p-2">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditEmployee;
