import React, { useState, useEffect } from "react";
import { Row, Col, Card, Spin, Empty } from "antd";
import { useParams } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";

function ViewNotification() {
  const { request } = useRequest();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    request({
      url: `/admin/notification/list`,
      method: 'GET',
      onSuccess: (data) => {
        setLoading(false);
        setList(data.data.docs); // Assuming 'docs' contains the array of notifications
      },
      onError: (error) => {
        setLoading(false);
        ShowToast(error, Severty.ERROR);
      },
    });
  };

  return (
    <Main>
      <Card title="Notification Details" className="notification-card">
        {loading ? ( // Display Spin while loading
          <Spin size="large" />
        ) : list.length > 0 ? ( // Render notification data if available
          <Row gutter={[12]}>
            {list.map((item) => (
              <Col span={24}  key={item._id}>
                <div className="view-main-list">
                  <div className="view-inner-cls">
                    <h5>Title:</h5>
                    <h6>{item.title || '--'}</h6>
                  </div>
                  <div className="view-inner-cls">
                    <h5>Message:</h5>
                    <h6>{item.message || '--'}</h6>
                  </div>
                  <div className="view-inner-cls">
                    <h5>Notification Type:</h5>
                    <h6>{item.notificationtype || '--'}</h6>
                  </div>
                  <div className="view-inner-cls">
                    <h5>User Type:</h5>
                    <h6>{item.type || '--'}</h6>
                  </div>
                  <div className="view-inner-cls">
                    <h5>User:</h5>
                    <h6>{item.allUser ? `All ${item.type}` : (item.user.length > 0 ? item.user.map(obj => obj.name).join(', ') : 'All')}</h6>
                  </div>
                  {/* Add more fields here as needed */}
                </div>
              </Col>
            ))}
          </Row>
        ) : ( // Display Empty state if no data
          <Empty description="No notifications found" />
        )}
      </Card>
    </Main>
  );
}

export default ViewNotification;
