import User from "../../models/School";
import _RS from "../../helpers/ResponseHelper";
import { date } from "joi";
import Auth from "../../Utils/Auth";
import MailHelper from "../../helpers/MailHelper";
export class SchoolController {
  static async list(req, res, next) {
    try {
      const startTime = new Date().getTime();

      let sort: any = [["created_at", -1]];
      if (req.query.sort) {
        const map = Array.prototype.map;
        sort = Object.keys(req.query.sort).map((key) => [
          key,
          req.query.sort[key],
        ]);
        console.log(sort, "sort");
      }

      const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
        collation: {
          locale: "en",
        },
      };
      let filteredQuery: any = {};
      if (req.query.search && req.query.search.trim()) {
        console.log(req.query.search, "req.query.search");
        // filteredQuery = {
        //   name: {
        //     $regex: req.query.search,
        //     $options: "$i",
        //   },
        // };
        filteredQuery.$or = [
          {
            schoolName: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            email: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            mobileNumber: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            address: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            contactPersonName: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            countryCode: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
        ];
      }

      if (req.query.start_date && req.query.start_date.trim()) {
        filteredQuery.created_at = {
          $gte: new Date(req.query.start_date + "T00:00:00Z"),
        };
      }

      if (req.query.end_date && req.query.end_date.trim()) {
        filteredQuery.created_at = {
          $lte: new Date(req.query.end_date + "T23:59:59Z"),
        };
      }
      if (req.query.start_date && req.query.end_date) {
        filteredQuery.created_at = {
          $gte: new Date(req.query.start_date + "T00:00:00Z"),
          $lte: new Date(req.query.end_date + "T23:59:59Z"),
        };
      }
      if (req.query.status && req.query.status.trim()) {
        var arrayValues = req.query.status.split(",");
        var booleanValues = arrayValues.map(function (value) {
          return value.toLowerCase() === "true";
        });
        filteredQuery.is_active = { $in: booleanValues };
      }
      if (req.query.isApprove && req.query.isApprove.trim()) {
        var arrayValues = req.query.isApprove.split(",");
        var booleanValues = arrayValues.map(function (value) {
          return value.toLowerCase() === "true";
        });
        filteredQuery.isApprove = { $in: booleanValues };
      }
      let query: any = [
        {
          $match: {
            type: "School",
            // is_deleted: false,
          },
        },

        {
          $match: filteredQuery,
        },

        {
          $sort: {
            created_at: -1,
          },
        },
      ];
      var myAggregate = User.aggregate(query);
      const list = await User.aggregatePaginate(myAggregate, options);
      // const list = await User.find({ type: "Expact" }).sort({ created_at: -1 });
      return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
    // try {
    //   const startTime = new Date().getTime();
    //   const list = await User.find({ type: "Psychologist" }).sort({
    //     created_at: -1,
    //   });
    //   return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    // } catch (err) {
    //   next(err);
    // }
  }
  static async addUser(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const { email, mobileNumber, countryCode, address, schoolName, contactPersonName} = req.body;
      const getUser = await User.findOne({
        $or: [
          {
            email: email,
          },
          { mobileNumber: mobileNumber, countryCode: countryCode },
        ],
        type: "School",
      });
      if (getUser)
        return _RS.conflict(
          res,
          "COFLICT",
          "User already exist with this Email or Mobile Number ",
          getUser,
          startTime
        );
      const data = {
        email: email,
        mobileNumber: mobileNumber,
        countryCode: countryCode,
        schoolName: schoolName,
        type: "School",
        password: await Auth.encryptPassword("Test@1234"),
        address: address,
        contactPersonName: contactPersonName

      };
      const user = await new User(data).save();
     
      return _RS.created(res, "SUCCESS", "Add School Successfully", user);
    } catch (err) {
      next(err);
    }
  }
  static async editUser(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const {
        email,
        mobileNumber,
        countryCode,
        schoolName,
        address,
        contactPersonName
      } = req.body;
      const id = req.params.id;

      const getPsychologist = await User.findOne({ _id: id });
      console.log(getPsychologist);
      if (!getPsychologist)
        return _RS.notFound(
          res,
          "NOTFOUND",
          "User not found",
          getPsychologist,
          startTime
        );

      const isCheck = await User.findOne({
        $or: [
          {
            email: email,
          },
          { mobileNumber: mobileNumber, countryCode: countryCode },
        ],
        _id: { $ne: id },
        type: "School",
      });
      if (isCheck) {
        return _RS.conflict(
          res,
          "CONFLICT",
          "User already exists with this email or phone number",
          isCheck,
          startTime
        );
      }
      // const data = {
      //   email: email,
      //   mobileNumber: mobileNumber,
      //   countryCode: countryCode,
      //   name: name,
      // };
      (getPsychologist.schoolName = schoolName ? schoolName : getPsychologist.name),
        (getPsychologist.mobileNumber = mobileNumber
          ? mobileNumber
          : getPsychologist.mobileNumber),
        (getPsychologist.countryCode = countryCode
          ? countryCode
          : getPsychologist.countryCode),
        (getPsychologist.email = email ? email : getPsychologist.email),
        (getPsychologist.address = address ? address : getPsychologist.address),
        (getPsychologist.contactPersonName = contactPersonName ? contactPersonName : getPsychologist.contactPersonName),
        getPsychologist.save();

      // const user = await new User(data).save();
      return _RS.ok(
        res,
        "SUCCESS",
        "Update data Successfully",
        getPsychologist,
        startTime
      );
      // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
  }

