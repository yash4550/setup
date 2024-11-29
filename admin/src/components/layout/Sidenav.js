
import { useState } from "react";
import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import Dashboard01 from "../../assets/images/icon/dashboard.svg";
import Loyalty from "../../assets/images/icon/loyalty.svg";
import Notification from "../../assets/images/icon/notification.svg";
import Content from "../../assets/images/icon/content.svg";
import Email from "../../assets/images/icon/email.svg";
import Profile from "../../assets/images/icon/profile.svg";



function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");
  return (
    <>
      <div className="brand">
        <a href="/">
          {/* <img src={logo} alt="" /> */}
          <span>School Management System</span>
        </a>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? color : "",
              }}
            >
              <img src={Dashboard01} />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="11">
          <NavLink to="/SchoolManager">
            <span
              className="icon"
              style={{
                background: page === "SchoolManager" ? color : "",
              }}
            >
              <i class="fas fa-file"></i>
            </span>
            <span className="label">School Manager</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="11">
          <NavLink to="/Parent">
            <span
              className="icon"
              style={{
                background: page === "Parent Manager" ? color : "",
              }}
            >
              <i class="fas fa-file"></i>
            </span>
            <span className="label">Parent Manager</span>
          </NavLink>
        </Menu.Item>
        
        
        <Menu.Item key="13">
          <NavLink to="/notification-manager">
            <span
              className="icon"
              style={{
                background: page === "notification-manager" ? color : "",
              }}
            >
              <img src={Notification} />
            </span>
            <span className="label">Notification Manager</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="16">
          <NavLink to="/content-manager">
            <span
              className="icon"
              style={{
                background: page === "content-manager" ? color : "",
              }}
            >
              <img src={Content} />
            </span>
            <span className="label">Content Manager</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="17">
          <NavLink to="/email-template-manager">
            <span
              className="icon"
              style={{
                background: page === "email-template-manager" ? color : "",
              }}
            >
              <img src={Email} />
            </span>
            <span className="label">Email Templates</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="5">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? color : "",
              }}
            >
              <i class="fas fa-user-circle"></i>
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>


      </Menu >

    </>
  );
}

export default Sidenav;
