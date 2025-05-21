
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import Footer from "@/components/Footer";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    city: "",
    message: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.medhrplus.com/api/v1/admin/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          number: "",
          city: "",
          message: ""
        });
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <div className="bg-[#F5F6FA] flex flex-col justify-center items-center h-[175px] md:h-[283px] lg:h-[310px]">
        <div className="flex justify-center items-center gap-[17px] mt-[20px] h-[40px] w-[184px] md:h-[71px] md:w-[313px] lg:h-[81px] lg:w-[353px]">
          <div className=" highlight ">
            <p className="text-white font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              Contact
            </p>
          </div>
          <div>
            <p className="text-black font-bold text-center text-[32px] md:text-[56px] lg:text-[64px] font-plus-jakarta-sans">
              us
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 2xl:px-0 flex justify-center">
        <form className="bg-white p-8 w-[841px] gap-[24px]" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="name"
                className="block text-[16px] font-medium leading-[24px] text-[#4A4A5A] font-poppins"
              >
                Name
                <span className="text-primary-500"> *</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="email"
                className="block text-[16px] font-medium leading-[24px] text-[#4A4A5A] font-poppins"
              >
                Email
                <span className="text-primary-500"> *</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex-1 mb-4 md:mb-0">
              <label
                htmlFor="number"
                className="block text-[16px] font-medium leading-[24px] text-[#4A4A5A] font-poppins"
              >
                Mobile Number
                <span className="text-primary-500"> *</span>
              </label>
              <input
                type="tel"
                name="number"
                id="number"
                value={formData.number}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex-1">
              <label
                htmlFor="city"
                className="block text-[16px] font-medium leading-[24px] text-[#4A4A5A] font-poppins"
              >
                City
                <span className="text-primary-500"> *</span>
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-[16px] font-medium leading-[24px] text-[#4A4A5A] font-poppins"
            >
              Your Message
              <span className="text-primary-500"> *</span>
            </label>
            <textarea
              name="message"
              id="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            ></textarea>
          </div>
          <div className="flex justify-start">
            <button
              type="submit"
              className="w-[146px] h-[46px] px-[24px] py-[12px] gap-[6px] bg-gradient-to-b from-[#F9533A] to-[#C22A13] font-plus-jakarta-sans text-white  rounded-[8px] shadow-[0px_8px_24px_-10px_rgba(249,83,58,0.5)] opacity-[1]"
            >
              Submit Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
