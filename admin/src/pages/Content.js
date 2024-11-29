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
import { ToTopOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;
const Search = Input.Search;
function Content() {
  const { request } = useRequest()
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const [visibleView, setVisibleView] = useState(false);
  const [viewData, setViewData] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selected, setSelected] = useState();
  const navigate = useNavigate()
  const { confirm } = Modal;
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
  const statusChange = (record) => {
    setLoading(true);
    request({
      url: `/admin/content/status-change/${record}?`,
      method: 'PUT',
      onSuccess: (data) => {
        setLoading(false);
        setRefresh(prev => !prev)
      },
      onError: (error) => {
        console.log(error)
        ShowToast(error, Severty.ERROR)
      }
    })
  };
  useEffect(() => {
    if (!visibleView) return
    navigate(`/view-content/${viewData._id}`)
  }, [visibleView])


  const columns = [
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
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
              <Button className="tb-view" onClick={(e) => { setVisibleView(true); setViewData(record) }}>
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
      url: `/admin/content/list?status=${filterActive ? filterActive.join(',') : ''}&page=${pagination ? pagination.current : 1}&limit=${10}&search=${debouncedSearchText}`,
      method: 'GET',
      onSuccess: (data) => {
        setLoading(false)
        // ShowToast(data.message, Severty.SUCCESS)
        setList(data.data.list.docs)
        setPagination(prev => ({ current: pagination.current, total: data.data.list.totalDocs }))
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
  return (
    <Main>
      <div className="tabled">
        <Row>
          <Col xs="24" md={24} lg={24} xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Content Management"
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
    setContent(data.description)
  }, [data])
  const onCreate = (values) => {
    const { description, name } = values
    const payload = {}
    setLoading(true)
    payload.description = description
    payload.name = name
    request({
      url: `${data ? `/admin/content/edit-content/${data._id}` : `/admin/content/add-content`}`,
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


  const handleContentChange = (newContent) => {
    setContent(newContent);
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
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please Enter the  description!" }
              ]}
            >
              <ReactQuill value={content} onChange={handleContentChange} />
              {/* <TextArea rows={4} /> */}

            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>

  )
}

export default Content;
