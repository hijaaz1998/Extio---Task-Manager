import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import menu from "../Data/menu.json";
import menu2 from "../Data/menu2.json";
import { useSelector } from "react-redux";

function Sidebar(props) {
  const [isSidebarMini, setIsSidebarMini] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [darkLightMode, setDarkLightMode] = useState("light");
  const [updateRtl, setUpdateRtl] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});

  const permissions = useSelector((state) => state.user.user?.permissions || []);
  const history = useHistory();

  useEffect(() => {
    // Initialize any theme or mode settings
    document.documentElement.setAttribute("data-theme", "light");

    // Recursive function to filter menu items based on children identifiers
    const filterMenuItems = (items) => {
      return items.reduce((filtered, item) => {
        if (item.children && item.children.length > 0) {
          // Filter children based on permissions
          const filteredChildren = item.children.filter((child) =>
            permissions.includes(child.identifier)
          );

          // Include parent if any children match permissions
          if (filteredChildren.length > 0) {
            filtered.push({ ...item, children: filteredChildren });
          }
        } else if (permissions.includes(item.identifier)) {
          filtered.push(item);
        }
        return filtered;
      }, []);
    };

    // Filter menu data based on permissions
    const filteredMenu = filterMenuItems(menu.menu);

    setMenuData(filteredMenu);
  }, [permissions]);

  // Function to change menu based on selection
  function GotoChangeMenu(val) {
    if (val === "UI Components") {
      history.push("ui-alerts");
      setMenuData([...menu2.menu2]);
    } else {
      history.push("hr-dashboard");
      setMenuData([...menu.menu]);
    }
  }

  // Function to toggle dark/light mode
  function onChangeDarkMode() {
    if (document.documentElement.getAttribute("data-theme") === "light") {
      document.documentElement.setAttribute("data-theme", "dark");
      setDarkLightMode("dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      setDarkLightMode("light");
    }
  }

  // Function to toggle RTL mode
  function onChangeRTLMode() {
    if (document.body.classList.contains("rtl_mode")) {
      document.body.classList.remove("rtl_mode");
    } else {
      document.body.classList.add("rtl_mode");
    }
    setUpdateRtl(!updateRtl);
  }

  // Function to toggle menu expansion
  function toggleMenu(index) {
    if (menuData[index].children && menuData[index].children.length > 0) {
      setExpandedMenus((prevExpandedMenus) => ({
        ...prevExpandedMenus,
        [index]: !prevExpandedMenus[index],
      }));
    }
  }

  return (
    <div
      id="mainSideMenu"
      className={`sidebar px-4 py-4 py-md-5 me-0 ${
        isSidebarMini ? "sidebar-mini" : ""
      }`}
    >
      <div className="d-flex flex-column h-100">
        <Link to="hr-dashboard" className="mb-0 brand-icon">
          <span className="logo-icon">
            <svg
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-clipboard-check"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"
              ></path>
              <path
                d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
              ></path>
              <path
                d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
              ></path>
            </svg>
          </span>
          <span className="logo-text">My-Task</span>
        </Link>
        <ul className="menu-list flex-grow-1 mt-3">
          {menuData.map((d, i) => (
            <li key={"menu-item-" + i}>
              {d.routerLink ? (
                <Link
                  to={process.env.PUBLIC_URL + "/" + d.routerLink[0]}
                  className={`m-link ${
                    d.routerLink[0] === props.activekey ? "active" : ""
                  }`}
                  onClick={(e) => {
                    if (!d.children || d.children.length === 0) {
                      e.preventDefault();
                      return;
                    }
                    toggleMenu(i);
                  }}
                >
                  <i className={d.iconClass}></i>
                  <span>{d.name}</span>
                  {d.children && d.children.length > 0 && (
                    <span
                      className={`arrow icofont-dotted-down ms-auto text-end fs-5 ${
                        expandedMenus[i] ? "rotate-90" : ""
                      }`}
                    ></span>
                  )}
                </Link>
              ) : (
                <div className="m-link">
                  <i className={d.iconClass}></i>
                  <span>{d.name}</span>
                  {d.children && d.children.length > 0 && (
                    <span
                      className={`arrow icofont-dotted-down ms-auto text-end fs-5 ${
                        expandedMenus[i] ? "rotate-90" : ""
                      }`}
                    ></span>
                  )}
                </div>
              )}

              {/* Render sub-menu if children exist */}
              {d.children && d.children.length > 0 && (
                <ul
                  className={`sub-menu collapse has-children ${
                    expandedMenus[i] ? "show" : ""
                  }`}
                >
                  {d.children.map((data, ind) => (
                    <li key={"sub-menu-item-" + ind}>
                      <Link
                        className={`ms-link ${
                          props.activekey === "/" + data.routerLink[0]
                            ? "active"
                            : ""
                        }`}
                        to={process.env.PUBLIC_URL + "/" + data.routerLink[0]}
                      >
                        <span>{data.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
        {/* Theme and RTL mode toggles */}
        <ul className="list-unstyled mb-0">
          <li className="d-flex align-items-center justify-content-center">
            <div className="form-check form-switch theme-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkLightMode === "dark"}
                id="theme-switch"
                onChange={() => onChangeDarkMode()}
              />
              <label className="form-check-label" htmlFor="theme-switch">
                Enable Dark Mode!
              </label>
            </div>
          </li>
          <li className="d-flex align-items-center justify-content-center">
            <div className="form-check form-switch theme-rtl">
              <input
                className="form-check-input"
                type="checkbox"
                checked={document.body.classList.contains("rtl_mode")}
                id="theme-rtl"
                onChange={() => onChangeRTLMode()}
              />
              <label className="form-check-label" htmlFor="theme-rtl">
                Enable RTL Mode!
              </label>
            </div>
          </li>
        </ul>
        {/* Sidebar mini toggle button */}
        <button
          type="button"
          className="btn btn-link sidebar-mini-btn text-light"
          onClick={() => {
            setIsSidebarMini(!isSidebarMini);
          }}
        >
          <span className="ms-2">
            <i className="icofont-bubble-right"></i>
          </span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
