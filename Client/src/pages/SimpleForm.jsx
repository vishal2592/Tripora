
import React, { useState } from "react";

const SimpleForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() =>{
    const savedData = localStorage.getItem("userFormData");
    if(savedData){
        setFormData(JSON.parse(savedData));
    };
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("userFormData", JSON.stringify(formData));

    alert("data saved successfully");

    console.log("Form Data:", formData);
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        User Form
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        {/* Name */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Mobile
          </label>

          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;

