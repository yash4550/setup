import {
  Row,
  Col,
  Card,
  Input,
} from "antd";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
function ViewEmailTemplate() {
  const { request } = useRequest()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    setLoading(true)
    fetchData(params.id)
  }, [])
  const fetchData = (id) => {
    request({
      url: `/admin/email-template/view/${id}`,
      method: 'PUT',
      onSuccess: (data) => {
        setLoading(false)
        setList(data.data)
      },
      onError: (error) => {
        ShowToast(error, Severty.ERROR)
      }
    })
  }


  return (
    <Main>
      <Card title="Content Details">
        <Row gutter={16}>
          <Col span={12} xs={24} md={12}>
            <div className="view-main-list">
              <div className="view-inner-cls">
                <h5>Title:</h5>
                <h6>{list ? list.name : '--'}</h6>
              </div>
              <div className="view-inner-cls">
                <h5>Subject:</h5>
                <h6>{list ? list.subject : '--'}</h6>
              </div>
              <div className="view-inner-cls">
                <h5>Status </h5>
                <h6>{list ? list.is_status ? "Active" : "Inactive" : "--"}</h6>
              </div>
            </div>
          </Col>


        </Row>

      </Card>
      <Card>
        <Row gutter={16}>
          <Col span={24} xs={24} md={24}>
            <div className="view-main-list">

              <h6>Description :</h6>
              <h5 dangerouslySetInnerHTML={{ __html: list ? list.body : '--' }}></h5>


            </div>
          </Col>


        </Row>
      </Card>


    </Main>
  );
}


export default ViewEmailTemplate;
