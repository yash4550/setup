import School from "../../models/School";
import _RS from "../../helpers/ResponseHelper";
import Auth from "../../Utils/Auth";
import Admin from "../../models/Admin";
import MailHelper from "../../helpers/MailHelper";
export class AuthController {
  static async login(req, res, next) {
    const startTime = new Date().getTime();
    const { email, password } = req.body;
    try {
      let isSchoolExist = await Admin.findOne({
        email: email,
      });
      if (!isSchoolExist) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "School not exist ,Please check the credentials",
          isSchoolExist,
          startTime
        );
      }
      const isPasswordValid = await Auth.comparePassword(
        password,
        isSchoolExist.password
      );

      if (!isPasswordValid) {
        return _RS.badRequest(
          res,
          "BADREQUEST",
          "Invalid password",
          {},
          startTime
        );
      }

      const payload = {
        id: isSchoolExist._id,
        email: isSchoolExist.email,
      };

      const token = await Auth.getToken(payload, "90d", next);
      return _RS.ok(
        res,
        "SUCCESS",
        "Login successfully",
        { School: isSchoolExist, token },
        startTime
      );
    } catch (err) {
      next(err);
    }
  }

  static async signUp(req, res, next) {
    const startTime = new Date().getTime();
    const { email, password, name, phoneNumber } = req.body;
    try {
      let School = await Admin.findOne({
        $and: [{ email: email }],
      });
      if (!School) {
        School = await Admin.create({
          email: "admin@yopmail.com",
          password: await Auth.encryptPassword("123456"),
          name: "Admin",
          phoneNumber: "919632587412",
        });
        return _RS.created(res, "CREATED", "SignUp sucessfully");
      }
      return _RS.conflict(
        res,
        "CONFLICT",
        "School already exist with this email",
        School,
        startTime
      );
    } catch (err) {
      next(err);
    }
  }
  static async getProfile(req, res, next) {
    const startTime = new Date().getTime();
    try {
      let getAdmin = await Admin.findOne({
      });

      if (!getAdmin) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "School not exist , go to signup page",
          getAdmin,
          startTime
        );
      }
      return _RS.ok(
        res,
        "SUCCESS",
        "Get Profile Successfully",
        getAdmin,
        startTime
      );
    } catch (err) {
      next(err);
    }
  }
  static async changePassword(req, res, next) {
    const startTime = new Date().getTime();
    const { old_password, new_password } = req.body;
    try {
      console.log("called");
      console.log(req.School);

      const admin: any = await Admin.findOne({});

      const isPasswordCurrentCorrect = await Auth.comparePassword(
        old_password,
        admin.password
      );

      if (!isPasswordCurrentCorrect) {
        return _RS.badRequest(
          res,
          "BADREQUEST",
          "Old password does not match",
          {},
          startTime
        );
        // return next(
        //   new AppError("Old password does not match", RESPONSE.HTTP_BAD_REQUEST)
        // );
      }

      const isSamePassword = await Auth.comparePassword(
        new_password,
        admin.password
      );

      if (isSamePassword) {
        return _RS.badRequest(
          res,
          "BADREQUEST",
          "New password cannot be the same as the old password",
          {},
          startTime
        );
      }

      const encryptedPassword = await Auth.encryptPassword(new_password);

      admin.password = encryptedPassword;

      await admin.save();

      console.log("done");

      return _RS.ok(
        res,
        "SUCCESS",
        "Password changed successfully",
        {},
        startTime
      );
      // res.status(RESPONSE.HTTP_OK).json({
      //   status: RESPONSE.HTTP_OK,

      //   message: "password changed successfully",

      //   data: {},
      // });
    } catch (err) {
      next(err);
    }
  }
  static async updateProfile(req, res, next) {
    const startTime = new Date().getTime();
    const { email, name, profilePic } = req.body;
    try {
      let getAdmin = await Admin.findOne({
        name: name
      });

      if (!getAdmin) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "School not exist , go to signup page",
          getAdmin,
          new Date().getTime()
        );
      }
      (getAdmin.name = name ? name : getAdmin.name),
        (getAdmin.email = email ? email : getAdmin.email),
        (getAdmin.profilePic = profilePic ? profilePic : getAdmin.profilePic),
        getAdmin.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "Update Profile Successfully",
        getAdmin,
        startTime
      );
    } catch (error) {
      next(error);
    }
  }
  static async forgotPassword(req, res, next) {
    const email = req.body.email;
    try {
      let admin = await Admin.findOne({ email: email });

      if (!admin) {
        let msg =
          "This credential is not match in our record ,So Please use correct one.";
        return _RS.notFound(res, "SUCCESS", msg, admin, new Date().getTime());
      }
      const otp = await Auth.generateOtp();
      admin.verification_code = otp?.otp;
      // admin.verification_code_expiry_time = otp.otpExpiresTime;
      await admin.save();

      // let { options: mailOptions = {} }: any = mailConfig || {};
      // mailOptions.to = email;
      // mailOptions.subject = "Forgot Password";
      // mailOptions.html = `Hi Admin, Please Verify the OTP ${otp.otp}`;
      // var transport = mailConfig;
      // var transporter = nodemailer.createTransport(transport);
      // const jj = transporter.sendMail(mailOptions, function (err_email) {
      //   if (err_email) {
      //     console.log(err_email);
      //   } else {
      //     console.log(`Registration email has been successfully sent to.`);
      //   }
      // });

      // console.log(jj, "jj");

      await MailHelper.sendMail(admin._id, "Forget password");
      return _RS.ok(
        res,
        "SUCCESS",
        "Please check mail id , send otp on mail",
        {},
        new Date().getTime()
      );
    } catch (error) {
      next(error);
    }
  }
  static async verifyOtp(req, res, next) {
    const email = req.body.email;
    const otp = req.body.otp;
    const currentTime = new Date();
    try {
      let admin = await Admin.findOne({ email: email });
      console.log(admin, "admin");
      if (!admin) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "This credential is not match in our record ,So Please use correct one",
          {},
          new Date().getTime()
        );
      }

      if (admin.verification_code != otp) {
        return _RS.badRequest(
          res,
          "BADREQUEST",
          "Invalid OTP",
          {},
          new Date().getTime()
        );
      }

      admin.verification_code = null;
      admin.verification_code_expiry_time = null;
      admin.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "OTP verify Successfully",
        {},
        new Date().getTime()
      );
    } catch (error) {
      next(error);
    }
  }
  static async verifyEmail(req, res, next) {
    const id = req.params.id;
    const currentTime = new Date();
    try {
      let admin = await School.findOne({ _id: id });
      if (!admin) {
        return _RS.notFound(
          res,
          "NOTFOUND",
          "This credential is not match in our record ,So Please use correct one",
          {},
          new Date().getTime()
        );
      }

      admin.isVerify = true;
      admin.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "Verify your email successfully",
        {},
        new Date().getTime()
      );
    } catch (error) {
      next(error);
    }
  }
  static async resetPassword(req, res, next) {
    const { email, password } = req.body;
    try {
      let School = await Admin.findOne({ email });
      console.log(School, "uuuuuuuuuuuu");

      if (!School) {
        let msg = "School not found";
        return _RS.notFound(res, "notFound", msg, {}, new Date().getTime());
      }

      School.password = await Auth.encryptPassword(password);
      await School.save();

      let msg = "Password changed successfully.";
      return _RS.ok(res, "SUCCESS", msg, {}, new Date().getTime());
    } catch (error) {
      next(error);
    }
  }
}
