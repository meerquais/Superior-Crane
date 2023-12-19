export const IS_TICKETS_DATA_LOADING = "IS_TICKETS_DATA_LOADING";
export const RIGGER_TICKETS = "RIGGER_TICKETS";
export const EXPORT_TO_EXCEL = "EXPORT_TO_EXCEL";
export const FILTER_RIGGER_DATA_LOADING = "FILTER_RIGGER_DATA_LOADING";
export const TRANSPORTATION_TICKETS = "TRANSPORTATION_TICKETS";
export const FILTER_TRANSPORTATION_TICKETS_DATA_LOADING = "FILTER_TRANSPORTATION_TICKETS_DATA_LOADING";
export const PAY_DUTY_FORMS_DATA = 'PAY_DUTY_FORMS_DATA';
export const FILTER_PAY_DUTY_FORM_LOADING = 'FILTER_PAY_DUTY_FORM_LOADING';
export const PDF_FILE_URL = 'PDF_FILE_URL';
export const ALL_JOB_DOWNLOADING_PDF = 'ALL_JOB_DOWNLOADING_PDF';
export const GENERATE_PDF = 'GENERATE_PDF';

const initialize_states = {
  isTicketsDataLoading: false,
  riggerTicketsData: [],
  exportToExcel: [],
  isRiggerFilterLoading: false,
  transportationTicketsData: [],
  isTransportationTicketsLoading:false,
  payDutyForm:[],
  isPayDutyFormLoading:false,
  pdfUrl:[],
  allJobLoadingPdf:false,
  isGeneratingPdf:false
};

const TicketsReducer = (state = initialize_states, action) => {
  switch (action.type) {
    case IS_TICKETS_DATA_LOADING:
      return {
        ...state,
        isTicketsDataLoading: action.payload,
      };
    case RIGGER_TICKETS:
      return {
        ...state,
        riggerTicketsData: action.payload,
      };
    case EXPORT_TO_EXCEL:
      return {
        ...state,
        exportToExcel: action.payload,
      };
    case FILTER_RIGGER_DATA_LOADING:
      return {
        ...state,
        isRiggerFilterLoading: action.payload,
      };
    case TRANSPORTATION_TICKETS:
      return {
        ...state,
        transportationTicketsData: action.payload,
      };
      case FILTER_TRANSPORTATION_TICKETS_DATA_LOADING:
      return {
        ...state,
        isTransportationTicketsLoading: action.payload,
      };
      case PAY_DUTY_FORMS_DATA:
        return {
          ...state,
          payDutyForm: action.payload,
        };
        case FILTER_PAY_DUTY_FORM_LOADING:
          return{
            ...state,
            isPayDutyFormLoading:action.payload
          }
          case PDF_FILE_URL:
          return{
            ...state,
            pdfUrl:action.payload
          }
          case ALL_JOB_DOWNLOADING_PDF:
          return{
            ...state,
            allJobLoadingPdf:action.payload
          }
          case GENERATE_PDF:
            return{
              ...state,
              isGeneratingPdf:action.payload
            }
    default: {
      return state;
    }
  }
};
export default TicketsReducer;
