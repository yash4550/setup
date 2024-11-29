import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [sidenavColor, setSidenavColor] = useState("#1890ff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(false);
  const [toggle, setToggle] = useState(true); // Toggle state for sidenav visibility

  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  console.log(pathname, "Current Page");

  return (
    <Layout
      className={`layout-dashboard ${pathname === "profile" ? "layout-profile" : ""
        } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      {/* Sidenav */}
      {toggle && ( // Render Sidenav only if toggle is true
        <Sider
          width={300}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${sidenavType === "#fff" ? "active-route" : ""
            }`}
          style={{
            background: sidenavType,
            position: "fixed", // Keep sidenav fixed
            height: "100vh", // Full height for the sidenav
            left: 0, // Always docked to the left
          }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
      )}

      {/* Main Content Layout */}
      <Layout style={{ marginLeft: toggle ? 300 : 0 }}> {/* Adjust content margin based on toggle */}
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                setToggle={() => setToggle((prev) => !prev)} // Toggle the sidenav
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              setToggle={() => setToggle((prev) => !prev)} // Toggle the sidenav
            />
          </AntHeader>
        )}
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
