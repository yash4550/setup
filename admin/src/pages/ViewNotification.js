import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Space,
  Descriptions
} from "antd";
import { SearchOutlined } from '@ant-design/icons';
// import Highlighter from 'react-highlight-words';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React, { useState, useContext, useEffect, useRef } from "react";
import { ToTopOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Link, useParams, useRevalidator } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
import useDebounce from "../hooks/useDebounce";
const Search = Input.Search;
function ViewNotification() {
  const [searchText, setSearchText] = useState('');
  const { request } = useRequest()
  const [list, setList] = useState([])
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    setLoading(true)
    fetchData(params.id)
  }, [])




  const fetchData = (id) => {
    request({
      url: `/admin/notification/view-notification/${id}`,
      method: 'PUT',
      onSuccess: (data) => {
        setLoading(false)
        setList(data.data)
        setUser(data.data.user.length > 0 && data.data.user.map(obj => obj.name).join(', '));
      },
      onError: (error) => {
        ShowToast(error, Severty.ERROR)
      }
    })
  }


  return (
    <Main>
      <Card title="Notification Details">
        <Row gutter={16}>
          <Col span={12} xs={24} md={12}>
            <div className="view-main-list">
              <div className="view-inner-cls">
                <h5>Title:</h5>
                <h6>{list ? list.title : '--'}</h6>
              </div>
              <div className="view-inner-cls">
                <h5>Message:</h5>
                <h6>{list ? list.message : '--'}</h6>
              </div>
              <div className="view-inner-cls">
                <h5>Notification Type:</h5>
                <h6>{list ? list.notificationtype : '--'}</h6>
              </div>

            </div>
          </Col>
          <Col span={12} xs={24} md={12}>
            <div className="view-main-list">
              <div className="view-inner-cls">
                <h5>User Type </h5>
                <h6>{list ? list.type : "--"}</h6>
              </div>
              <div className="view-inner-cls">
                <h5>User:</h5>
                <h6>
                  {list.allUser ? "All " + list.type : user ? user : "All"}
                </h6>
              </div>

            </div>
          </Col>


        </Row>

      </Card>



    </Main>
  );
}


export default ViewNotification;
