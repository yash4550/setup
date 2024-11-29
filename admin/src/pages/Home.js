import React, { useEffect, useState } from "react";
import Main from "../components/layout/Main";
import { Col, Row, Card, Spin } from "antd";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import { useNavigate } from "react-router-dom";
import schoolLogo from "../assets/images/icon/government.svg"; // Add your school logo path
import parentLogo from "../assets/images/icon/user.svg"; // Add your parent logo path

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [numberOfSchools, setNumberOfSchools] = useState(null); // Updated to handle null as initial value
  const [numberOfParents, setNumberOfParents] = useState(0);
  const { request } = useRequest();
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const [viewData, setViewData] = useState(null);

  // Fetch data when `refresh` changes
  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [refresh]);

  // Navigate to view user when `viewData` changes
  useEffect(() => {
    if (!viewData) return;
    navigate(`/view-user/${viewData._id}`);
  }, [viewData, navigate]);

  // Fetch data from the API
  const fetchData = () => {
    request({
      url: `/admin/user/list?status`,
      method: "GET",
      onSuccess: (data) => {
        setLoading(false);
        const schoolData = data?.data?.list;
        if (schoolData?.totalDocs != null) {
          setNumberOfSchools(schoolData.totalDocs); // Fetch totalDocs if available
        } else {
          setNumberOfSchools(0); // Default to 0 if no totalDocs is provided
          ShowToast("No school data available", Severty.WARNING);
        }
      },
      onError: (error) => {
        setLoading(false);
        console.error("Error fetching data:", error);
        setNumberOfSchools(null); // Set to null in case of an error
        ShowToast("Failed to fetch school data", Severty.ERROR);
      },
    });
  };

  const handleCardClick = () => {
    navigate("/SchoolManager");
  };

  const handleCardClick1 = () => {
    navigate("/Parent");
  };

  return (
    <Main>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]} style={{ marginBottom: "24px" }}>
          {/* Schools Card */}
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleCardClick}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={schoolLogo}
                  alt="Schools"
                  style={{
                    height: "60px", // Enlarged logo size
                    marginRight: "20px",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: "60px",
                      fontWeight: "bold",
                      color: "#1890ff",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                      marginRight: "48px"
                    }}
                  >
                    {loading
                      ? "Loading..."
                      : numberOfSchools === null
                      ? "Error"
                      : numberOfSchools}
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginTop: "8px",
                    }}
                  >
                    Total School
                  </h3>
                </div>
              </div>
            </Card>
          </Col>

          {/* Parents Card */}
          <Col span={8}>
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              onClick={handleCardClick1}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={parentLogo}
                  alt="Parents"
                  style={{
                    height: "60px", // Enlarged logo size
                    marginRight: "20px",
                  }}
                />
                <div
                  style={{
                    flexGrow: 1,
                    textAlign: "right",
                  }}
                >
                  <div
                    style={{
                      fontSize: "60px",
                      fontWeight: "bold",
                      color: "#1890ff",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                      marginRight: "50px"
                    }}
                  >
                    {loading ? "Loading..." : numberOfParents}
                  </div>
                  <h3
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                      color: "#333",
                      marginTop: "8px",
                    }}
                  >
                    Total Parents
                  </h3>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Spin>
    </Main>
  );
};

export default Home;
