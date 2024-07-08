import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/common/Header";
import Expenses from "./Accounts/Expenses";
import Invoices from "./Accounts/Invoices";
import Payments from "./Accounts/Payments";
import HrDashboard from "./Dashboard/HrDashboard";
import ProjectDashboard from "./Dashboard/ProjectDashboard";
import Attendance from "./Employee/Attendance";
import AttendanceEmployees from "./Employee/AttendanceEmployees";
import Departments from "./Employee/Departments";
import EmployeeProfile from "./Employee/EmployeeProfile";
import Holidays from "./Employee/Holidays";
import LeaveRequest from "./Employee/LeaveRequest";
import Members from "./Employee/Members";
import ClientProfile from "./Our Clients/ClientProfile";
import Clients from "./Our Clients/Clients";
import Salaryslip from "./Payroll/Salaryslip";
import Leaders from "./Projects/Leaders";
import Projects from "./Projects/Projects";
import Tasks from "./Projects/Tasks";
import Timesheet from "./Projects/Timesheet";
import TicketsDetail from "./Tickets/TicketsDetail";
import TicketsView from "./Tickets/TicketsView";
import Alerts from "./UIComponents/Alerts";
import Calendar from "./App/Calendar";
import ChatApp from "./App/ChatApp";
import ApexCharts from "./OtherPages/ApexCharts";
import FormsExample from "./OtherPages/FormsExample";
import TablesExample from "./OtherPages/TablesExample";
import ReviewsPage from "./OtherPages/ReviewsPage";
import Icons from "./OtherPages/Icons";
import Widgets from "./OtherPages/Widgets";
import Badges from "./UIComponents/Badges";
import Breadcrumb from "./UIComponents/Breadcrumb";
import Buttons from "./UIComponents/Buttons";
import Cards from "./UIComponents/Cards";
import Carousel from "./UIComponents/Carousel";
import Collapse from "./UIComponents/Collapse";
import Dropdowns from "./UIComponents/Dropdowns";
import ListGroup from "./UIComponents/ListGroup";
import ModalUI from "./UIComponents/ModalUI";
import NavsUI from "./UIComponents/NavsUI";
import NavbarUI from "./UIComponents/NavbarUI";
import PaginationUI from "./UIComponents/PaginationUI";
import PopoversUI from "./UIComponents/PopoversUI";
import ProgressUI from "./UIComponents/ProgressUI";
import Scrollspy from "./UIComponents/Scrollspy";
import SpinnersUI from "./UIComponents/SpinnersUI";
import ToastsUI from "./UIComponents/ToastsUI";
import StaterPage from "./Stater/StaterPage";
import PageHeader1 from "../components/common/PageHeader1";
import Documentation from "./Documentation/Documentation";
import Changelog from "./Changelog/Changelog";
import Help from "./Dashboard/Help";
import ManageUsers from "./UserManagement/ManageUsers";
import ManageRoles from "./UserManagement/ManageRoles";

function MainIndex(props) {

    const { activekey } = props;
    return (
        <div className="main px-lg-4 px-md-4">
            {activekey !== "/chat-app" ? activekey === "/documentation" ? <PageHeader1 /> : <Header /> : ""}
            <div className="body d-flex py-lg-3 py-md-2">
                <Route exact path={`${process.env.PUBLIC_URL}/`} component={HrDashboard} />
                <Route exact path={`${process.env.PUBLIC_URL}/hr-dashboard`} component={HrDashboard} />
                <Route exact path={`${process.env.PUBLIC_URL}/project-dashboard`} component={ProjectDashboard} />
                <Route exact path={`${process.env.PUBLIC_URL}/projects`} component={Projects} />
                <Route exact path={`${process.env.PUBLIC_URL}/tasks`} component={Tasks} />
                <Route exact path={`${process.env.PUBLIC_URL}/timesheet`} component={Timesheet} />
                <Route exact path={`${process.env.PUBLIC_URL}/leaders`} component={Leaders} />
                <Route exact path={`${process.env.PUBLIC_URL}/tickets-view`} component={TicketsView} />
                <Route exact path={`${process.env.PUBLIC_URL}/tickets-detail`} component={TicketsDetail} />
                <Route exact path={`${process.env.PUBLIC_URL}/clients`} component={Clients} />
                <Route exact path={`${process.env.PUBLIC_URL}/client-profile`} component={ClientProfile} />
                <Route exact path={`${process.env.PUBLIC_URL}/members`} component={Members} />
                <Route exact path={`${process.env.PUBLIC_URL}/members-profile`} component={EmployeeProfile} />
                <Route exact path={`${process.env.PUBLIC_URL}/holidays`} component={Holidays} />
                <Route exact path={`${process.env.PUBLIC_URL}/attendance-employees`} component={AttendanceEmployees} />
                <Route exact path={`${process.env.PUBLIC_URL}/attendance`} component={Attendance} />
                <Route exact path={`${process.env.PUBLIC_URL}/leave-request`} component={LeaveRequest} />
                <Route exact path={`${process.env.PUBLIC_URL}/department`} component={Departments} />
                <Route exact path={`${process.env.PUBLIC_URL}/invoices`} component={Invoices} />
                <Route exact path={`${process.env.PUBLIC_URL}/payments`} component={Payments} />
                <Route exact path={`${process.env.PUBLIC_URL}/expenses`} component={Expenses} />
                <Route exact path={`${process.env.PUBLIC_URL}/employee-salary`} component={Salaryslip} />
                <Route exact path={`${process.env.PUBLIC_URL}/calander`} component={Calendar} />
                <Route exact path={`${process.env.PUBLIC_URL}/chat-app`} component={ChatApp} />
                <Route exact path={`${process.env.PUBLIC_URL}/apex-charts`} component={ApexCharts} />
                <Route exact path={`${process.env.PUBLIC_URL}/forms-example`} component={FormsExample} />
                <Route exact path={`${process.env.PUBLIC_URL}/table-example`} component={TablesExample} />
                <Route exact path={`${process.env.PUBLIC_URL}/reviews-page`} component={ReviewsPage} />
                <Route exact path={`${process.env.PUBLIC_URL}/icons`} component={Icons} />
                <Route exact path={`${process.env.PUBLIC_URL}/widgets`} component={Widgets} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-alerts`} component={Alerts} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-badge`} component={Badges} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-breadcrumb`} component={Breadcrumb} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-buttons`} component={Buttons} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-card`} component={Cards} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-carousel`} component={Carousel} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-collapse`} component={Collapse} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-dropdowns`} component={Dropdowns} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-listgroup`} component={ListGroup} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-modalui`} component={ModalUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-navsui`} component={NavsUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-navbarui`} component={NavbarUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-paginationui`} component={PaginationUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-popoversui`} component={PopoversUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-progressui`} component={ProgressUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-Scrollspyui`} component={Scrollspy} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-spinnersui`} component={SpinnersUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/ui-toastsui`} component={ToastsUI} />
                <Route exact path={`${process.env.PUBLIC_URL}/stater-page`} component={StaterPage} />
                <Route exact path={`${process.env.PUBLIC_URL}/documentation`} component={Documentation} />
                <Route exact path={`${process.env.PUBLIC_URL}/changelog`} component={Changelog} />
                <Route exact path={`${process.env.PUBLIC_URL}/help`} component={Help} />
                <Route exact path={`${process.env.PUBLIC_URL}/manage-users`} component={ManageUsers} />
                <Route exact path={`${process.env.PUBLIC_URL}/manage-roles`} component={ManageRoles} />
            </div>
        </div>
    )
}


export default MainIndex;