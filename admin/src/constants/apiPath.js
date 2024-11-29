let URL;
let appMode = process.env.REACT_APP_ENV;
let ASSET_URL = "https://b2btobacco.s3.amazonaws.com/";

if (appMode === "development") {
  URL = "http://153.92.4.13:5353/api/";
} else {
  URL = "http://153.92.4.13:5353/api/";
  // URL = "http://localhost:6215/api/";
}

// 153.92.4.13:6555

let apiPath = {
  baseURL: URL,
  assetURL: ASSET_URL,
  dashboard: "admin/dashboard/dashboard-data",

  // Auth API
  logout: "admin/auth/logout",
  login: "admin/auth/login",

  profile: "admin/auth/get-profile",
  updateProfile: "admin/auth/update-profile",
  changePassword: "admin/auth/change-password",
  updateAppSetting: "admin/auth/update-app-setting",

  forgotPassword: "admin/auth/forgot-password",
  verifyOTP: "admin/auth/verify-otp",
  resetPassword: "admin/auth/reset-password",

  editSetting: "admin/setting/edit",
  viewSetting: "admin/setting/view",

  // Subscription APIs
  listSubscription: "admin/subscription/list",
  addEditSubscription: "admin/subscription/add-edit",
  statusSubscription: "admin/subscription/status",
  viewSubscription: "admin/subscription/view",
  editSubscription: "admin/subscription/edit",

  // Event APIs
  listEvent: "admin/event/list",
  addEditEvent: "admin/event/add-edit",
  statusEvent: "admin/event/status",
  viewEvent: "admin/event/view",
  venueList: "admin/event/venueList",
  tableList: "admin/event/tableList",

  // EmailTemplate APIs
  listEmailTemplate: "admin/email-template/list",
  addEditEmailTemplate: "admin/email-template/add-edit",
  statusEmailTemplate: "admin/email-template/status",
  viewEmailTemplate: "admin/email-template/view",

  // Banner APIs
  listBanner: "admin/banner/list",
  addEditBanner: "admin/banner/add-edit",
  statusBanner: "admin/banner/status",
  viewBanner: "admin/banner/view",

  // Banner APIs
  listBrand: "admin/brand/list",
  addEditBrand: "admin/brand/add-edit",
  statusBrand: "admin/brand/status",
  viewBrand: "admin/brand/view",
  importBrand: "admin/brand/import-file",

  // Content APIs
  listContent: "admin/content/list",
  addEditContent: "admin/content/add-edit",
  statusContent: "admin/content/status",
  viewContent: "admin/content/view",

  // Common Routes
};

export default apiPath;
