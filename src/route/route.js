import {  Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import AddJobs from "../pages/addJbos/Addjobs";
import Admin from "../pages/admin/Admin";
import BasicUser from "../pages/basicUser/BasicUser";
import JobLists from "../pages/jobLists/Joblists";
import Managers from "../pages/managers/Managers";
import PayDutyForm from "../pages/payDutyForm/payDutyform";
import RiggerTickets from "../pages/riggerTickets/RiggerTickets";
import Transportaion from "../pages/tranportiona/Transportatiopn";
import User from "../pages/user/User";
import MainPage from "../pages/mainPage/MainPage";
import DashBoard from "../pages/dashBoard/DashBoard";

const Router = () => {
    return (
        <React.Fragment>
                <Routes>
                    <Route path='/main' element={ <MainPage />} />
                    <Route path="/dashBoard" element={<DashBoard/>}/>
                    <Route path='/joblists' element={ <JobLists />} />
                    <Route path='/addjobs' element={ <AddJobs />} />
                    <Route path='/user' element={ <User/> } />
                    <Route path='/admin' element={ <Admin />} />
                    <Route path='/managers' element={<Managers />} />
                    <Route path='/basicuser' element={ <BasicUser />} />
                    <Route path='/riggerticket' element={<RiggerTickets />} />
                    <Route path='/transportation' element={<Transportaion />} />
                    <Route path='/paydutyform' element={<PayDutyForm />} />
                    <Route path="*" element={<Navigate to="/dashBoard" />} />
                </Routes>
        </React.Fragment>
    )
}

export default Router;
