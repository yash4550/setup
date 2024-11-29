import React, { useState, useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Avatar,
  Modal,
  Form,
  Input,
  Upload as UploadAntd
} from "antd";
import profilavatar from "../assets/images/face-1.jpg";
import Main from "../components/layout/Main";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import { AuthContext } from "../context/AuthContext";
import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
const s3Config = {
  region: 'us-east-1',
  credentials: {
    accessKeyId: "IJTXH751MBXUWMTWM0SF",
    secretAccessKey: "lfTPRJ2PqAxsp3poTW9YlHktgaL1cFkLup8LidW9",
  },
  endpoint: "https://api-ap-south-mum-1.openstack.acecloudhosting.com:8080/",
  forcePathStyle: true,
};
const s3Client = new S3Client(s3Config);
function Profile() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const { logout } = useContext(AuthContext)
  const [visible, setVisible] = useState(false);
  const [profileVisible, setProfileVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [refresh, setRefresh] = useState(false)
  const [form] = Form.useForm();
  const { request } = useRequest()
  const { confirm } = Modal;
  const handleCreate = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };
  const onCreate = (values) => {
    const { old_password, new_password } = values
    const payload = {}
    if (!old_password || !new_password) return ShowToast('Please enter password ', Severty.ERROR)
    setLoading(true)
    payload.new_password = new_password
    payload.old_password = old_password
    request({
      url: '/admin/auth/change-password',
      method: 'POST',
      data: payload,
      onSuccess: (data) => {
        setLoading(false)
        if (data.status) {
          ShowToast(data.message, Severty.SUCCESS)
          setVisible(false)
          logout()
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

  useEffect(() => {
    request({
      url: '/admin/auth/get-profile',
      method: 'GET',
      onSuccess: (data) => {
        console.log(data)
        // ShowToast(data.message, Severty.SUCCESS)
        setProfile(data.data)
        setSelected(data.data)
      },
      onError: (error) => {
        console.log(error)
        ShowToast(error, Severty.ERROR)
      }
    })
  }, [refresh])



  const resetData = () => {
    request({
      url: '/common/factory-reset',
      method: 'GET',
      onSuccess: (data) => {
        console.log(data)
        // ShowToast(data.message, Severty.SUCCESS)
        setProfile(data.data)
        setSelected(data.data)
      },
      onError: (error) => {
        console.log(error)
        ShowToast(error, Severty.ERROR)
      }
    })
  }


  const showConfirm = () => {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button>Are you sure you want to logout ? </Button>,
        onOk() {
          logout()
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }, 5);
  };

  const showFactoryData = () => {
    setTimeout(() => {
      confirm({
        icon: <ExclamationCircleOutlined />,
        content: <Button>Are you sure you want to Reset all the data ? </Button>,
        onOk() {
          resetData()
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    }, 5);
  };
  return (
    <Main>
      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24]}>
            <Col span={24} md={24}>
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profile ? profile.profilePic : profilavatar} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{profile ? profile.name : ""}</h4>
                  <p>{profile ? profile.email : ""}</p>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>
      <Card className="profile-nav">
        <div className="profile-nav-inner">
          <Button onClick={(e) => setProfileVisible(true)} >Edit Profile</Button>
          <Button onClick={(e) => setVisible(true)} >Change Password</Button>
          <Button onClick={() => showFactoryData()} >Factory Data Reset</Button>
          <Button onClick={() => showConfirm()} >Logout</Button>
        </div>
      </Card>
      {profileVisible && <EditProfile show={profileVisible} hide={() => { setProfileVisible(false) }} data={selected} refresh={() => setRefresh(prev => !prev)} />}
      <Modal
        visible={visible}
        title="Change password"
        okText="Ok"
        onCancel={() => {
          setVisible(false);
          form.resetFields()
        }}
        onOk={handleCreate}
      >
        <Form form={form} layout="vertical" className="change-pw">
          <Form.Item
            label="Old Password"
            name="old_password"
            hasFeedback
            rules={[
              { required: true, message: "Please input the old password!" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="New Password"
            name="new_password"
            hasFeedback
            rules={[
              { required: true, message: "Please input the new password!" }
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Confirm New Password"
            name="confirm_new_password"
            dependencies={['new_password']}
            hasFeedback
            rules={[
              { required: true, message: "Please input the confirm password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('new_password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </Main>

  );


}
const EditProfile = ({ show, hide, data, refresh }) => {
  const [form] = Form.useForm();
  const { request } = useRequest()
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState([]);
  const uploadFileToS3 = async (file, bucketName) => {
    const key = "realState/admin" + file.name
    const params = {
      Bucket: bucketName,
      Key: key,
      Body: file,
    };

    const upload = new Upload({
      client: s3Client,
      params: params,
    });

    try {
      const data = await upload.done();
      console.log(data)
      return data;
    } catch (err) {
      throw err;
    }
  };
  const handleChange = async (event) => {
    const { file } = event;
    setFile([file]);
    try {
      const data = await uploadFileToS3(file, 'invent-colab-obj-bucket');
      const fileData = {
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: data.Location,
        thumbUrl: data.Location,
      };
      setFile([fileData]);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (!data) return
    form.setFieldsValue({ ...data })
    setFile([data.profilePic])
  }, [data])
  const onEditProfile = (values) => {
    const { email, name } = values
    if (file.length <= 0) return ShowToast('Please select the profile Image ', Severty.ERROR)
    const payload = {}
    setLoading(true)
    
    payload.email = email
    payload.name = name
    payload.profilePic = file.length > 0 ? file[0].url : null
    request({
      url: '/admin/auth/update-profile',
      method: 'POST',
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
      title={`${data ? 'Edit Profile' : ''}`}
      okText="Ok"
      onCancel={hide}
      okButtonProps={{
        form: 'create',
        htmlType: 'submit',
        loading: loading,
      }}
    >
      <Form id="create" form={form} onFinish={onEditProfile} layout="vertical">
        <Row>
          <Col span={24}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input the name!" },
                { pattern: new RegExp(/^[a-zA-Z ]*$/), message: "Only Alphabetic Characters Allowed" }
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Email"
              name="email"
              rules={
                [
                  {
                    type: 'email', message: 'The input is not valid E-mail!',
                  },
                  { required: true, message: "Please input the email!" }
                ]}
            >

              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <UploadAntd
              listType="picture"
              maxCount={1}
              customRequest={handleChange}
              onRemove={(e) => setFile([])}
              fileList={file}
            >
              {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
              {file.length > 0 ? null : <Button icon={<UploadOutlined />}>Upload</Button>}
            </UploadAntd>
          </Col>
        </Row>





        {/* <Form.Item name="description" label="Description">
            <Input type="textarea" />
          </Form.Item> */}

        {/* <Form.Item name="type" label="Type">
            <Radio.Group>
              <Radio value="public">Public</Radio>
              
              <Radio value="private">Private</Radio>
            </Radio.Group>
          </Form.Item> */}
      </Form>
    </Modal>
  )
}

export default Profile;
