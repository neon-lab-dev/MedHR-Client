import React from 'react';
import { ICONS, IMAGES } from '@/assets';
import Image from 'next/image';
import ResumeProjectDetailsModel from './ResumeProjectDetailsModel';

// Define the types for the project data
interface Project {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  link: string;
}

interface ProjectComponentProps {
  projects: Project[];
}

const ProjectComponent: React.FC<ProjectComponentProps> = ({ projects }) => {
  return (
    <div className="pt-2 pb-10 bg-secondary-50 font-plus-jakarta-sans">
      <div className="max-width flex">
        <div className="w-full bg-white border border-neutral-100 p-6 max-md:p-2 rounded-2xl items-center gap-5 mx-[120px] max-lg:mx-10 max-md:mx-4 text-center">
          <div className="flex justify-between px-2 py-3 rounded-xl">
            <div className="flex gap-4 items-center">
              <span className="text-4xl text-secondary-700 font-semibold max-md:text-base">Project Details</span>
            </div>
            {/* <ResumeProjectDetailsModel /> */}
          </div>
          <hr className='pb-10 mx-4' />
          {projects.length > 0 ? (
            projects.map((project, index) => (
              <div key={index} className="flex max-md:flex-col max-md:justify-end justify-between items-start border-2 border-neutral-100 p-6 rounded-xl mb-4">
                <div className="flex gap-4 items-center">
                  <div className="font-plus-jakarta-sans">
                    <div className="flex flex-col gap-2 text-start">
                      <span className="text-neutral-950 text-sm md:text-xl font-semibold">{project.title}</span>
                      <p className="text-neutral-600 text-sm md:text-lg">{project.description}</p>
                      <div className="flex flex-col gap-1 text-sm md:text-lg text-neutral-500">
                        <span><strong>Start Date:</strong> {new Date(project.startDate).toLocaleDateString()}</span>
                        <span><strong>End Date:</strong> {new Date(project.endDate).toLocaleDateString()}</span>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">View Project Link</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No project details available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectComponent;