  static async statusChange(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const id = req.params.id;
      const getExpact = await User.findOne({ _id: req.params.id });
      if (!getExpact)
        return _RS.notFound(
          res,
          "NOTFOUND",
          "Expact not found",
          getExpact,
          startTime
        );
      (getExpact.is_active = !getExpact.is_active), getExpact.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "Status Change Successfully",
        getExpact,
        startTime
      );
      // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
  }
  static async deleteUser(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const id = req.params.id;
      const getUser = await User.findOneAndDelete({ _id: req.params.id });

      // if (!getUser)
      //   return _RS.notFound(
      //     res,
      //     "NOTFOUND",
      //     "Expact not found",
      //     getUser,
      //     startTime
      //   );
      // (getUser.is_deleted = true), getUser.save();

      return _RS.ok(
        res,
        "SUCCESS",
        "Delete Account Successfully",
        {},
        startTime
      );
      // return _RS.ok(res, "SUCCESS", "List", { list: list }, startTime);
    } catch (err) {
      next(err);
    }
  }
  

  static async getList(req, res, next) {
    try {
      let filteredQuery: any = {};

      if (req.query.search && req.query.search.trim()) {
        filteredQuery.$or = [
          {
            schoolName: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            email: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            address: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            contactPersonName: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            mobileNumber: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            countryCode: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
        ];
      }

      if (req.query.start_date && req.query.start_date.trim()) {
        filteredQuery.created_at = {
          $gte: new Date(req.query.start_date + "T00:00:00Z"),
        };
      }

      if (req.query.end_date && req.query.end_date.trim()) {
        filteredQuery.created_at = {
          $lte: new Date(req.query.end_date + "T23:59:59Z"),
        };
      }
      if (req.query.start_date && req.query.end_date) {
        filteredQuery.created_at = {
          $gte: new Date(req.query.start_date + "T00:00:00Z"),
          $lte: new Date(req.query.end_date + "T23:59:59Z"),
        };
      }
      if (req.query.status && req.query.status.trim()) {
        var arrayValues = req.query.status.split(",");
        var booleanValues = arrayValues.map(function (value) {
          return value.toLowerCase() === "true";
        });
        filteredQuery.is_active = { $in: booleanValues };
      }
      console.log(filteredQuery, "filteredQuery");
      let query: any = [
        {
          $match: {
            type: req.params.type,
            isVerify: true,
            is_deleted: false,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "therapists",
            foreignField: "_id",
            as: "therapists",
          },
        },
        {
          $unwind: {
            path: "$therapists",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "languages",
            localField: "languageId",
            foreignField: "_id",
            as: "languageId",
          },
        },
        {
          $unwind: {
            path: "$languageId",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "languages",
            localField: "psychologistLanguage",
            foreignField: "_id",
            as: "psychologistLanguage",
          },
        },
        {
          $lookup: {
            from: "psychologisttypes",
            localField: "psychologistType",
            foreignField: "_id",
            as: "psychologistType",
          },
        },
        {
          $unwind: {
            path: "$psychologistType",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $match: filteredQuery,
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ];

      const getUser = await User.aggregate(query);
      // const getUser = await User.find({ type: req.params.type }).populate(
      //   "therapists psychologistLanguage languageId areaOfExperties subscription psychologistType"
      // );
      return _RS.ok(res, "SUCCESS", "List", getUser, new Date().getTime());
    } catch (error) {
      next(error);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const getUser = await User.findOne({ _id: req.params.id });
      let password = await Auth.encryptPassword(req.body.new_password);
      getUser.password = password;
      getUser.save();
      return _RS.ok(
        res,
        "SUCCESS",
        "Change Password successfully",
        getUser,
        new Date().getTime()
      );
    } catch (error) {}
  }
}
