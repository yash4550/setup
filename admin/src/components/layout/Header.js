import { useState, useEffect, useContext } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Upload as UploadAntd,
  message,
  Badge,
} from "antd";
import {
  DownOutlined,
  KeyOutlined,
  LogoutOutlined,
  UploadOutlined,
  UserOutlined,
  BellOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";


import notfound from "../../assets/images/not_found.png";
import { NavLink } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import { Severty, ShowToast } from "../../helper/toast";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useRequest from "../../hooks/useRequest";

const Search = Input.Search;
const toggler = [
  <svg
    width="20"
    height="20"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    key={0}
  >
    <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
  </svg>,
];

function Header({ onPress, setToggle }) {
  const [visible, setVisible] = useState(false);
  const [profile, setProfile] = useState({});
  const [selected, setSelected] = useState();
  const [profileVisible, setProfileVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [appSettingVisible, setAppSettingVisible] = useState(false);
  const { logout } = useContext(AuthContext);
  const [searchText, setSearchText] = useState("");
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [refresh, setRefresh] = useState(false)
  const { request } = useRequest();

  const onSearch = (e) => {
    setSearchText(e.target.value);
  };

  const Navigate = useNavigate();

  const items = [
    {
      label: "Manage Profile",
      key: "1",
      icon: <UserOutlined />,
      danger: true,
    },
    {
      label: "Change Password",
      key: "2",
      icon: <KeyOutlined />,
      danger: true,
    },
    {
      label: "Logout",
      key: "3",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  useEffect(() => {
    
    request({
      url: "/admin/auth/get-profile",
      method: "GET",
      onSuccess: (data) => {
        console.log(data);
        // ShowToast(data.message, Severty.SUCCESS)
        setProfile(data.data);
        setSelected(data.data);
      },
      onError: (error) => {
        console.log(error);
        ShowToast(error, Severty.ERROR);
      },
    });

    if (!isOpen) return document.body.classList.remove("edit-dropdown");
    document.body.classList.add("edit-dropdown");

    

    return () => {
      document.body.classList.remove("edit-dropdown");
    };
  }, [isOpen]);

  const showDeleteConfirm = () => {
    setIsLogoutModalVisible(true);
  };

  const handleMenuClick = (e) => {
    setIsOpen(false);
    if (e.key == 2) {
      Navigate("/profile");
      setVisible(true);
    }
    if (e.key == 1) {
      Navigate("/profile");
      setProfileVisible(true);
    }
    if (e.key == 4) {
      setAppSettingVisible(true);
    }
    if (e.key == 3) {
      showDeleteConfirm();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const toggleNotifications = () => {
    setIsNotificationOpen((prev) => !prev);
  };

  return (
    <>
      <Row className="align-items-center">
        <Col span={24} xs={14} md={6}>
          <div className="toggale-headr">
            <div className="">
              <Button
                type="link"
                className="sidebar-toggler ps-0 d-none d-lg-block"
                onClick={() => setToggle()}
              >
                {toggler}
              </Button>
            </div>
            <div className="tabLogo ">
              <h4>School Management</h4>
            </div>
          </div>
        </Col>
        <Col span={24} xs={10} md={18} className="header-control">
          <Button
            type="link"
            className="sidebar-toggler"
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <div className="profileDropdownMain d-flex align-items-center gap-3">
            {/* Notification Bell */}
            <Badge count={notifications.length}>
              <BellOutlined
                className="notification-bell"
                onClick={toggleNotifications}
                style={{ fontSize: "20px", cursor: "pointer" }}
              />
            </Badge>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <Card
                className="notification-card"
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "20px",
                  zIndex: 1000,
                  width: "300px",
                }}
              >
                {notifications.length ? (
                  notifications.map((note, index) => (
                    <p key={index} style={{ marginBottom: "10px" }}>
                      {note}
                    </p>
                  ))
                ) : (
                  <p>No notifications</p>
                )}
              </Card>
            )}


             {/* Avatar Section */}
             <Row justify="center" align="middle" gutter={[24]}>
                  <Col span={24}>
                    <Avatar.Group>
                      <Avatar
                        size={74}
                        shape="circle"
                        src={profile?.profilePic}
                        alt="User Avatar"
                        setProfile= {visible}
                      
                      />
                    </Avatar.Group>
                  </Col>
                </Row>


            {/* User Dropdown */}
            <Dropdown
              open={isOpen}
              onOpenChange={setIsOpen}
              className="edit-box"
              menu={menuProps}
              trigger={["click"]}
              
            >
              <div className="d-flex align-items-center gap-2">
                {/* Ellipsis Icon for Dropdown Trigger */}
                <div>
                  <EllipsisOutlined
                    style={{ fontSize: "24px", cursor: "pointer" }}
                  />
                </div>

               

                {/* Username Section */}
                <div className="d-none d-xl-block">
                  <div className="userName">{}</div>
                </div>
              </div>
            </Dropdown>
          </div>
        </Col>
      </Row>
      {isLogoutModalVisible && (
        <DeleteModal
          title={"Logout"}
          subtitle={`Are you sure you want to logout?`}
          show={isLogoutModalVisible}
          hide={() => {
            setIsLogoutModalVisible(false);
          }}
          onOk={() => {
            ShowToast("Logout Successfully!", Severty.SUCCESS);
            logout();
          }}
        />
      )}
    </>
  );
}

export default Header;
