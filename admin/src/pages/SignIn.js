import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  Layout,
  Menu,
  Button,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Switch,
  Modal,
} from "antd";
import signinbg from "../assets/images/logo.svg";
import Texisign from "../assets/images/bg-light.jpg";
import useRequest from "../hooks/useRequest";
import { ShowToast, Severty } from "../helper/toast";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import encryptDecrypt from "../helper/encryptDecrypt";
const { Title } = Typography;
const { Content } = Layout;

const SignIn = () => {
  const { setIsLoggedIn, setUserProfile } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [resetModal, setResetModal] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const { request } = useRequest();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const onFinish = (values) => {
    onSubmit(values);
  };

  const onSubmit = (values) => {
    const { email, password } = values;
    if (!email)
      return ShowToast("Please enter email to sign in", Severty.ERROR);
    const payload = { password };
    if (!email) return ShowToast("Please enter valid email ", Severty.ERROR);
    setLoading(true);
    payload.email = email;
    request({
      url: "/admin/auth/login",
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        setLoading(false);
        if (data.status) {
          console.log(data);
          setIsLoggedIn(true);
          if (rememberMe) {
            var emailEncrypt = encryptDecrypt.encryptEmail(values.email);
            var passwordEncrypt = encryptDecrypt.encryptPassword(
              values.password
            );
            localStorage.setItem("rememberMe", "true");
            localStorage.setItem("ykmCe2AYEFTHobn", emailEncrypt);
            localStorage.setItem("ouUsippetc8S4Ry", passwordEncrypt);
          } else {
            localStorage.removeItem("ykmCe2AYEFTHobn");
            localStorage.removeItem("ouUsippetc8S4Ry");
          }
          localStorage.setItem("token", data.data.token);
          localStorage.setItem("userProfile", JSON.stringify(data.data.user));
          ShowToast(data.message, Severty.SUCCESS);
          setUserProfile(data.data);
          navigate("/dashboard");
        } else {
          ShowToast(data.message, Severty.ERROR);
        }
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR);
        setLoading(false);
      },
    });
  };


  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleForgotPassword = () => {
    setVisible(true);
  };

  const handleResetPassword = (email) => {
    // Send the OTP to the user's email
    let payload = {};
    payload.email = email.email;
    request({
      url: "/admin/auth/forgot-password",
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        ShowToast(data.message, Severty.SUCCESS);
        setVisible(false);
        setOtpModal(true);
        setSelected({ email });
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR);
      },
    });
  };

  const handleVerifyOTP = (values) => {
    const { email, otp } = values;
    // Verify the OTP entered by the user
    let payload = {};
    payload.email = selected.email.email;
    payload.otp = otp;
    request({
      url: "/admin/auth/verify-otp",
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        ShowToast(data.message, Severty.SUCCESS);
        setOtpModal(false);
        setVisible(false);
        setResetModal(true);
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR);
      },
    });
  };

  const handleReset = (values) => {
    const { email, newPassword } = values;
    // Reset the password with the new password entered by the user
    let payload = {};
    payload.email = selected.email.email;
    payload.password = newPassword;
    request({
      url: "/admin/auth/reset-password",
      method: "POST",
      data: payload,
      onSuccess: (data) => {
        ShowToast(data.message, Severty.SUCCESS);
        setResetModal(false);
      },
      onError: (error) => {
        ShowToast(error.response.data.message, Severty.ERROR);
      },
    });
  };

  const handleCancelReset = () => {
    setResetModal(false);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("ykmCe2AYEFTHobn");
    const savedPassword = localStorage.getItem("ouUsippetc8S4Ry");

    if (savedEmail && savedPassword) {
      var originalEmail = encryptDecrypt.decryptEmail(savedEmail);
      var originalPassword = encryptDecrypt.decryptEmail(savedPassword);

      form.setFieldsValue({ email: originalEmail, password: originalPassword });
      setRememberMe(true);
    } else {
      setRememberMe(false);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      <Layout
        className="layout-default layout-signin-bg"
      ></Layout>
      <Layout
        className="layout-default layout-signin"
      >
        <Row className="align-items-center">
        <Col span={24} lg={12} className="signin-bg">
                <div className="sign-rightouter">
                  {/* <img src={Texisign} /> */}
                </div>
           </Col>
          <Col span={24} lg={12} className=""  >
            <Content className="signin">
              <div className="signin-box">
                <div className="signup-logo">
                  {/* <img src={signinbg} alt="" /> */}
                </div>
                <Row justify="space-around">
                  <Col xs={{ span: 24 }} lg={{ span: 24 }} md={{ span: 24 }}>
                    <div className="signup-form">
                      <Title className="mb-15">Sign In</Title>
                      <Title className="font-regular text-muted" level={5}>
                        Enter your email and password to sign in
                      </Title>
                      <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        className="row-col"
                      >
                        <Form.Item
                          className="username"
                          label="Email"
                          name="email"
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            {
                              type: "email",
                              message: "The input is not valid E-mail!",
                            },
                          ]}
                        >
                          <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                          className="username"
                          label="Password"
                          name="password"
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                          ]}
                        >
                          <Input.Password placeholder="Password" />
                        </Form.Item>
                        <div className="forgot-pass">
                          <Form.Item
                            name="remember"
                            className="aligin-center"
                            valuePropName="checked"
                          >
                            <Switch
                              checked={rememberMe}
                              onChange={(checked) => setRememberMe(checked)}
                            />
                            Remember me
                          </Form.Item>
                          <Form.Item
                            name="remember"
                            className="aligin-center"
                            valuePropName="checked"
                          >
                            <Button className="forgate-btn" onClick={handleForgotPassword}>
                              <a>Forgot Password</a>
                            </Button>
                          </Form.Item>
                        </div>

                        <Form.Item>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{ width: "100%" }}
                          >
                            SIGN IN
                          </Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </Col>
                  {/* <Col
                className="sign-img"
                style={{ padding: 12 }}
                xs={{ span: 24 }}
                lg={{ span: 12 }}
                md={{ span: 12 }}
              >
                <img src={signinbg} alt="" />
              </Col> */}
                </Row>
              </div>
            </Content>
          </Col>
         
        </Row>

        <Modal
          visible={visible}
          title="Forgot Password"
          okText="Ok"
          onCancel={() => setVisible(false)}
          okButtonProps={{
            form: "forget-pasword",
            htmlType: "submit",
            loading: loading,
          }}
        >

          <Form
            id="forget-pasword"
            form={form1}
            onFinish={handleResetPassword}
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          visible={otpModal}
          title="Verify OTP"
          okText="Ok"
          onCancel={() => setOtpModal(false)}
          okButtonProps={{
            form: "verify-otp",
            htmlType: "submit",
            loading: loading,
          }}
        >
          <Form
            id="verify-otp"
            form={form2}
            onFinish={(e) => handleVerifyOTP(e)}
            layout="vertical"
          >
            <Form.Item
              label="OTP"
              name="otp"
              rules={[
                {
                  required: true,
                  message: "Please enter the OTP",
                },
                {
                  len: 4,
                  message: "OTP must be 4  digits",
                },
              ]}
            >
              <Input type="number" maxLength={4} placeholder="Enter OTP" />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          visible={resetModal}
          title="Reset Password"
          okText="Ok"
          onCancel={handleCancelReset}
          okButtonProps={{
            form: "reset-password",
            htmlType: "submit",
            loading: loading,
          }}
        >
          <Form
            id="reset-password"
            form={form3}
            onFinish={(e) => handleReset(e)}
            layout="vertical"
          >
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="Confirm New Password"
              name="confirm_new_password"
              dependencies={["newPassword"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input the confirm password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
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
          </Form>
        </Modal>

      </Layout>
    </>
  );
};

export default SignIn;
