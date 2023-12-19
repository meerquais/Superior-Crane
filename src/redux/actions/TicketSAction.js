import axios from "axios";
import {
  ALL_JOB_DOWNLOADING_PDF,
  EXPORT_TO_EXCEL,
  FILTER_PAY_DUTY_FORM,
  FILTER_PAY_DUTY_FORM_LOADING,
  FILTER_RIGGER_DATA_LOADING,
  FILTER_TRANSPORTATION_TICKETS_DATA_LOADING,
  GENERATE_PDF,
  IS_TICKETS_DATA_LOADING,
  PAY_DUTY_FORMS_DATA,
  PDF_FILE_URL,
  RIGGER_TICKETS,
  TRANSPORTATION_TICKETS,
} from "../reducers/TicketsReducers";
import { EndPoints, baseUrl } from "../../utils/Api";

//GETTING_RIGEER_TICKETS
export const getRiggerTicketsData = () => {
  return (dispatch) => {
    try {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: true });
      axios
        .get(`${baseUrl}${EndPoints.getRiggerTickets}`)
        .then((res) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
          dispatch({ type: RIGGER_TICKETS, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
        });
    } catch (error) {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
    }
  };
};

//DOWNLOAD URL FOR EXCEL_DATA
export const downloadTicketsData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: true });
      dispatch({ type: ALL_JOB_DOWNLOADING_PDF, payload: true });
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.exportExcelData}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse.status == 200) {
        const wholeUri = `https://test.scserver.org${content?.filePath}`;
        const link = document.createElement("a");
        link.href = wholeUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
        dispatch({ type: ALL_JOB_DOWNLOADING_PDF, payload: false });
        dispatch({ type: PDF_FILE_URL, payload: content });
      } else {
        alert(content?.error);
        dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
        dispatch({ type: ALL_JOB_DOWNLOADING_PDF, payload: false });

      }
    } catch (error) {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
      dispatch({ type: ALL_JOB_DOWNLOADING_PDF, payload: false });

    }
  };
};


//DOWNLOAD URL FOR PDF 
export const generatePdf = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GENERATE_PDF, payload: true });
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.generateDownload}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse.status == 200) {
        const wholeUri = `https://test.scserver.org/${content?.pdfLink}`;
        const link = document.createElement("a");
        link.href = wholeUri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        dispatch({ type: GENERATE_PDF, payload: false });
      } else {
        alert(content?.error);
        dispatch({ type: GENERATE_PDF, payload: false });
      }
    } catch (error) {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
    }
  };
};

// FILTER_PARAMS_DATA
export const filterRiggerTickets = (data) => {
  return async (dispatch) => {
    dispatch({ type: FILTER_RIGGER_DATA_LOADING, payload: true });
    try {
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.filterRiggerTicketsData}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse?.status == 200) {
        dispatch({ type: FILTER_RIGGER_DATA_LOADING, payload: false });
        dispatch({ type: RIGGER_TICKETS, payload: content });
      } else {
        alert(content?.message);
        dispatch({ type: FILTER_RIGGER_DATA_LOADING, payload: false });
      }
    } catch (error) {
      dispatch({ type: FILTER_RIGGER_DATA_LOADING, payload: false });
    }
  };
};

//GETTING_TRANSPORTATION_TICKETS
export const getTransportationTicketsData = () => {
  return (dispatch) => {
    try {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: true });
      axios
        .get(`${baseUrl}${EndPoints.getTransportationTickets}`)
        .then((res) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
          dispatch({ type: TRANSPORTATION_TICKETS, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
        });
    } catch (error) {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
    }
  };
};

//FILTER_TRANPORTATION_DATA
export const filterTransportationTicketsData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_TRANSPORTATION_TICKETS_DATA_LOADING,
        payload: true,
      });
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.filterTransportationTickets}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse?.status == 200) {
        dispatch({
          type: FILTER_TRANSPORTATION_TICKETS_DATA_LOADING,
          payload: false,
        });
        dispatch({ type: TRANSPORTATION_TICKETS, payload: content });
      } else {
        alert(content?.message);
        dispatch({
          type: FILTER_TRANSPORTATION_TICKETS_DATA_LOADING,
          payload: false,
        });
      }
    } catch (error) {
      dispatch({
        type: FILTER_TRANSPORTATION_TICKETS_DATA_LOADING,
        payload: false,
      });
    }
  };
};

//Get_Pay_DutyForms_Data
export const getPayDutyFormsData = () => {
  return (dispatch) => {
    try {
      dispatch({ type: IS_TICKETS_DATA_LOADING, payload: true });
      axios
        .get(`${baseUrl}${EndPoints.getPayDutyForm}`)
        .then((res) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
          dispatch({ type: PAY_DUTY_FORMS_DATA, payload: res?.data });
        })
        .catch((err) => {
          dispatch({ type: IS_TICKETS_DATA_LOADING, payload: false });
        });
    } catch (error) {
      dispatch({
        type: IS_TICKETS_DATA_LOADING,
        payload: false,
      });
    }
  };
};

//FILTER PAY_DUTY FORM
export const getFilterPayDutyData = (data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: FILTER_PAY_DUTY_FORM_LOADING,
        payload: true,
      });
      const rawResponse = await fetch(
        `${baseUrl}${EndPoints.filterPaydutyData}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const content = await rawResponse.json();
      if (rawResponse?.status == 200) {
        dispatch({ type: FILTER_PAY_DUTY_FORM_LOADING, payload: false });
        dispatch({ type: PAY_DUTY_FORMS_DATA, payload: content });
      } else {
        alert(content?.message);
        dispatch({ type: FILTER_PAY_DUTY_FORM_LOADING, payload: false });
      }
    } catch (error) {
      dispatch({
        type: FILTER_PAY_DUTY_FORM_LOADING,
        payload: false,
      });
    }
  };
};
