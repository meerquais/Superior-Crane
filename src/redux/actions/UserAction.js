import axios from "axios";
import { EndPoints, baseUrl } from "../../utils/Api";
import {
  CHANGE_USER_STATUS,
  CREATE_NEW_ROLES,
  FILTER_JOB,
  GET_USERS,
  JOB_IMAGE_UPLOAD,
  POST_JOB,
  SEARCH_CHOCES,
  USER_LOADER,
} from "../reducers/UserReducer";

//GET MANAGER_&_USER
export const getUsersDetail = (date) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      axios
        .get(`${baseUrl}${EndPoints.getAllUsers}?role=${date}`)
        .then((res) => {
          dispatch({ type: GET_USERS, payload: res?.data });
          dispatch({ type: USER_LOADER, payload: false });
        })
        .catch((err) => {
          dispatch({ type: USER_LOADER, payload: false });
        });
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//GET_Admin
export const getWebUser = (date) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      axios
        .get(`${baseUrl}${EndPoints.getWebUsers}?role=${date}`)
        .then((res) => {
          dispatch({ type: GET_USERS, payload: res?.data });
          dispatch({ type: USER_LOADER, payload: false });
        })
        .catch((err) => {
          dispatch({ type: USER_LOADER, payload: false });
        });
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//FOR Update ADMIN
export const updateWebAdmin = (userId, status) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      axios
        .put(`${baseUrl}${EndPoints.updateUser}/${userId}`, {
          status: status,
        })
        .then((res) => {
          dispatch({ type: CHANGE_USER_STATUS, payload: res?.data });
          dispatch(getWebUser("Admin"));
          dispatch({ type: USER_LOADER, payload: false });
        })
        .catch((err) => {
          dispatch({ type: USER_LOADER, payload: false });
        });
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//FOR Update MANAGERS && BASIC USER
export const updateUser = (userID, status, role) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      axios
        .put(
          `${baseUrl}${EndPoints.editUser}/${userID}`,
          {
            status: status.toString(),
          },
          config
        )
        .then((res) => {
          dispatch({ type: CHANGE_USER_STATUS, payload: res?.data });
          dispatch(getUsersDetail(role));
          dispatch({ type: USER_LOADER, payload: false });
        })
        .catch((err) => {
          dispatch({ type: USER_LOADER, payload: false });
        });
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//Creating New Job
export const creatingNewJob = (
  data,
  files,
  isSCCI,
  setData,
  navigate,
  imgUrl,
  images
) => {
  return async (dispatch) => {
    const items = JSON.parse(localStorage.getItem("items"));
    //If Image Exist or Not
    const formData = new FormData();
    formData.append("clientName", data?.clientName);
    formData.append("jobDate", data?.date);
    formData.append("jobTime", data?.jobTime);
    formData.append("address", data?.address);
    formData.append("equipmentToBeUsed", data?.equipmentUsed);
    formData.append("riggerAssigned", data?.riggerAssigned);
    formData.append("supplierName", data?.supplierName);
    formData.append("notes", data?.notes);
    formData.append("enterBy", items?.name);
    images?.map((item) => {
      return formData.append("imageFiles", item, item?.name);
    });
    formData.append("isSCCI", isSCCI);
    formData.append("userId", items?.userId);
    formData.append("statusCode", 'goodTogo');
    try {
      dispatch({ type: USER_LOADER, payload: true });
      const rawResponse = await fetch(`${baseUrl}${EndPoints.jobPost}`, {
        method: "POST",
        body: formData,
      });
      const jobPostResponse = await rawResponse.json();
      if (rawResponse.status == 201) {
        alert("Job Posted SuccessFully!");
        dispatch({ type: POST_JOB, payload: jobPostResponse });
        dispatch({ type: USER_LOADER, payload: false });
        navigate("/joblists");
      } else {
        alert(jobPostResponse?.error);
        dispatch({ type: USER_LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//Create Roles for Web
export const createRolesforUsers = (data) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      let endpoint =
        data?.role === "Admin"
          ? `${EndPoints.adminCreation}`
          : `${EndPoints.managerCreation}`;
      const rawResponse = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
          email: data?.email,
          password: data?.password,
          passwordConf: data?.confirmPassword,
          role: data?.role,
        }),
      });
      const content = await rawResponse.json();
      if (rawResponse?.status == 200) {
        alert(content?.message);
        dispatch({ type: USER_LOADER, payload: false });
        window?.location?.reload();
      } else {
        alert(content?.error);
        dispatch({ type: USER_LOADER, payload: false });
      }
    } catch (error) {
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//Choices functions
export const searchChoices = (search, arr) => {
  return (dispatch) => {
    let filteredData = arr?.filter((value) => {
      return (
        value?.name?.toLowerCase()?.includes(search?.toLowerCase()) ||
        value?.email?.toString()?.includes(search?.toString())
      );
    });
    dispatch({ type: GET_USERS, payload: filteredData });
  };
};

//Job Details for Functions
export const jobParams = (data) => {
  return (dispatch) => {
    dispatch({ type: FILTER_JOB, payload: { data } });
  };
};
