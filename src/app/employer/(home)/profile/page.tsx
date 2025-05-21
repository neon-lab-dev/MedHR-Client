"use client";
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Oval } from "react-loader-spinner";
import Image from "next/image";
import Button from "@/components/Button";
import { ICONS } from "@/assets";
import { fetchEmployerData, updateEmployerData } from "@/api/employer";

interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

interface soicalLink {
  linkedin?: string;
  github?: string;
}

interface CompanyDetail {
  _id: string;
  companyName: string;
  industryType: string;
  companyLocation: string;
  contactEmail: string;
  contactPhone: string;
  websiteLink: string;
  bio: string;
  soicalLink?: soicalLink;
}

export interface User {
  _id: string;
  full_name: string;
  email: string;
  mobilenumber: string;
  verified: boolean;
  createdAt: string;
  company_avatar?: { url: string };
  company_name?: string;
  address?: Address[];
  companyDetails?: CompanyDetail[];
}

const Dashboard = () => {
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: ["employer-data"],
    queryFn: fetchEmployerData,
  });

  const updateUserMutation = useMutation({
    mutationFn: updateEmployerData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employer-data"] });
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleUpdateUser();
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string, index?: number) => {
    const { name, value } = e.target;
    if (user) {
      if (field === "address" && index !== undefined) {
        const updatedAddress = [...(user.address || [])];
        updatedAddress[index] = { ...updatedAddress[index], [name]: value };
        setUser({ ...user, address: updatedAddress });
      } else if (field === "companyDetails" && index !== undefined) {
        const updatedCompanyDetails = [...(user.companyDetails || [])];
        updatedCompanyDetails[index] = { ...updatedCompanyDetails[index], [name]: value };
        setUser({ ...user, companyDetails: updatedCompanyDetails });
      } else if (field === "soicalLink" && index !== undefined) {
        const updatedCompanyDetails = [...(user.companyDetails || [])];
        updatedCompanyDetails[index] = {
          ...updatedCompanyDetails[index],
          soicalLink: {
            ...updatedCompanyDetails[index].soicalLink,
            [name]: value,
          },
        };
        setUser({ ...user, companyDetails: updatedCompanyDetails });
      } else {
        setUser({
          ...user,
          [name]: value,
        });
      }
    }
  };

  const handleUpdateUser = () => {
    if (user) {
      updateUserMutation.mutate(user);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Oval
          height={40}
          width={40}
          color="#F9533A"
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f4f4f4"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error fetching data: {error.message}</div>;
  }

  if (!user) {
    return <div className="text-center">No data available</div>;
  }

  // Destructuring and default value
  const { companyDetails = [] } = user;
  const companyName = companyDetails[0]?.companyName || 'N/A';

  return (
    <div className="bg-gray-100 p-8 min-h-screen">
      {/* Profile Section */}
      <div className="bg-white shadow-lg rounded-lg p-8 mb-6">
        <div className="flex justify-between items-center gap-6">
          <div className="flex gap-8 items-center">
            <div className="relative w-24 h-24">
              <Image
                src={user.company_avatar?.url || ICONS.hourGlass}
                alt="Company Avatar"
                layout="fill"
                objectFit="cover"
                className="rounded-full border-4 border-gray-300"
              />
            </div>
            <div>
              <h1 className="text-4xl font-semibold text-gray-800">{user.full_name || 'N/A'}</h1>
              <p className="text-2xl text-gray-600">{companyName}</p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={handleEditToggle} className="mt-4">
              <span className="text-2xl">{isEditing ? "Save" : "Edit"}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Information Section */}
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-6">Employer Profile</h2>

        {/* Flex container for section details */}
        <div className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <strong className="text-gray-600 text-lg">Full Name:</strong>
                <span className="block mt-1 text-lg">{user.full_name || 'Not Available'}</span>
              </div>
              <div>
                <strong className="text-gray-600 text-lg">Email:</strong>
                <span className="block mt-1 text-lg">{user.email || 'Not Available'}</span>
              </div>
              <div>
                <strong className="text-gray-600 text-lg">Mobile Number:</strong>
                <span className="block mt-1 text-lg">{user.mobilenumber || 'Not Available'}</span>
              </div>
              <div>
                <strong className="text-gray-600 text-lg">Verified:</strong> {user.verified ? "Yes" : "No"}
              </div>
              <div>
                <strong className="text-gray-600 text-lg">Created At:</strong> {new Date(user.createdAt).toLocaleDateString() || 'Not Available'}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">Address</h3>
            {(user.address && user.address.length > 0) ? (
              user.address.map((addr, index) => (
                <div key={addr._id} className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-gray-200 pb-4 mb-4">
                  <div>
                    <strong className="text-gray-600 text-lg">Street:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="street"
                        value={addr.street || ''}
                        onChange={(e) => handleChange(e, "address", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{addr.street || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">City:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="city"
                        value={addr.city || ''}
                        onChange={(e) => handleChange(e, "address", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{addr.city || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">State:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="state"
                        value={addr.state || ''}
                        onChange={(e) => handleChange(e, "address", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{addr.state || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Postal Code:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="postalCode"
                        value={addr.postalCode || ''}
                        onChange={(e) => handleChange(e, "address", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{addr.postalCode || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Country:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="country"
                        value={addr.country || ''}
                        onChange={(e) => handleChange(e, "address", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{addr.country || 'Not Available'}</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-600">No address information available.</p>
            )}
          </div>

          {/* Company Details */}
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h3 className="text-3xl font-semibold text-gray-700 mb-4">Company Details</h3>
            {companyDetails.length > 0 ? (
              companyDetails.map((company, index) => (
                <div key={company._id} className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-200 pb-4 mb-4">
                  <div>
                    <strong className="text-gray-600 text-lg">Company Name:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="companyName"
                        value={company.companyName || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.companyName || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Industry Type:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="industryType"
                        value={company.industryType || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.industryType || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Company Location:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="companyLocation"
                        value={company.companyLocation || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.companyLocation || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Contact Email:</strong>
                    {isEditing ? (
                      <input
                        type="email"
                        name="contactEmail"
                        value={company.contactEmail || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.contactEmail || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Contact Phone:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="contactPhone"
                        value={company.contactPhone || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.contactPhone || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Company Website:</strong>
                    {isEditing ? (
                      <input
                        type="text"
                        name="websiteLink"
                        value={company.websiteLink || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                      />
                    ) : (
                      <a href={company.websiteLink} target="_blank" className="block mt-1 text-lg hover:underline">{company.websiteLink || 'Not Available'}</a>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Bio:</strong>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={company.bio || ''}
                        onChange={(e) => handleChange(e, "companyDetails", index)}
                        className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg h-24"
                      />
                    ) : (
                      <span className="block mt-1 text-lg">{company.bio || 'Not Available'}</span>
                    )}
                  </div>
                  <div>
                    <strong className="text-gray-600 text-lg">Social Links:</strong>
                    {company.soicalLink ? (
                      <>
                        <div>
                          <strong className="text-gray-600 text-lg">LinkedIn:</strong>
                          {isEditing ? (
                            <input
                              type="text"
                              name="linkedin"
                              value={company.soicalLink.linkedin || ''}
                              onChange={(e) => handleChange(e, "soicalLink", index)}
                              className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                            />
                          ) : (
                            <a href={company.soicalLink.linkedin} target="_blank" className="block mt-1 text-lg hover:underline">{company.soicalLink.linkedin || 'Not Available'}</a>
                          )}
                        </div>
                        <div>
                          <strong className="text-gray-600 text-lg">GitHub:</strong>
                          {isEditing ? (
                            <input
                              type="text"
                              name="github"
                              value={company.soicalLink.github || ''}
                              onChange={(e) => handleChange(e, "soicalLink", index)}
                              className="border border-gray-300 rounded-lg px-2 py-1 w-full mt-1 text-lg"
                            />
                          ) : (
                            <a href={company.soicalLink.github} target="_blank" className="block mt-1 text-lg hover:underline">{company.soicalLink.github || 'Not Available'}</a>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="text-lg text-gray-600">No social links available.</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-lg text-gray-600">No company details available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
