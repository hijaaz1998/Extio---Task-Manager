import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from '../components/common/Header';
import PageHeader1 from '../components/common/PageHeader1';
import { useSelector } from 'react-redux';
import { selectPermissions } from '../redux/slices/userSlice';
import menuData from '../components/Data/menu.json';

// Import all components dynamically
import HrDashboard from './Dashboard/HrDashboard';
import ProjectDashboard from './Dashboard/ProjectDashboard';
import ManageUsers from './UserManagement/ManageUsers';
import ManageRoles from './UserManagement/ManageRoles';
import Expenses from './Accounts/Expenses';
import Invoices from './Accounts/Invoices';
import Payments from './Accounts/Payments';
import Attendance from './Employee/Attendance';
import AttendanceEmployees from './Employee/AttendanceEmployees';
import Departments from './Employee/Departments';
import EmployeeProfile from './Employee/EmployeeProfile';
import Holidays from './Employee/Holidays';
import LeaveRequest from './Employee/LeaveRequest';
import Members from './Employee/Members';
import ClientProfile from './Our Clients/ClientProfile';
import Clients from './Our Clients/Clients';
import Salaryslip from './Payroll/Salaryslip';
import Leaders from './Projects/Leaders';
import Projects from './Projects/Projects';
import Tasks from './Projects/Tasks';
import Timesheet from './Projects/Timesheet';
import TicketsDetail from './Tickets/TicketsDetail';
import TicketsView from './Tickets/TicketsView';
import Alerts from './UIComponents/Alerts';
import Calendar from './App/Calendar';
import ChatApp from './App/ChatApp';
import ApexCharts from './OtherPages/ApexCharts';
import FormsExample from './OtherPages/FormsExample';
import TablesExample from './OtherPages/TablesExample';
import ReviewsPage from './OtherPages/ReviewsPage';
import Icons from './OtherPages/Icons';
import Widgets from './OtherPages/Widgets';
import Badges from './UIComponents/Badges';
import Breadcrumb from './UIComponents/Breadcrumb';
import Buttons from './UIComponents/Buttons';
import Cards from './UIComponents/Cards';
import Carousel from './UIComponents/Carousel';
import Collapse from './UIComponents/Collapse';
import Dropdowns from './UIComponents/Dropdowns';
import ListGroup from './UIComponents/ListGroup';
import ModalUI from './UIComponents/ModalUI';
import NavsUI from './UIComponents/NavsUI';
import NavbarUI from './UIComponents/NavbarUI';
import PaginationUI from './UIComponents/PaginationUI';
import PopoversUI from './UIComponents/PopoversUI';
import ProgressUI from './UIComponents/ProgressUI';
import Scrollspy from './UIComponents/Scrollspy';
import SpinnersUI from './UIComponents/SpinnersUI';
import ToastsUI from './UIComponents/ToastsUI';
import StaterPage from './Stater/StaterPage';
import Documentation from './Documentation/Documentation';
import Changelog from './Changelog/Changelog';
import Help from './Dashboard/Help';
import Page404 from '../components/Auth/Page404';


function MainIndex(props) {
  const { activekey } = props;
  const permissions = useSelector(selectPermissions);

  const filterRoutes = (menu) => {
    const filteredRoutes = [];

    const filterMenu = (items) => {
      items.forEach(item => {
        if (permissions.includes(item.identifier)) {
          filteredRoutes.push({
            ...item,
            component: getComponent(item.identifier)
          });
        }

        if (item.children && item.children.length > 0) {
          filterMenu(item.children);
        }
      });
    };

    filterMenu(menu);

    return filteredRoutes;
  };

  const filteredRoutes = filterRoutes(menuData.menu);

  return (
    <div className="main px-lg-4 px-md-4">
      {activekey !== "/chat-app" ? (activekey === "/documentation" ? <PageHeader1 /> : <Header />) : ""}
      <div className="body d-flex py-lg-3 py-md-2">
        <Switch>
          {/* Render child routes */}
          {filteredRoutes.map(item => (
            <Route
              key={item.routerLink[0]}
              exact
              path={`${process.env.PUBLIC_URL}/${item.routerLink[0]}`}
              component={item.component}
            />
          ))}
          {/* Redirect parent routes to StaterPage */}
          {filteredRoutes.filter(item => item.children && item.children.length > 0).map(item => (
            <Redirect key={item.routerLink[0]} exact from={`${process.env.PUBLIC_URL}/${item.routerLink[0]}`} to={`${process.env.PUBLIC_URL}/stater-page`} />
          ))}
          <Route component={Page404} />
        </Switch>
      </div>
    </div>
  );
}

const getComponent = (identifier) => {
  switch (identifier) {
    case 'Hr Dashboard':
      return HrDashboard;
    case 'Project Dashboard':
      return ProjectDashboard;
    case 'Manage Users':
      return ManageUsers;
    case 'Manage Roles':
      return ManageRoles;
    case 'Expenses':
      return Expenses;
    case 'Invoices':
      return Invoices;
    case 'Payments':
      return Payments;
    case 'Attendance':
      return Attendance;
    case 'Attendance Employees':
      return AttendanceEmployees;
    case 'Departments':
      return Departments;
    case 'Employee Profile':
      return EmployeeProfile;
    case 'Holidays':
      return Holidays;
    case 'Leave Request':
      return LeaveRequest;
    case 'Members':
      return Members;
    case 'Client Profile':
      return ClientProfile;
    case 'Clients':
      return Clients;
    case 'Salary Slip':
      return Salaryslip;
    case 'Leaders':
      return Leaders;
    case 'Projects':
      return Projects;
    case 'Tasks':
      return Tasks;
    case 'Timesheet':
      return Timesheet;
    case 'Tickets Detail':
      return TicketsDetail;
    case 'Tickets View':
      return TicketsView;
    case 'Alerts':
      return Alerts;
    case 'Calendar':
      return Calendar;
    case 'Chat App':
      return ChatApp;
    case 'Apex Charts':
      return ApexCharts;
    case 'Forms Example':
      return FormsExample;
    case 'Tables Example':
      return TablesExample;
    case 'Reviews Page':
      return ReviewsPage;
    case 'Icons':
      return Icons;
    case 'Widgets':
      return Widgets;
    case 'Badges':
      return Badges;
    case 'Breadcrumb':
      return Breadcrumb;
    case 'Buttons':
      return Buttons;
    case 'Cards':
      return Cards;
    case 'Carousel':
      return Carousel;
    case 'Collapse':
      return Collapse;
    case 'Dropdowns':
      return Dropdowns;
    case 'List Group':
      return ListGroup;
    case 'Modal UI':
      return ModalUI;
    case 'Navs UI':
      return NavsUI;
    case 'Navbar UI':
      return NavbarUI;
    case 'Pagination UI':
      return PaginationUI;
    case 'Popovers UI':
      return PopoversUI;
    case 'Progress UI':
      return ProgressUI;
    case 'Scrollspy':
      return Scrollspy;
    case 'Spinners UI':
      return SpinnersUI;
    case 'Toasts UI':
      return ToastsUI;
    case 'Stater Page':
      return StaterPage;
    case 'Documentation':
      return Documentation;
    case 'Changelog':
      return Changelog;
    case 'Help':
      return Help;
    default:
      return Page404;
  }
};

export default MainIndex;
