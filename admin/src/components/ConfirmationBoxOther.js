import { Button, Modal } from "antd";
import { ShowToast, Severty } from "../helper/toast";
import { QuestionCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import useRequest from "../hooks/useRequest";
const { confirm } = Modal;

const ConfirmationBoxOther = () => {

  const { request } = useRequest();

  const showConfirm = ({ record, path, onLoading, onSuccess, message }) => {

    let msg = message ? message : 'Are you sure you want change the status ?';
    let button = <QuestionCircleOutlined />
    setTimeout(() => {
      confirm({
        icon: button,
        content: <Button>{msg}</Button>,
        onOk() {
          statusChange(record, path, onLoading, onSuccess)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    }, 5);
  };

  const statusChange = (record, path, onLoading, onSuccess) => {
    onLoading(true);
    let url = path + "/" + record
    request({
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

export default ConfirmationBoxOther;