import React from "react";
import { useState } from "react";
import { createEmployeeAPI } from "../services";

const FormCreateEmployee = ({setIsShowForm, fetchData}) => {
     const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        address: "",
      });

      const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

   const handleCreateEmployee = async () => {
      const { name, email, role, phone, address } = form;
      const res = await createEmployeeAPI(name, email, role, phone, address);
      if (res.success) {
        setIsShowForm(false);
        setForm({ name: "", email: "", phone: "", role: "", address: "" });
        await fetchData();
      }
    };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex justify-center items-center"
      onClick={() => setIsShowForm(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-[40vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Create Employee</h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
          <div>
            <label htmlFor="name">Employee Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="p-2 border border-slate-200 rounded w-full mt-2"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="text"
              name="phone"
              id="phone"
              className="p-2 border border-slate-200 rounded w-full mt-2"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              name="email"
              id="email"
              className="p-2 border border-slate-200 rounded w-full mt-2"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="role">Role</label>
            <input
              type="text"
              name="role"
              id="role"
              className="p-2 border border-slate-200 rounded w-full mt-2"
              value={form.role}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              className="p-2 border border-slate-200 rounded w-full mt-2"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-end mt-6 w-full">
          <button
            onClick={handleCreateEmployee}
            className="bg-[#2C7BE5] text-white px-4 py-1 rounded hover:bg-[#1a5bbf] hover:cursor-pointer"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCreateEmployee;
