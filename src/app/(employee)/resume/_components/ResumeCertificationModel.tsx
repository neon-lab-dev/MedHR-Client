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

const ResumeCertificationModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    certificateName: '',
    certificateLink: '',
    month: ''
  });

  const [existingData, setExistingData] = useState<any>({
    certifications: [] // Default value to prevent errors
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
        setExistingData(userData.user || { certifications: [] }); // Safeguard against missing user data
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
    if (Array.isArray(existingData.certifications)) {
      const updatedData = {
        ...existingData,
        certifications: [...existingData.certifications, formData] // Append new certification data
      };
      mutation.mutate(updatedData, {
        onSuccess: () => {
          // Reset form data and refresh the existing data
          setFormData({
            certificateName: '',
            certificateLink: '',
            month: ''
          });
          // Refetch user data to get the latest certifications list
          fetchData();
        }
      });
    } else {
      console.error('Existing certifications data is not an array');
    }
  };
  const [monthDisplayValue, setMonthDisplayValue] = useState('');
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'month') {
      setMonthDisplayValue(value);
      // Convert YYYY-MM to mm/yyyy format for internal storage
      const [year, month] = value.split('-');
      setFormData(prevState => ({
        ...prevState,
        [id]: month && year ? `${month}/${year}` : ''
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [id]: value
      }));
    }
  };


  const fetchData = async () => {
    try {
      const userData = await fetchUserData();
      setExistingData(userData.user || { certifications: [] }); // Safeguard against missing user data
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
              <div className="flex flex-col gap-2">
                <label htmlFor="certificateName">Certificate Name</label>
                <Input
                  id="certificateName"
                  type="text"
                  placeholder="e.g., UI UX Design Certificate"
                  className='w-full max-md:placeholder:text-xs'
                  value={formData.certificateName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex gap-6 mt-4 max-md:flex-wrap">
                <div className="flex flex-col gap-2">
                  <label htmlFor="certificateLink">Certificate link / ID</label>
                  <Input
                    id="certificateLink"
                    placeholder="link here"
                    className='w-[250px] max-md:w-full max-md:placeholder:text-xs'
                    value={formData.certificateLink}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="month">Month</label>
                  <Input
                    id="month"
                    type="month"
                    className='w-[250px] max-md:w-full max-md:placeholder:text-xs'
                    value={monthDisplayValue}
                    onChange={handleDateChange}
                    placeholder="mm/yyyy"
                    onFocus={(e) => e.target.type = 'month'}
                    onBlur={(e) => {
                      if (!e.target.value) {
                        e.target.type = 'text';
                      }
                    }}
                  />
                </div>
              </div>
              <Button variant="primary" type="submit" className="mt-4">
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

export default ResumeCertificationModel;
