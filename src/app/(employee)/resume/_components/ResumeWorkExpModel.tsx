"use client";
import React, { useState, useEffect } from 'react';
import Input from "@/components/Input";
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserData } from '@/api/employee';

const addWorkExperience = async (workData: any) => {
  const response = await axios.put('https://api.medhrplus.com/api/v1/user/details', workData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

const ResumeWorkExpModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    title: ''
  });

  const [existingData, setExistingData] = useState<any>({
    workExperience: [] // Default value to prevent errors
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addWorkExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error adding work experience:', error);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        // Ensure that workExperience is an array
        setExistingData({
          workExperience: Array.isArray(userData.workExperience) ? userData.workExperience : []
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Array.isArray(existingData.workExperience)) {
      const updatedData = {
        ...existingData,
        workExperience: [...existingData.workExperience, formData]
      };
      mutation.mutate(updatedData);
    } else {
      console.error('Existing work experience data is not an array');
    }
  };

  return (
    <div>
      <div className='flex'>
        <div onClick={toggleModal} className="bg-white cursor-pointer">
          <Chip variant="add" className="w-[140px] items-center">
            <span>Add New</span>
          </Chip>
        </div>
      </div>

      {isOpen && (
        <div className="modal modal-open">
          <div className="max-w-2xl max-md:w-[350px] modal-box">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-left">Company Name</label>
                  <Input
                    id="company"
                    placeholder="e.g., Google"
                    value={formData.company}
                    onChange={handleInputChange}
                    className='w-[300px] max-md:w-[140px] max-md:placeholder:text-xs'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-left">City, State</label>
                  <Input
                    id="location"
                    placeholder="e.g., San Francisco, CA"
                    value={formData.location}
                    onChange={handleInputChange}
                    className='w-[300px] max-md:w-[140px] max-md:placeholder:text-xs'
                  />
                </div>
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="startDate" className="text-left">From</label>
                  <Input
                    id="startDate"
                    type='date'
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className='w-[300px] max-md:w-[140px] max-md:placeholder:text-xs'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="endDate" className="text-left">To</label>
                  <Input
                    id="endDate"
                    type='date'
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className='w-[300px] max-md:w-[140px] max-md:placeholder:text-xs'
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <label htmlFor="description" className="text-left">Work Description</label>
                <textarea
                  id="description"
                  placeholder="Describe your work experience."
                  value={formData.description}
                  onChange={handleInputChange}
                  className='border px-2 py-4 rounded-xl placeholder:text-sm'
                />
              </div>
              <Button variant="primary" type='submit' className='mt-4'>
                Add Work Experience
              </Button>
            </form>
          </div>
          <label className="modal-backdrop" onClick={toggleModal}>Close</label>
        </div>
      )}
    </div>
  );
};

export default ResumeWorkExpModel;
