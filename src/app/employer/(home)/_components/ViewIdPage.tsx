"use client"
import { fetchJobDetail, updateJobDetails } from "@/api/employer";
import { ICONS, IMAGES } from "@/assets";
import Button from "@/components/Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";


export interface JobDetails {
    [x: string]: {};
    title: string;
    employmentType: string;
    responsibilities: string;
    description: string;
    applicationDeadline: string;
    employmentDuration: string;
    salary: string;
    requiredSkills: string[];
    extraBenefits: string;
    requirements: string;
    experience: string;
    location: string;
    locationType: string;
}

// Fetch job details


export interface UpdateJobPayload {
    title: string;
    employmentType: string;
    responsibilities: string;
    description: string;
    applicationDeadline: string;
    employmentDuration: string;
    salary: string;
    requiredSkills: string[];
    extraBenefits: string;
    requirements: string;
    experience: string;
    location: string;
    locationType: string;
}

const ViewIdPage = ({viewId} : {viewId:string}) => {
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState<UpdateJobPayload>({
        title: "",
        employmentType: "",
        responsibilities: "",
        description: "",
        applicationDeadline: "",
        employmentDuration: "",
        salary: "",
        requiredSkills: [],
        extraBenefits: "",
        requirements: "",
        experience: "",
        location: "",
        locationType: "",
    });
    const queryClient = useQueryClient();

    // Fetch job details using React Query
    const { data: jobData, isLoading, error } = useQuery({
        queryKey: ['job', viewId],
        queryFn: () => fetchJobDetail(viewId),
    });
    

    useEffect(() => {
        if (jobData) {
            setFormData({
                title: jobData.title,
                employmentType: jobData.employmentType,
                responsibilities: jobData.responsibilities,
                description: jobData.description,
                applicationDeadline: jobData.applicationDeadline,
                employmentDuration: jobData.employmentDuration,
                salary: jobData.salary,
                requiredSkills: jobData.requiredSkills,
                extraBenefits: jobData.extraBenefits,
                requirements: jobData.requirements,
                experience: jobData.experience,
                location: jobData.location,
                locationType: jobData.locationType,
            });
        }
    }, [jobData]);

    // Update job details mutation
    const mutation = useMutation({
        mutationFn: (payload: UpdateJobPayload) => updateJobDetails(viewId, payload),
        onSuccess: () => {
            setIsEditable(false);
            toast.success("Job details updated successfully");
            // Use the correct query key
            queryClient.invalidateQueries({
                queryKey: ['job', viewId],
            
            });
            queryClient.invalidateQueries({ queryKey: ['jobs-employer-job'] });

        },
        onError: (error: any) => {
            const errorMessage = error.response?.data?.message || error.message || "Failed to update job details";
            toast.error(`Error: ${errorMessage}`);
        }
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: name === 'requiredSkills' ? value.split(",").map((skill) => skill.trim()) : value,
        }));
    };

    const handleEditClick = () => {
        setIsEditable(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate(formData);
    };
    return (
        <div className="p-6 bg-[#f5f6fa]">
            <div className="bg-white p-6 rounded-xl">
                <div className="flex justify-between items-center">
                    <div className="flex gap-6 items-center">
                        <Link href="/employer/">
                            <Image src={ICONS.leftArrow} alt="Back" />
                        </Link>
                        <h1 className="text-neutral-950 text-[28px] font-bold">
                            Job Application
                        </h1>
                    </div>
                    <div className="flex items-center text-2xl gap-4 px-4">
                        {isEditable ? (
                            <Button variant="primary" type="submit" form="job-form">
                                Update
                            </Button>
                        ) : (
                            <>
                                <Image
                                    src={IMAGES.Edit}
                                    alt="Edit"
                                    onClick={handleEditClick}
                                    className="cursor-pointer"
                                />
                                <span
                                    onClick={handleEditClick}
                                    className="cursor-pointer text-red-500 font-bold"
                                >
                                    Edit
                                </span>
                            </>
                        )}
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Oval
                            height={40}
                            width={40}
                            color="#F9533A"
                            visible={true}
                            ariaLabel='oval-loading'
                            secondaryColor="#f4f4f4"
                            strokeWidth={2}
                            strokeWidthSecondary={2}
                        />
                    </div>
                ) : (
                    <form id="job-form" onSubmit={handleSubmit}>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="title" className="text-lg">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    className="p-3 border rounded-xl w-[500px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="employmentType" className="text-lg">Job Type</label>
                                <input
                                    type="text"
                                    name="employmentType"
                                    value={formData.employmentType}
                                    className="p-3 border rounded-xl w-[250px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="responsibilities" className="text-lg">
                                    Roles and Responsibilities - Job Description
                                </label>
                                <textarea
                                    name="responsibilities"
                                    value={formData.responsibilities}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="description" className="text-lg">Job Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="applicationDeadline" className="text-lg">Application Deadline</label>
                                <input
                                    type="date"
                                    name="applicationDeadline"
                                    value={formData.applicationDeadline}
                                    className="p-3 border rounded-xl w-[370px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="employmentDuration" className="text-lg">Employment Duration</label>
                                <input
                                    type="text"
                                    name="employmentDuration"
                                    value={formData.employmentDuration}
                                    className="p-3 border rounded-xl w-[370px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="salary" className="text-lg">Salary</label>
                                <input
                                    type="text"
                                    name="salary"
                                    value={formData.salary}
                                    className="p-3 border rounded-xl w-[370px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="locationType" className="text-lg">Location Type</label>
                                <input
                                    type="text"
                                    name="locationType"
                                    value={formData.locationType}
                                    className="p-3 border rounded-xl w-[370px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="requiredSkills" className="text-lg">Required Skills</label>
                                <input
                                    type="text"
                                    name="requiredSkills"
                                    value={formData.requiredSkills}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="extraBenefits" className="text-lg">Extra Benefits</label>
                                <textarea
                                    name="extraBenefits"
                                    value={formData.extraBenefits}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="requirements" className="text-lg">Requirements</label>
                                <textarea
                                    name="requirements"
                                    value={formData.requirements}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="experience" className="text-lg">Experience</label>
                                <input
                                    type="text"
                                    name="experience"
                                    value={formData.experience}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                        <div className="flex justify-center mt-8 gap-6">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="location" className="text-lg">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    className="p-3 border rounded-xl w-[770px]"
                                    onChange={handleChange}
                                    disabled={!isEditable}
                                />
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ViewIdPage;