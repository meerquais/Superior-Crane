import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import DahsBoardReducer from "./DashBoardReducers";
import UserReducer from "./UserReducer";
import TicketsReducer from "./TicketsReducers";

export default  combineReducers({
    auth: AuthReducer,
    dashBoard:DahsBoardReducer,
    usersData:UserReducer,
    ticketsData:TicketsReducer,
})