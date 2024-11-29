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
          Name: row.parentName,
          Email: row.email,
          childName: row.childName,
          Class: row.Class,
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
    const columns = [
      {
        title: "Parent Name",
        render: (_, { name, parentName }) => {
          return <div>{name ? name : parentName}</div>;
        },
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
  
      {
        title: "Child Name",
        dataIndex: "childName",
        key: "childName",
      },


      {
        title: "Class",
        dataIndex: "Class",
        key: "Class",
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
];
    return (
      <Main>
        <div className="tabled">
          <Row>
            <Col xs="24" xl={24}>
              <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Parent Management"
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
                      Get Parent
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
                    // onChange={handleChange}
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
  
    useEffect(() => {
      if (!data) return;
      form.setFieldsValue({ ...data });
      setMobileNumber({
        mobile: data.mobileNumber,
        country_code: data.countryCode,
      });
    }, [data]);
  
    const onCreate = (values) => {
      const { email, parentName, childName, Class, mobileNumber } = values;
      const payload = {};
      if (!email) return ShowToast("Please enter valid email ", Severty.ERROR);
      if (!mobileNumber.mobile)
        return ShowToast("Please enter mobile number ", Severty.ERROR);
      if (mobileNumber.mobile.length <= 6 || mobileNumber.mobile.length >= 15) {
        return ShowToast("Please enter 7 to 12 digits", Severty.ERROR);
      }
      setLoading(true);
      payload.email = email;
      payload.parentName = parentName;
      payload.countryCode = mobileNumber.country_code;
      payload.mobileNumber = mobileNumber.mobile;
      payload.Class = Class;
      payload.childName = childName;
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
        title={`${data ? "Edit Parent" : "Get Parent Data"} `}
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
           </Row>
         </Form>
       </Modal>
     );
  };
  

  
  export default User;
  