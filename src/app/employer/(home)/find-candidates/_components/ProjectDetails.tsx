export type TProjectDetails = {
  _id?: string;
  title?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
};

const ProjectDetails = ({ projects }: { projects: TProjectDetails[] }) => {
  return (
    <div className="bg-white border border-[#F7F7F8] rounded-[20px] p-5 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-[#37466D]">Project Details</h1>
      <hr className="border border-[#F7F7F8] w-full" />

      {/* Project card list or fallback */}
      {projects.length === 0 ? (
        <p className="text-gray-400">No projects added</p>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-[#F7F7F8] rounded-[20px] p-5"
            >
              <h1 className="text-lg font-medium text-[#383842]">{project.title}</h1>
              <a
                href={project.link}
                target="_blank"
                className="text-[#717386] mt-2 underline hover:text-primary-500"
              >
                {project.link}
              </a>
              <p className="text-[#717386] mt-3">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectDetails;
