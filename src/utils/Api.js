export const baseUrl = "https://test.scserver.org/";
export const baseUrl2 = "https://test.visech.com/api/";

export const EndPoints = {
  login: "web-login", // login from website
  forgetPassword: "update-password", // forget Passsword from web
  sendOtp: "send-otp", // sending opt from web
  verifyOtp: "verify-otp", // verification of the otp
  getAllJobs: "jobs", //All Jobs
  getAllUsers: "users", // All getusers
  getWebUsers: "users", // web users
  updateUser: "updateuser", //For the Admins:
  editUser: "edituser", //For the Managers and Basic Users:
  getJoByWeek: "jobweek", //week jobs
  jobPost:'create-job', //Created new job
  jobFilter:'jobfilter',// Job filter by Name,Address,Date
  imageUploads:'upload', //Picture Upload
  adminCreation:'create-user', //Create NEW Admin
  managerCreation:'create-user', //Creation NEW Manager
  getRiggerTickets:'ticket', //To Get Rigger Tickets
  exportExcelData:'excel', //Export Excel Data
  filterRiggerTicketsData:'riggerfilter', //Filter Rigger Data
  getTransportationTickets:'trans', //To Get Transportation Tickets
  filterTransportationTickets:'transfilter', //Filter Transportation Datas
  getPayDutyForm:'payduty', //getPay Duty Forms
  filterPaydutyData:"dutyfilter", //FIlter Pay Duty Forms
  logOutUser:'logout', //For Logout ,
  generateDownload:'pdf', //Generate Download pdf
  forwardWeekJobs:'jobweekadd' //After week data
};
