"use client";
import React, { useState, useEffect } from 'react';
import Input from "@/components/Input";
import Button from '@/components/Button';
import Chip from '@/components/Chip';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUserData } from '@/api/employee';
import axiosInstance from '@/api/axiosInstance';

const addProject = async (projectData: any) => {
  const response = await axiosInstance.put('/user/details', projectData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.data;
};

const ResumeProjectDetailsModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    link: ''
  });

  const [existingData, setExistingData] = useState<any>({
    projects: [] // Default value to prevent errors
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setIsOpen(false);
    },
    onError: (error) => {
      console.error('Error adding project:', error);
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        setExistingData(userData.user || { projects: [] }); // Safeguard against missing user data
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
    if (Array.isArray(existingData.projects)) { // Check if projects is an array
      const updatedData = {
        ...existingData,
        projects: [...existingData.projects, formData] // Append new project data
      };
      mutation.mutate(updatedData, {
        onSuccess: () => {
          setFormData({
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            link: ''
          });
        }
      });
    } else {
      console.error('Existing project data is not an array');
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
          <div className="max-w-xl modal-box">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col mt-4 gap-2">
                <label htmlFor="title">Project Title</label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Online Gaming App"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <label htmlFor="description">Project Description</label>
                <textarea
                  id="description"
                  placeholder="Describe the project, its goals, development, and key features."
                  className='border px-2 py-4 rounded-xl placeholder:text-sm'
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-6 mt-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="startDate">Start Date</label>
                  <Input
                    id="startDate"
                    type='date'
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className='w-[250px]'
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="endDate">End Date</label>
                  <Input
                    id="endDate"
                    type='date'
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className='w-[250px]'
                  />
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-2">
                <label htmlFor="link">Project Link</label>
                <Input
                  id="link"
                  type="url"
                  placeholder="e.g., https://example.com"
                  value={formData.link}
                  onChange={handleInputChange}
                />
              </div>
              <Button variant="primary" type='submit' className='mt-4'>
                Add Project
              </Button>
            </form>
          </div>
          <label className="modal-backdrop" onClick={toggleModal}>Close</label>
        </div>
      )}
    </div>
  );
};

export default ResumeProjectDetailsModel;
