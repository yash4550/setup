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
  DatePicker,
  Select,
} from "antd";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import React, { useState, useContext, useEffect, useRef } from "react";
import {
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import Main from "../components/layout/Main";
import useDebounce from "../hooks/useDebounce";
import { UploadOutlined, ExportOutlined } from "@ant-design/icons";
import * as XLSX from "xlsx";
import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;
const Search = Input.Search;
function User() {
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { request } = useRequest();
  const [list, setList] = useState([]);
  const [listExport, setListExport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [visible, setVisible] = useState(false);
  const [subscriptionVisible, setSubscriptionVisible] = useState(false);
  const [visibleView, setVisibleView] = useState(false);
  const [changeAdvisor, setChangeAdvisor] = useState(false);
  const [provideSession, setProvideSession] = useState(false);
  const [selected, setSelected] = useState();
  const [viewData, setViewData] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filter, setFilter] = useState();
  const debouncedSearchText = useDebounce(searchText, 300);
  const searchInput = useRef(null);
  const navigate = useNavigate();
  const { confirm } = Modal;

  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const handleExport = () => {
    const data =
      listExport &&
      listExport.length > 0 &&
      listExport.map((row) => ({
        Name: row.schoolName,
        Email: row.email,
        Address: row.address,
        contactPersonName: row.contactPersonName,
        "Country Code": row.countryCode,
        "Mobile Number": row.mobileNumber,
      }));

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction Data");
    XLSX.writeFile(
      workbook,
      `${moment().milliseconds() +
      1000 * (moment().seconds() + 60 * 60) +
      "-USER"
      }.xlsx`
    );
  };
  const onSearch = (e) => {
    setSearchText(e.target.value);
    setPagination({ current: 1 });
  };
  const deleteAccount = (record) => {
    // alert(record._id)
    request({
      url: `/admin/user/delete-account/${record ? record._id : ""}`,
      method: "PUT",
      onSuccess: (data) => {
        console.log(data, "data");
        setRefresh(true);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        ShowToast(error, Severty.ERROR);
      },
    });
  };
  const statusChange = (record) => {
    setLoading(true);
    request({
      url: `/admin/user/status-change/${record}?`,
      method: "PUT",
      onSuccess: (data) => {
        setRefresh((prev) => !prev);
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        ShowToast(error, Severty.ERROR);
      },
    });
  };
  const showConfirm = (record) => {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button>Are you sure you want change the status ? </Button>,
        onOk() {
          statusChange(record);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }, 5);
  };
  const showDelete = (record) => {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button>Are you sure you want delete this school ? </Button>,
        onOk() {
          deleteAccount(record);
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }, 5);
  };
  const columns = [
    {
      title: "School Name",
      render: (_, { name, schoolName }) => {
        return <div>{name ? name : schoolName}</div>;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Contact Person",
      dataIndex: "contactPersonName",
      key: "contactPersonName",
    },

    {
      title: "Mobile Number",
      render: (_, { countryCode, mobileNumber }) => {
        return (
          <div>
            {countryCode ? "+" + countryCode : ""}-
            {mobileNumber ? mobileNumber : ""}
          </div>
        );
      },
    },

    // {
    //   title: "STATUS",
    //   key: "is_active",
    //   filters: [
    //     {
    //       text: "Active",
    //       value: true,
    //     },
    //     {
    //       text: "InActive",
    //       value: false,
    //     },
    //   ],
    //   // onFilter: (value, record) => record.is_active === value,
    //   render: (_, { is_deleted, is_active, _id }) => {
    //     let color = is_deleted ? "red" : is_active ? "green" : "red";
    //     return (
    //       <Tag
    //         onClick={(e) => (!is_deleted ? showConfirm(_id) : null)}
    //         color={color}
    //         key={is_active}
    //       >
    //         {is_deleted ? "DELETED" : is_active ? "Active" : "Inactive"}
    //       </Tag>
    //     );
    //   },
    // },

    {
      title: "Action",
      render: (_, record) => {
        return (
          <>
            <div className="cta_wrap">
              {/* <Button
                                onClick={(e) => {
                                    setVisibleView(true);
                                    setViewData(record);
                                }}
                            >
                                <i class="fa fa-light fa-eye"></i>
                            </Button> */}
              <Button
                onClick={() => {
                  setSelected(record);
                  setVisible(true);
                }}
              >
                <i class="fa fa-light fa-pen"></i>
                {/* Edit */}
              </Button>

              <Button onClick={(e) => showDelete(record)}>
                <i class="fa fa-light fa-trash"></i>
                {/* Delete */}
              </Button>

              <Button
                onClick={() => {
                  setSelected(record);
                  setProvideSession(true);
                }}
              >
                <i class="fa fa-key" title="Reset Password">
                  {/* Reset password */}
                </i>
              </Button>
            </div>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    setLoading(true);
    fetchData(pagination);
  }, [refresh, debouncedSearchText]);
  useEffect(() => {
    if (!visibleView) return;
    navigate(`/view-user/${viewData._id}`);
  }, [visibleView]);
  const handleChange = (pagination, filters) => {
    setFilter(filters.is_active);
    fetchData(pagination, filters);
  };
  const fetchData = (pagination, filters) => {
    const filterActive = filters ? filters.is_active : null;
    request({
      url: `/admin/user/list?status=${filterActive ? filterActive.join(",") : ""
        }&page=${pagination ? pagination.current : 1}&limit=${pagination ? pagination.pageSize : 10
        }&search=${debouncedSearchText}&start_date=${startDate ? startDate : ""
        }&end _date=${endDate ? endDate : ""}`,
      method:"GET",
      onSuccess: (data) => {
        setLoading(false);
        setList(data.data.list.docs);
        setPagination((prev) => ({
          current: pagination.current,
          total: data.data.list.totalDocs,
        }));
      },
      onError: (error) => {
        console.log(error);
        ShowToast(error, Severty.ERROR);
      },
    });
  };

  const handleChangeDate = (e) => {
    setStartDate();
    setEndDate();
    if (e && e.length > 0) {
      setStartDate(moment(e[0]._d).format("YYYY-MM-DD"));
      setEndDate(moment(e[1]._d).format("YYYY-MM-DD"));
    }
  };
  useEffect(() => {
    request({
      url: `/admin/user/get-list/User?status=${filter ? filter.join(",") : ""
        }&search=${debouncedSearchText}&start_date=${startDate ? startDate : ""
        }&end_date=${endDate ? endDate : ""}`,
      method: "GET",
      onSuccess: (data) => {
        console.log(data, "data");
        setLoading(false);
        setListExport(data.data.data);
      },
      onError: (error) => {
        console.log(error);
        ShowToast(error, Severty.ERROR);
      },
    });
  }, [refresh, debouncedSearchText, startDate, endDate, filter]);
  return (
    <Main>
      <div className="tabled">
        <Row>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="School Management"
              extra={
                <>
                  <Search
                    size="large"
                    onChange={onSearch}
                    value={searchText}
                    onPressEnter={onSearch}
                  />


                  {/* <RangePicker onChange={handleChangeDate} /> */}
                  <Button
                    type="primary"
                    icon={<ExportOutlined />}
                    onClick={handleExport}
                  >
                    Export
                  </Button>
                  <Button
                    onClick={(e) => {
                      setVisible(true);
                      setSearchText("");
                    }}
                  >
                    Add School
                  </Button>

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
      {visible && (
        <AddFrom
          show={visible}
          hide={() => {
            setSelected();
            setVisible(false);
            setSearchText("");
          }}
          data={selected}
          refresh={() => setRefresh((prev) => !prev)}
        />
      )}

      {provideSession && (
        <ChangePassword
          show={provideSession}
          hide={() => {
            setSelected();
            setProvideSession(false);
            setSearchText("");
          }}
          data={selected}
          refresh={() => setRefresh((prev) => !prev)}
        />
      )}
    </Main>
  );
}

const AddFrom = ({ show, hide, data, refresh }) => {
  const [mobileNumber, setMobileNumber] = useState({
    mobile: "",
    country_code: "",
  });

  const [form] = Form.useForm();
  const { request } = useRequest();

  const [loading, setLoading] = useState(false);

  const onChange = (e) => console.log(`radio checked: ${e.target.value}`);

  const onCancel = (e) => hide();

  const handleChange = (value, data, event, formattedValue) => {
    var country_code = data.dialCode;
    setMobileNumber({
      country_code: country_code,
      mobile: value.slice(data.dialCode.length),
    });
  };
  useEffect(() => {
    if (!data) return;
    form.setFieldsValue({ ...data });
    setMobileNumber({
      mobile: data.mobileNumber,
      country_code: data.countryCode,
    });
  }, [data]);

  const onCreate = (values) => {
    const { email, schoolName, address, contactPersonName } = values;
    const payload = {};
    if (!email) return ShowToast("Please enter valid email ", Severty.ERROR);
    if (!mobileNumber.mobile)
      return ShowToast("Please enter mobile number ", Severty.ERROR);
    if (mobileNumber.mobile.length <= 6 || mobileNumber.mobile.length >= 15) {
      return ShowToast("Please enter 7 to 12 digits", Severty.ERROR);
    }
    setLoading(true);
    payload.email = email;
    payload.schoolName = schoolName;
    payload.countryCode = mobileNumber.country_code;
    payload.mobileNumber = mobileNumber.mobile;
    payload.address = address;
    payload.contactPersonName = contactPersonName;
    request({
      url: data 
        ? `/admin/user/edit-user/${data._id}` 
        : `/admin/user/add-school`,
      method: data ? "PUT" : "POST",
      data: payload,
      onSuccess: (response) => {
        setLoading(false);
        if (response?.status) {
          ShowToast(response.message, Severty.SUCCESS);
          hide(); // Hide modal or relevant UI
          refresh(); // Refresh data or UI state
        } else {
          ShowToast(response?.message || "Unexpected error occurred", Severty.ERROR);
        }
      },
      onError: (error) => {
        const errorMessage = error?.response?.data?.message || "An error occurred";
        ShowToast(errorMessage, Severty.ERROR);
        setLoading(false);
      },
    });
    
    // console.log(values)
  };

  return (
    <Modal
      visible={show}
      title={`${data ? "Edit School" : "Create a new School"} `}
      okText="Ok"
      onCancel={hide}
      okButtonProps={{
        form: "create",
        htmlType: "submit",
        loading: loading,
      }}
    >
      <Form id="create" form={form} onFinish={onCreate} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="School Name"
              name="schoolName"
              rules={[
                { required: true, message: "Please input the name!" },
                {
                  pattern: new RegExp(/^[a-zA-Z0-9 ]*$/),
                 
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email!" },
                {
                  type: "email",
                  message: "The input is not valid  E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Address"
              name="address"
              rules={[
                { required: true, message: "Please input the address!" },
                {
                  type: "address",
                  message: "The input is not valid  address!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Contact Person"
              name="contactPersonName"
              rules={[
                { required: true, message: "Please input the person!" },
                {
                  type: "address",
                  message: "The input is not valid  person!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mobile Number">
              <PhoneInput
                inputProps={{
                  name: "mobile",
                  required: true,
                  autoFocus: false,
                }}
                isValid={(value, country) => {
                  if (value.match(/1234/)) {
                    return "Invalid value: " + value + ", " + country.name;
                  } else if (value.match(/1234/)) {
                    return "Invalid value: " + value + ", " + country.name;
                  } else {
                    return true;
                  }
                }}
                country={"kw"}
                value={
                  mobileNumber
                    ? (mobileNumber.country_code
                      ? mobileNumber.country_code
                      : "+354") +
                    (mobileNumber.mobile ? mobileNumber.mobile : null)
                    : ""
                }
                onChange={handleChange}
              />
            </Form.Item>
          </Col>
        
          {/* <Form.Item name="type" label="Type">
              <Radio.Group>
                <Radio value="public">Public</Radio>
                
                <Radio value="private">Private</Radio>
              </Radio.Group>
            </Form.Item> */}
        </Row>
      </Form>
    </Modal>
  );
};

const ChangePassword = ({ show, hide, data, refresh }) => {
  const [form] = Form.useForm();
  const { request } = useRequest();

  const [loading, setLoading] = useState(false);
  const onCreate = (values) => {
    setLoading(true);
    request({
      url: `/admin/user/reset-password/${data._id}`,
      method: `PUT`,
      data: values,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS);
          hide();
          refresh();
          // hide()
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR);
        // console.log(error.response.data, "Error")
        setLoading(false);
      },
      // onErrorSubmit: (data) => {
      //   console.log(data)
      // }
    });
    // console.log(values)
  };

  return (
    <Modal
      visible={show}
      title={`${data ? "Edit School" : "Create a new School"} `}
      okText="Ok"
      onCancel={hide}
      okButtonProps={{
        form: "create",
        htmlType: "submit",
        loading: loading,
      }}
    >
      <Form id="create" form={form} onFinish={onCreate} layout="vertical">
        <Row>
          <Form.Item
            label="New Password"
            name="new_password"
            hasFeedback
            rules={[
              { required: true, message: "Please input the new password!" },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirm_new_password"
            dependencies={["new_password"]}
            hasFeedback
            rules={[
              { required: true, message: "Please input the confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Passwords that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default User;
