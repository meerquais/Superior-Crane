//Creating All Auth Actions due to some reasons
import {
  CHNAGE_PASSWORD_LOADING,
  FORGET_PASSWORD,
  LOADING_STATE,
  USER_LOGIN,
} from "../reducers/AuthReducer";
import { EndPoints, baseUrl, baseUrl2 } from "../../utils/Api";
import axios from "axios";

//For User sign in
export const signUser = (userData) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: true });
    try {
      const rawResponse = await fetch(`${baseUrl2}${EndPoints.login}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.userEmail,
          password: userData.userPassword,
        }),
      });
      const content = await rawResponse.json();
      if (rawResponse?.status === 200) {
        // alert("Login SuccessFully!");
        localStorage.setItem("items", JSON.stringify(content.data));
        dispatch({ type: USER_LOGIN, payload: content });
        dispatch({ type: LOADING_STATE, payload: false });        
      } else {
        alert(content?.message);
        dispatch({ type: LOADING_STATE, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};

//LogOut user and clear data
// export const signOutUser = (navigate) => {
//   return async (dispatch) => {
//     dispatch({ type: LOADING_STATE, payload: true });
//     try {
//       axios.get(`${baseUrl}${EndPoints.logOutUser}`).then((res) => {
//         if (res?.status === 200) {
//           dispatch({ type: USER_LOGIN, payload: [] });
//           navigate('/')
//           localStorage.clear();
//           dispatch({ type: LOADING_STATE, payload: false });
//         }
//       });
//     } catch (error) {
//       dispatch({ type: LOADING_STATE, payload: false });
//     }
//   };
// };

// Update the logout action to use POST method
export const signOutUser = (navigate) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: true });
    try {
      const response = await fetch(`${baseUrl2}${EndPoints.logOutUser}`, {
        method: "POST", // Change the method to POST
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response?.status === 200) {
        dispatch({ type: USER_LOGIN, payload: [] });
        navigate('/');
        localStorage.clear();
        dispatch({ type: LOADING_STATE, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};


// Forget Password
// export const changePassword = (userData, navigate) => {
//   return async (dispatch) => {
//     dispatch({ type: LOADING_STATE, payload: true });
//     try {
//       const forgetResponse = await fetch(
//         `${baseUrl2}${EndPoints.forgetPassword}`,
//         {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: userData.userEmail,
//             password: userData.userPassword,
//             password_confirmation: userData.confirmPassword,
//           }).then(response => response.json())
//           .then(data => {console.log(data.message)}),
//         }
//         );
//         const content = await forgetResponse.json();
//         if (forgetResponse.status === 200) {
//           dispatch({ type: LOADING_STATE, payload: false });
//           dispatch({ type: FORGET_PASSWORD, payload: content });
//           alert("Password changed successfully");
//           navigate("/");
//         }
//       } catch (error) {
//         dispatch({ type: LOADING_STATE, payload: false });
//     }
//   };
// };

export const changePassword = (userData, navigate) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: true });
    try {
      const forgetResponse = await fetch(
        `${baseUrl2}${EndPoints.forgetPassword}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: userData.userEmail,
            password: userData.userPassword,
            password_confirmation: userData.confirmPassword,
          }),
        }
      );

      const content = await forgetResponse.json();

      if (forgetResponse.status === 200) {
        dispatch({ type: LOADING_STATE, payload: false });
        dispatch({ type: FORGET_PASSWORD, payload: content });
        alert("Password changed successfully");
        navigate("/");
      } else {
        console.log(content); // Log the response for debugging
        alert("Failed to change password"); // Display a suitable message
        dispatch({ type: LOADING_STATE, payload: false });
      }
    } catch (error) {
      console.error("Error in changePassword:", error);
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};




//Update Password
export const updatePassword = (userData) => {
  const items = JSON.parse(localStorage?.getItem("items"));
  return async (dispatch) => {
    dispatch({ type: CHNAGE_PASSWORD_LOADING, payload: true });
    try {
      const forgetResponse = await fetch(
        `${baseUrl}${EndPoints.forgetPassword}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: items?.email,
            password: userData.userPassword,
            passwordConf: userData.confirmPassword,
          }),
        }
      );
      const content = await forgetResponse.json();
      if (forgetResponse.status === 200) {
        dispatch({ type: CHNAGE_PASSWORD_LOADING, payload: false });
        alert(content?.message);
        window?.location?.reload()
      } else {
        alert(content?.error);
        dispatch({ type: CHNAGE_PASSWORD_LOADING, payload: false });
      }
    } catch (error) {
      dispatch({ type: CHNAGE_PASSWORD_LOADING, payload: false });
    }
  };
};
