import React, { useState, useEffect } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserData } from '@/api/employee'; // Function to fetch user data
import axiosInstance from '@/api/axiosInstance';

const updateUserProfile = async (userData: any) => {
  const response = await axiosInstance.put('/user/details', userData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      // Add Authorization or other headers if necessary
    }
  });
  return response.data;
};

const ResumeEducationModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    institutionName: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: ''
  });

  const [existingData, setExistingData] = useState<any>({
    education: [] // Default value to prevent errors
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error updating profile:', error);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setExistingData(userData.user || { education: [] }); // Safeguard against missing user data
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Array.isArray(existingData.education)) { // Check if education is an array
      const updatedData = {
        ...existingData,
        education: [...existingData.education, formData] // Append new education data
      };
      mutation.mutate(updatedData, {
        onSuccess: () => {
          // Reset form data and refresh the existing data
          setFormData({
            institutionName: '',
            degree: '',
            fieldOfStudy: '',
            startDate: '',
            endDate: ''
          });
          // Refetch user data to get the latest education list
          fetchData();
        }
      });
    } else {
      console.error('Existing education data is not an array');
    }
  };

  const fetchData = async () => {
    try {
      const userData = await fetchUserData();
      setExistingData(userData.user || { education: [] }); // Safeguard against missing user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-end'>
        <div onClick={toggleModal} className="bg-white cursor-pointer">
          <Chip variant="add" className="w-[140px] items-center">
            <span>Add New</span>
          </Chip>
        </div>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="max-w-[600px] max-md:w-[350px] modal-box">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           
            
              <div className="flex gap-6 mt-4">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="institutionName">Institute Name & Board</label>
                  <Input
                    id="institutionName"
                    placeholder="e.g., Meenakshi College of Engineering"
                    className='w-[300px]'
                    value={formData.institutionName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="degree">Degree</label>
                  <Input
                    id="degree"
                    placeholder="e.g., B.Tech"
                    value={formData.degree}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fieldOfStudy">Field of Study</label>
                  <Input
                    id="fieldOfStudy"
                    placeholder="e.g., Computer Science"
                    className='w-[250px]'
                    value={formData.fieldOfStudy}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="startDate">Start Date</label>
                  <Input
                    id="startDate"
                    type='date'
                    className='w-[250px]'
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="endDate">End Date</label>
                  <Input
                    id="endDate"
                    type='date'
                    className='w-[250px]'
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <Button variant="primary" type='submit' className='mt-4'>
                Add Certificate
              </Button>
            </form>
          </div>
          <label className="modal-backdrop" onClick={toggleModal}>Close</label>
        </div>
      )}
    </div>
  );
};

export default ResumeEducationModel;
