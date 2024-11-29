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
  InputNumber
} from "antd";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import React, { useState, useContext, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
import useDebounce from "../hooks/useDebounce";
import { ToTopOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;
const Search = Input.Search;

function EmailTemplate() {
  const { request } = useRequest()
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selected, setSelected] = useState();
  const { confirm } = Modal;
  const statusChange = (record) => {
    setLoading(true);
    request({
      url: `/admin/email-template/status-change/${record}`,
      method: 'PUT',
      onSuccess: (data) => {
        setRefresh(prev => !prev)
        setLoading(false);

      },
      onError: (error) => {
        console.log(error)
        ShowToast(error, Severty.ERROR)
      }
    })
  };
  const showConfirm = (record) => {

    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button >Are you sure you want change the status ? </Button>,
        onOk() {
          statusChange(record)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }, 5);

  };

  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Suject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "STATUS",
      filters: [
        {
          text: 'Active',
          value: true,
        },
        {
          text: 'InActive',
          value: false,
        },
      ],
      onFilter: (value, record) => record.is_status === value,
      render: (_, { is_status, _id }) => {
        let color = is_status ? 'green' : 'red';
        return (
          <Tag onClick={(e) => showConfirm(_id)} color={color} key={is_status}>
            {is_status ? "Active" : "Inactive"}
          </Tag>
        );
        // { is_active ? "Active" : "Inactive" }

      },
    },
    {
      title: "Registartion date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (_, { createdAt }) => {

        return (
          new Date(createdAt).toLocaleDateString()
        );
        // { is_active ? "Active" : "Inactive" }

      },

    },
    {
      title: "Action",
      render: (_, record) => {

        return (
          <>
            <div className="cta_wrap">
              <Button className="tb-view" onClick={(e) => { window.location.assign(`/view-email-template/${record._id}`) }}>
                <i class="fa fa-light fa-eye"></i>
                View
              </Button>
              <Button onClick={() => {
                setSelected(record)
                setVisible(true)
              }}>
                <i class="fa fa-light fa-pen"></i>
                Edit
              </Button>
            </div>
          </>

        );
        // { is_active ? "Active" : "Inactive" }

      },

    },
  ];
  const onSearch = (e) => {
    setSearchText(e.target.value)
    setPagination({ current: 1 })
  };
  useEffect(() => {
    setLoading(true)
    fetchData(pagination)
  }, [refresh, debouncedSearchText])


  const fetchData = (pagination, filters) => {
    const filterActive = filters ? filters.is_active : null
    request({
      url: `/admin/email-template/list?status=${filterActive ? filterActive.join(',') : ''}&page=${pagination ? pagination.current : 1}&limit=${pagination ? pagination.pageSize : 10}&search=${debouncedSearchText}`,
      method: 'GET',
      onSuccess: (data) => {
        setLoading(false)
        console.log(data)
        // ShowToast(data.message, Severty.SUCCESS)
        setList(data.data.docs)
        setPagination(prev => ({ current: pagination.current, total: data.data.totalDocs }))
      },
      onError: (error) => {
        ShowToast(error, Severty.ERROR)
      }
    })

  }

  const handleChange = (pagination, filters) => {
    console.log(pagination, filters);
    fetchData(pagination, filters);
  }
  // useEffect(() => {
  //   setLoading(true)
  //   request({
  //     url: '/admin/psychologist/list',
  //     method: 'GET',
  //     onSuccess: (data) => {
  //       setLoading(false)
  //       ShowToast(data.message, Severty.SUCCESS)
  //       setList(data.data.list.docs)
  //     },
  //   })
  // }, [refresh, debouncedSearchText])
  return (
    <Main>
      <div className="tabled">
        <Row>
          <Col xs="24" md={24} lg={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Email Template Management"
              extra={
                <>
                  <Search
                    size="large"
                    onChange={onSearch}
                    value={searchText}
                    onPressEnter={onSearch}
                  />
                  {/* <Button onClick={() => setVisible(true)}>Add Psychologist</Button> */}
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  loading={loading}
                  columns={columns}
                  dataSource={list}
                  pagination={pagination}
                  onChange={handleChange}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      {visible && <AddFrom show={visible} hide={() => { setSelected(); setVisible(false) }} data={selected} refresh={() => setRefresh(prev => !prev)} />}
    </Main>
  );
}
const AddFrom = ({ show, hide, data, refresh }) => {
  const [form] = Form.useForm();
  const { request } = useRequest()
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('');
  useEffect(() => {
    if (!data) return
    form.setFieldsValue({ ...data })
    setContent(data.body)
  }, [data])
  const handleContentChange = (newContent) => {
    setContent(newContent);
  };
  const onCreate = (values) => {
    const { body, name, subject } = values
    const payload = {}
    setLoading(true)
    payload.description = body
    payload.name = name
    payload.subject = subject
    request({
      url: `${data ? `/admin/email-template/edit-email-template/${data._id}` : `/admin/email-template/add-email-template`}`,
      // url: '/admin/expact/add-expact',
      method: `${data ? 'PUT' : 'POST'}`,
      data: payload,
      onSuccess: (data) => {
        setLoading(false)
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS)
          hide()
          refresh()
          // hide()
        } else {
          ShowToast(data.message, Severty.ERROR)

        }
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR)
        // console.log(error.response.data, "Error")
        setLoading(false)
      },
    })
  };
  return (
    <Modal
      visible={show}
      title={`${data ? 'Edit' : 'Create'}`}
      okText="Ok"
      onCancel={hide}
      okButtonProps={{
        form: 'create',
        htmlType: 'submit',
        loading: loading,
      }}
    >
      <Form id="create" form={form} onFinish={onCreate} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the name!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input the subject!" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Body"
              name="body"
              rules={[
                { required: true, message: "Please Enter the  body!" }
              ]}
            >
              <ReactQuill value={content} onChange={handleContentChange} />
              {/* <TextArea rows={4} /> */}
              {/* <Input type="textarea" /> */}
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>

  )
}

export default EmailTemplate;
