import axios from "axios";
import {
  FORWARD_WEEK_JOBS,
  GET_ALLJOB,
  JOB_EDIT,
  JOB_EDIT_LOADING,
  LOADING_STATE,
} from "../reducers/DashBoardReducers";
import { baseUrl } from "../../utils/Api";
import { EndPoints } from "../../utils/Api";

//Get All Jobs data
export const getJobData = (date) => {
  return async (dispatch) => {
  
    dispatch({ type: LOADING_STATE, payload: true });
    const url =
      date !== undefined
        ? `${baseUrl}${EndPoints.getAllJobs}?jobDate=${date}`
        : `${baseUrl}${EndPoints.getAllJobs}`;
    try {
      axios
        .get(`${url}`)
        .then((res) => {
          dispatch({ type: LOADING_STATE, payload: false });
          dispatch({ type: GET_ALLJOB, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: LOADING_STATE, payload: false });
        });
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};

//Get Job By weeks
export const getJobByweek = (date) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: true });
    try {
      axios
        .get(`${baseUrl}${EndPoints.getJoByWeek}?jobDate=${date}`)
        .then((res) => {
          dispatch({ type: LOADING_STATE, payload: false });
          dispatch({ type: GET_ALLJOB, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: LOADING_STATE, payload: false });
        });
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};

//Get next week Job By weeks
export const getNextWeekData = (date) => {
  return async (dispatch) => {
    dispatch({ type: LOADING_STATE, payload: true });
    try {
      axios
        .get(`${baseUrl}${EndPoints.forwardWeekJobs}?jobDate=${date}`)
        .then((res) => {
          dispatch({ type: LOADING_STATE, payload: false });
          dispatch({ type: GET_ALLJOB, payload: res?.data });
          dispatch({ type: FORWARD_WEEK_JOBS, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: LOADING_STATE, payload: false });
        });
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};

//FILTER_JOBS_DATA_BY_PARAMS
export const filterJobByParam = (data) => {
  return async (dispatch) => {
    try {
      if (data != undefined) {
        dispatch({ type: LOADING_STATE, payload: true });
        axios
          .post(`${baseUrl}${EndPoints.jobFilter}`, {
            clientName: data?.client,
            address: data?.address,
            jobDate: data?.jobDate,
          })
          .then((res) => {
            dispatch({ type: LOADING_STATE, payload: false });
            dispatch({ type: GET_ALLJOB, payload: res?.data });
          })
          .catch((err) => {
            dispatch({ type: LOADING_STATE, payload: false });
          });
      } else {
        alert("Please Select Each of the Contain");
        dispatch({ type: LOADING_STATE, payload: false });
      }
    } catch (error) {
      dispatch({ type: LOADING_STATE, payload: false });
    }
  };
};

//Edit Jobs
export const editJob = (editData, isCheck, jobId, images, onclose) => {
  const items = JSON.parse(localStorage.getItem("items"));
  return async (dispatch) => {
    try {
      dispatch({
        type: JOB_EDIT_LOADING,
        payload: true,
      });

      let data1 = {
        clientName: editData?.clientName,
        jobDate: editData?.jobDate,
        jobTime: editData?.jobTime,
        address: editData?.address,
        equipmentToBeUsed: editData?.equipmentToBeUsed,
        riggerAssigned: editData?.riggerAssigned,
        supplierName: editData?.supplierName,
        notes: editData?.notes,
        enterBy: items?.name,
        statusCode: editData?.statusCode,
        isSCCI: isCheck,
      };
      let data = {
        clientName: editData?.clientName,
        jobDate: editData?.jobDate,
        jobTime: editData?.jobTime,
        address: editData?.address,
        equipmentToBeUsed: editData?.equipmentToBeUsed,
        riggerAssigned: editData?.riggerAssigned,
        supplierName: editData?.supplierName,
        notes: editData?.notes,
        enterBy: items?.name,
        statusCode: editData?.statusCode,
        isSCCI: isCheck,
        imageFiles: images?.map((item) => {
          return "imageFiles", item, item?.name;
        }),
      };
      const selectedData = images?.length > 0 ? data : data1;
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.jobPost}/${jobId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedData),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse?.status == 200) {
        alert(content?.message);
        onclose(() => {
          return false;
        });
        dispatch({ type: JOB_EDIT_LOADING, payload: false });
        if (images?.length > 0) {
          dispatch(uploadImages(images));
          return;
        }
        dispatch({ type: JOB_EDIT, payload: content });
      } else {
        alert(content?.error);
        dispatch({ type: JOB_EDIT_LOADING, payload: false });
      }
    } catch (editJob) {
      dispatch({ type: JOB_EDIT_LOADING, payload: false });
    }
  };
};

export const uploadImages = (images) => {
  return async () => {
    var formData = new FormData();
    images?.map((item) => {
      return formData.append("imageFiles", item, item?.name);
    });
    try {
      const response = await fetch(`${baseUrl}${EndPoints.imageUploads}`, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      const finalResponse = await response.json();
    } catch (error) {}
  };
};
