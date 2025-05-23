// const baseUrl = "https://api.medhrplus.com/api/v1";
// const baseUrl = "http://localhost:7000/api/v1";
const baseUrl = "https://carrerhub-backend.vercel.app/api/v1";

const api = {
  jobs: baseUrl + "/jobs",
  createJob: baseUrl + "/createjob",
  getEmployeeApplications: baseUrl + "/employee/job",

  // for employees
  employeeRegister: baseUrl + "/register",
  employeeLogin: baseUrl + "/login",
  employeeOTPVerify: baseUrl + "/verify",
  employeeLogout: baseUrl + "/logout",
  employeeForgotPassword: baseUrl + "/password/forgot",
  employeeChangePassword: baseUrl + "/password/update",
  employeeResetPassword: baseUrl + "/password/reset",
  employeeEnterDetails: baseUrl + "/user/details",
  employeeProfile: baseUrl + "/me",
  updateEmployeeProfile: baseUrl + "/me/update",
  employeeUploadResume: baseUrl + "/resumes",
  withDrawApplication: baseUrl + "/withdraw/job", //:id
  employeedetails: baseUrl + "/user/details",
  RESUME_UPLOAD: baseUrl + "/resumes",
  events: baseUrl + "/events",
  getSingleEventById : baseUrl + "/event",
  applyOnCourse : baseUrl + "/courses/apply",
  applySkillProgram : baseUrl + "/skills/apply",

  // for employers
  employerJob: baseUrl + "/employeer/job",
  employerRegistration: baseUrl + "/register/employeer",
  employerOTPVerify: baseUrl + "/verify/employeer",
  employerLogin: baseUrl + "/login/employeer",
  employerOtpVerify: baseUrl + "/verify/employeer",
  employerLogout: baseUrl + "/employeer/logout",
  employerForgotPassword: baseUrl + "/password/forgot/employeer",
  updateEmployerCompanyDetails: baseUrl + "/employeer/details",
  employerProfile: baseUrl + "/employeer/me",
  updateEmployerPRofile: baseUrl + "/employeer/me/update",
  updateEmployerPassword: baseUrl + "/employeer/password/update",
  employergetemploee:baseUrl + "/employeer/employee",
  changeStatus:baseUrl + "/jobs/manage",
  creatrjob:baseUrl+"/createjob",
  findCandidate: baseUrl+"/employeer/find-candidates",
  sendHiredEmail: baseUrl+"/send-hired-email",
  getAllEmployerCourses: baseUrl+"/employeer/course",
  getAllEmployerSkillProgrammes: baseUrl+"/employeer/skill-programmes",
  createEvent: baseUrl+"/events/create-event",
  updateEvent: baseUrl+"/events/update",
  getAllEventsForEmployer: baseUrl+"/employeer/events",
  createCourse: baseUrl+"/courses/create",
  updateCourse: baseUrl+"/updateCourse",

  // for admin
  adminLogin: baseUrl + "/login/admin",
  adminProfile: baseUrl + "/admin/me",
  adminLogout: baseUrl + "/logout/admin",
  allEmployees: baseUrl + "/admin/allEmployees",
  adminEmployee: baseUrl + "/admin/employee", //:id
  allEmployers: baseUrl + "/admin/allEmployers",
  adminEmployer: baseUrl + "/admin/employer", //:id
  job: baseUrl + "/job",
  applyJob: baseUrl + "/apply/job", //:id
  adminStats: baseUrl + "/admin/counts",
  adminJob: baseUrl + "/admin/job", //:id
  allSkillProgrammes: baseUrl + "/skills",
  singleSkillProgramme: baseUrl + "/skills",
  deleteSkill: baseUrl + "/skills",
  updateSkill: baseUrl + "/skills",
  getAllCourses: baseUrl + "/courses",
  getSingleCourse: baseUrl + "/courses",
  deleteCourse: baseUrl + "/courses",
  video: baseUrl + "/video",
  deleteEvent: baseUrl + "/events", //:id


};

export default api;
