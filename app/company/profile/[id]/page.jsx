"use client";

import React, { useState } from "react";

const CompanyProfile = () => {
  const [description] = useState(
    "We are a leading vocational training company committed to empowering individuals with practical skills."
  );
  const [contactInfo, setContactInfo] = useState({
    email: "contact@company.com",
    phone: "+123 456 7890",
    address: "123 Training St, Skill City",
  });
  const [milestones, setMilestones] = useState(["Trained 500+ employees", "Partnered with 10+ companies"]);
  const [socialLinks, setSocialLinks] = useState(["https://linkedin.com/company", "https://twitter.com/company"]);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "milestone", "socialLink", or "contact"
  const [formData, setFormData] = useState("");

  // Open dialog
  const openDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
    setFormData("");
  };

  // Handle form submission
  const handleSubmit = () => {
    if (dialogType === "milestone") {
      setMilestones([...milestones, formData]);
    } else if (dialogType === "socialLink") {
      setSocialLinks([...socialLinks, formData]);
    } else if (dialogType === "contact") {
      setContactInfo({ ...contactInfo, ...formData });
    }
    setDialogOpen(false);
  };

  // Delete handlers
  const deleteMilestone = (index) => setMilestones(milestones.filter((_, i) => i !== index));
  const deleteSocialLink = (index) => setSocialLinks(socialLinks.filter((_, i) => i !== index));

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Card 1: Cover and Profile Picture */}
        <div className="rounded-lg shadow-md p-6 bg-white flex items-center space-x-6">
          <img
            src="/cover-pic.jpg"
            alt="Cover"
            className="w-32 h-32 object-cover rounded-full border-4 border-gray-200"
          />
          <div>
            <h1 className="text-2xl font-bold">Company Name</h1>
            <p className="text-gray-600">Empowering Skills, Shaping Careers</p>
          </div>
        </div>

        {/* Card 2: Description and Contact Info */}
        <div className="rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">About the Company</h2>
          <p className="text-gray-700 mb-4">{description}</p>
          <h3 className="text-lg font-semibold">Contact Information</h3>
          <ul className="text-gray-700">
            <li>Email: {contactInfo.email}</li>
            <li>Phone: {contactInfo.phone}</li>
            <li>Address: {contactInfo.address}</li>
          </ul>
          <button
            onClick={() => openDialog("contact")}
            className="mt-4 px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Edit Contact Info
          </button>
        </div>

        {/* Card 3: Milestones */}
        <div className="rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Milestones & Achievements</h2>
          <ul className="text-gray-700 mb-4">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{milestone}</span>
                <button
                  onClick={() => deleteMilestone(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => openDialog("milestone")}
            className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Add Milestone
          </button>
        </div>

        {/* Card 4: Social Links */}
        <div className="rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-xl font-semibold mb-4">Social Links</h2>
          <ul className="text-gray-700 mb-4">
            {socialLinks.map((link, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {link}
                </a>
                <button
                  onClick={() => deleteSocialLink(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={() => openDialog("socialLink")}
            className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
          >
            Add Social Link
          </button>
        </div>
      </div>

      {/* Dialog Box */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {dialogType === "milestone"
                ? "Add Milestone"
                : dialogType === "socialLink"
                ? "Add Social Link"
                : "Edit Contact Info"}
            </h2>
            {dialogType === "contact" ? (
              <>
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full mb-2 p-2 border rounded"
                  value={formData.email || contactInfo.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="w-full mb-2 p-2 border rounded"
                  value={formData.phone || contactInfo.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full mb-2 p-2 border rounded"
                  value={formData.address || contactInfo.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              </>
            ) : (
              <input
                type="text"
                placeholder={
                  dialogType === "milestone" ? "New Milestone" : "New Social Link"
                }
                className="w-full mb-4 p-2 border rounded"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
              />
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 text-gray-700 rounded-md bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
