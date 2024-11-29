import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Checkbox
} from "antd";
import React, { useState, useEffect } from "react";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
import useDebounce from "../hooks/useDebounce";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const Search = Input.Search;
const { Option } = Select;

function Notification() {
  const { request } = useRequest()
  const [searchText, setSearchText] = useState('');
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [list, setList] = useState([])
  const [refresh, setRefresh] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false);
  const debouncedSearchText = useDebounce(searchText, 300);
  const [selected, setSelected] = useState();








  // useEffect(() => {
  //   if (!visibleView) return
  //   navigate()
  // }, [visibleView])


  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "User Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Notification Type",
      dataIndex: "notificationtype",
      key: "notificationtype",
    },
    {
      title: "User",
      render: (_, { user, allUser, type }) => {
        return (
          <div>
            {allUser ? "All " + type : user.map(obj => obj.name).join(', ') ? user.map(obj => obj.name).join(', ') : '---'}
          </div>

        );
        // { is_active ? "Active" : "Inactive" }

      },
    },

    // {
    //   title: "Registartion date",
    //   key: "created_at",
    //   dataIndex: "created_at",
    //   render: (_, { created_at }) => {

    //     return (
    //       new Date(created_at).toLocaleDateString()
    //     );
    //     // { is_active ? "Active" : "Inactive" }

    //   },

    // },
    {
      title: "Action",
      render: (_, record) => {
        return (
          <Button className="tb-view" onClick={(e) => { window.location.assign(`/view-notification/${record._id}`) }
          }>
            <i class="fa fa-light fa-eye"></i>
            View
          </Button >
        )
      }
    }

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
      url: `/admin/notification/list?status=${filterActive ? filterActive.join(',') : ''}&page=${pagination ? pagination.current : 1}&limit=${pagination ? pagination.pageSize : 10}&search=${debouncedSearchText}`,
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
              title="Notification Management"
              extra={
                <>
                  <Search
                    size="large"
                    onChange={onSearch}
                    value={searchText}
                    onPressEnter={onSearch}
                  />
                  <Button onClick={() => setVisible(true)}>Add Notification</Button>
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
  const [selectType, setSelectType] = useState("All");
  const [selectUser, setSelectUser] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    if (!data) return
    form.setFieldsValue({ ...data })
  }, [data])
  const onCreate = (values) => {
    setLoading(true)
    console.log(values, selectUser, "yuio")
    const { title, message, type, notificationtype } = values
    const payload = {}
    payload.title = title
    payload.message = message
    payload.type = selectType ? selectType : "All"
    payload.selectUser = selectUser.length > 0 ? selectUser : []
    payload.allUser = selectAll
    payload.notificationtype = notificationtype
    request({
      url: `${data ? `/admin/notification/edit-notification/${data._id}` : `/admin/notification/add-notification`}`,
      // url: '/admin/expact/add-expact',
      method: `${data ? 'PUT' : 'POST'}`,
      data: payload,
      onSuccess: (data) => {
        setLoading(false)
        if (data.status) {
          // ShowToast(data.message, Severty.SUCCESS)
          // hide()
          refresh()
          hide()
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



  const handleSelectAll = (e) => {
    const allUserIds = userList.map((user) => user._id);
    setSelectUser(e.target.checked ? allUserIds : []);
    setSelectAll(e.target.checked);
  };
  const handleTypeChange = (value) => {
    const userType = value == "All" ? "All" : value
    setSelectType(value);
    getList(userType)
    setSelectUser([]);
    setLoading(false)
  };
  const handleUserChange = (value) => {
    setSelectUser(value);
    setSelectAll(value.length === userList.length);
  };
  const getList = (type) => {
    setLoading(true);
    request({
      url: `/common/user-list/${type}`,
      method: 'PUT',
      onSuccess: (data) => {
        // console.log(data.data.data)
        setUserList(data.data.data)
      },
      onError: (error) => {
        console.log(error)
        ShowToast(error, Severty.ERROR)
      }
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
        <Form.Item
          name="notificationtype"
          label="Notification Type"
          rules={[
            { required: true, message: "Please select the Notification Type!" }
          ]}
        >
          <Select className="nottfy-add" placeholder="Select Type">
            <Option value="Updates or changes to platform policies">Updates or changes to platform policies</Option>
            <Option value="Promotional offers or discounts">Promotional offers or discounts</Option>
            <Option value="Important alerts or reminders">Important alerts or reminders</Option>
            <Option value="Feedback requests or surveys">Feedback requests or surveys</Option>
            <Option value="Order status updates">Order status updates</Option>
            <Option value="Payment reminders">Payment reminders</Option>
            <Option value="Service maintenance notifications">Service maintenance notifications</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="User Type"
          rules={[
            { required: true, message: "Please input the Type!" }
          ]}
        >
          <Select className="nottfy-add" placeholder="Select Type" onChange={handleTypeChange}>
            <Option value="All Users">All Users</Option>
            <Option value="Only Parent">Only Parent</Option>
            <Option value="Only School">Only School</Option>
          </Select>
        </Form.Item>

        {selectType != "All" || selectType === null ?
          <Form.Item
            label={`Select ${selectType}`}
            name="user"
          // rules={[
          //   { required: true, message: "Please input the  !" }
          // ]}
          >
            <Checkbox checked={selectAll} onChange={handleSelectAll}>
              Select All
            </Checkbox>
            {!selectAll ?
              <Select
                placeholder={`Select ${selectType}`}
                mode="multiple"
                className="select-show-inn"

                value={selectUser}
                onChange={handleUserChange}
                filterOption={(input, option) => {
                  console.log(option.props)
                  const inputValue = input.toLowerCase();
                  const optionLabel = option.props.children.toLowerCase();
                  // const [code, phone] = optionLabel.split('-')
                  // console.log(inputValue, optionLabel);

                  return (optionLabel.includes(inputValue))
                }}
              >
                {userList.length > 0 && userList.map((item) =>
                (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select> : null}
          </Form.Item> : null}

        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please Enter the  title!" }
          ]}
        >
          <Input />
          {/* <Input type="textarea" /> */}
        </Form.Item>
        <Col span={24}>
          <Form.Item
            label="Message"
            name="message"
            className="textarea-inn"
            rules={[
              { required: true, message: "Please Enter the  message!" }
            ]}
          >
            <TextArea rows={4} />
            {/* <Input type="textarea" /> */}
          </Form.Item>
        </Col>

      </Form>
    </Modal>

  )
}

export default Notification;
