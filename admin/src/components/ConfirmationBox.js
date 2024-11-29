import { Button, Modal } from "antd";
import { ShowToast, Severty } from "../helper/toast";
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useRequest from "../hooks/useRequest";
const { confirm } = Modal;

const ConfirmationBox = () => {

  const { request } = useRequest();

  const showConfirm = ({ record, path, onLoading, onSuccess, type }) => {

    let msg = 'Are you sure you want change the status ?';
    let button = <QuestionCircleOutlined />

    if (type === "all") {
      msg = 'Are you sure you want to change the status of all the vendors ?'
      button = <QuestionCircleOutlined />
    } else if (type !== null && type !== undefined) {
      msg = 'Are you sure you want to change the status ?'
      button = <CheckCircleOutlined />
    }

    setTimeout(() => {
      confirm({
        icon: button,
        content: <Button>{msg}</Button>,
        onOk() {
          // console.log("status>>>>>>..")
          statusChange(record, path, onLoading, onSuccess, type)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }, 5);
  };

  const statusChange = (record, path, onLoading, onSuccess, type) => {
    console.log(type, "type>>>>>>>>")
    onLoading(true);
    let url = '';
    if (type === "all") {
      url = path
    } else if (type !== null && type !== undefined) {
      url = path + "/" + record + "?type=" + type
    } else {
      url = path + "/" + record
    }

    type == "all"
      ? request({
        url: url,
        method: 'POST',
        data: record,
        onSuccess: (data) => {
          onSuccess();
          onLoading(false);
        },
        onError: (error) => {
          console.log(error)
          ShowToast(error, Severty.ERROR)
        }
      })
      : request({
        url: url,
        method: 'GET',
        onSuccess: (data) => {
          onSuccess();
          onLoading(false);
        },
        onError: (error) => {
          console.log(error)
          ShowToast(error, Severty.ERROR)
        }
      })
  };

  return { showConfirm }

};

export default ConfirmationBox;