export const baseUrl = "https://test.scserver.org/";
export const baseUrl2 = "https://test.visech.com/api/";

export const EndPoints = {
  login: "web-login", // login from website
  forgetPassword: "update-password", // forget Passsword from web
  getAllJobs: "job", //All Jobs
  getAllUsers: "getusers", // All getusers
  getWebUsers: "webusers", // web users
  updateUser: "updateuser", //For the Admins:
  editUser: "edituser", //For the Managers and Basic Users:
  getJoByWeek: "jobweek", //week jobs
  jobPost:'jobs', //Created new job
  jobFilter:'jobfilter',// Job filter by Name,Address,Date
  imageUploads:'upload', //Picture Upload
  adminCreation:'webregister', //Create NEW Admin
  managerCreation:'register', //Creation NEW Manager
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
