// const baseUrl = "https://api.medhrplus.com/api/v1";
// const baseUrl = "http://localhost:7000/api/v1";
// const baseUrl = "https://medhrplus-server.vercel.app/api/v1";

const api = {
  jobs: "/jobs",
  createJob: "/createjob",
  getEmployeeApplications: "/employee/job",

  // for employees
  employeeRegister: "/register",
  employeeLogin: "/login",
  employeeOTPVerify: "/verify",
  employeeLogout: "/logout",
  employeeForgotPassword: "/password/forgot",
  employeeChangePassword: "/password/update",
  employeeResetPassword: "/password/reset",
  employeeEnterDetails: "/user/details",
  employeeProfile: "/me",
  updateEmployeeProfile: "/me/update",
  employeeUploadResume: "/resumes",
  withDrawApplication: "/withdraw/job", //:id
  employeedetails: "/user/details",
  RESUME_UPLOAD: "/resumes",
  events: "/events",
  getSingleEventById: "/event",
  applyOnCourse: "/courses/apply",
  applySkillProgram: "/skills/apply",

  // for employers
  employerJob: "/employeer/job",
  employerRegistration: "/register/employeer",
  employerOTPVerify: "/verify/employeer",
  employerLogin: "/login/employeer",
  employerOtpVerify: "/verify/employeer",
  employerLogout: "/employeer/logout",
  employerForgotPassword: "/password/forgot/employeer",
  updateEmployerCompanyDetails: "/employeer/details",
  employerProfile: "/employeer/me",
  updateEmployerPRofile: "/employeer/me/update",
  updateEmployerPassword: "/employeer/password/update",
  employergetemploee: "/employeer/employee",
  changeStatus: "/jobs/manage",
  creatrjob: "/createjob",
  findCandidate: "/employeer/find-candidates",
  sendHiredEmail: "/send-hired-email",
  getAllEmployerCourses: "/employeer/course",
  getAllEmployerSkillProgrammes: "/employeer/skill-programmes",
  createEvent: "/events/create-event",
  updateEvent: "/events/update",
  getAllEventsForEmployer: "/employeer/events",
  createCourse: "/courses/create",
  updateCourse: "/updateCourse",

  // for admin
  adminLogin: "/login/admin",
  adminProfile: "/admin/me",
  adminLogout: "/logout/admin",
  allEmployees: "/admin/allEmployees",
  adminEmployee: "/admin/employee", // :id
  allEmployers: "/admin/allEmployers",
  adminEmployer: "/admin/employer", // :id
  job: "/job",
  applyJob: "/apply/job", // :id
  adminStats: "/admin/counts",
  adminJob: "/admin/job", // :id
  allSkillProgrammes: "/skills",
  singleSkillProgramme: "/skills",
  deleteSkill: "/skills",
  updateSkill: "/skills",
  getAllCourses: "/courses",
  getSingleCourse: "/courses",
  deleteCourse: "/courses",
  video: "/video",
  deleteEvent: "/events", // :id,
};

export default api;
