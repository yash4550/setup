import firebaseAdmin from "../helpers/Firebase";
import _RS from "../helpers/ResponseHelper";
import User from "../models/School";

class NotificationService {
  async sendNotification(user, title) {
    try {
      const receiver = await User.findById(user);
      if (receiver && receiver.deviceToken) {
        const message = {
          notification: {
            title: title,
            body: title,
          },
          token: receiver.deviceToken,
        };
        firebaseAdmin
          .messaging()
          .send(message)
          .then((response) => {
            console.log("Notification sent successfully : ", response);
          });
      }
    } catch (error) {
      console.log("Error while sending notification : ", error);
      // return error;
    }
  }
}

export default new NotificationService();
