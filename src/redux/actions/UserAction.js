import axios from "axios";
import { EndPoints, baseUrl, baseUrl2 } from "../../utils/Api";
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
// export const getUsersDetail = (role) => {
//   return async (dispatch) => {
//     dispatch({ type: USER_LOADER, payload: true });
//     try {
//       const userId = JSON.parse(localStorage.getItem('items'))?.id;
//       axios
//         .get(`${baseUrl2}${EndPoints.getAllUsers}/${userId}?role=${role}`)
//         .then((res) => {
//           dispatch({ type: GET_USERS, payload: res?.data });
//           dispatch({ type: USER_LOADER, payload: false });
//         })
//         .catch((err) => {
//           dispatch({ type: USER_LOADER, payload: false });
//         });
//     } catch (error) {
//       dispatch({ type: USER_LOADER, payload: false });
//     }
//   };
// };

export const getUsersDetail = (role) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      const userId = JSON.parse(localStorage.getItem('items'))?.id;
      const response = await axios.get(`${baseUrl2}${EndPoints.getAllUsers}/${userId}?role=${role}`);
      
      // Assuming response.data.data is the array of users you want
      dispatch({ type: GET_USERS, payload: response?.data.data });

      dispatch({ type: USER_LOADER, payload: false });
      // console.log(response);
    } catch (error) {
      console.error('Error fetching users:', error);
      dispatch({ type: USER_LOADER, payload: false });
    }
  };
};

//GET_Admin
// export const getWebUser = (role) => {
//   return async (dispatch) => {
//     dispatch({ type: USER_LOADER, payload: true });
//     try {
//       const userId = JSON.parse(localStorage.getItem('items'))?.id;
//       axios
//         .get(`${baseUrl2}${EndPoints.getWebUsers}/${userId}?role=${role}`)
//         .then((res) => {
//           dispatch({ type: GET_USERS, payload: res?.data });
//           dispatch({ type: USER_LOADER, payload: false });
//           console.log(res)
//         })
//         .catch((err) => {
//           dispatch({ type: USER_LOADER, payload: false });
//         });
//     } catch (error) {
//       dispatch({ type: USER_LOADER, payload: false });
//     }
//   };
// };

export const getWebUser = (role) => {
  return async (dispatch) => {
    dispatch({ type: USER_LOADER, payload: true });
    try {
      const userId = JSON.parse(localStorage.getItem('items'))?.id;
      const response = await axios.get(`${baseUrl2}${EndPoints.getWebUsers}/${userId}?role=${role}`);
      
      // Assuming response.data.data is the array of users you want
      dispatch({ type: GET_USERS, payload: response?.data.data });

      dispatch({ type: USER_LOADER, payload: false });
      // console.log(response);
    } catch (error) {
      console.error('Error fetching web users:', error);
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

// Creating New Job

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
    // If Image Exist or Not
    const formData = new FormData();
    formData.append("clientName", data?.clientName);
    formData.append("jobDate", data?.jobDate);
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
    formData.append("isSCCI", isSCCI ? 1 : 0);
    formData.append("userId", items?.id);
    formData.append("statusCode", "goodTogo");
    console.log("Data:", data);
    console.log("Images:", images);
    console.log("Form Data:", formData);
    try {
      dispatch({ type: USER_LOADER, payload: true });
      const rawResponse = await fetch(`${baseUrl2}${EndPoints.jobPost}`, {
        method: "POST",
        body: formData,
      });
      console.log("Raw Response:", rawResponse);
      const jobPostResponse = await rawResponse.json();
      if (jobPostResponse.status === 200 && jobPostResponse.message === "Job added successfully.") {
        // This is the success case
        alert("Job added successfully!");
        dispatch({ type: POST_JOB, payload: jobPostResponse });
        dispatch({ type: USER_LOADER, payload: false });
        navigate("/joblists");
      } else {
        // This is the error case
        console.error("Error details:", jobPostResponse);
        alert(jobPostResponse?.message || "An error occurred");
        dispatch({ type: USER_LOADER, payload: false });
      }
    } catch (error) {
      console.error("Error:", error);
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
      const rawResponse = await fetch(`${baseUrl2}${endpoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data?.name,
          email: data?.email,
          password: data?.password,
          password_confirmation: data?.confirmPassword,
          role: data?.role.toLowerCase(), 
        }),
      });
      const content = await rawResponse.json();
      console.log('API Response:', content);
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
