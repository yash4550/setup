define({ "api": [
  {
    "type": "post",
    "url": "/api/app/booking/cancel-ride",
    "title": "Cancel Ride List",
    "version": "1.0.0",
    "name": "Cancel_Ride_List",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "post",
    "url": "/api/app/booking/get-booking/:id",
    "title": "Get Booking",
    "version": "1.0.0",
    "name": "Get_Booking",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "get",
    "url": "/api/app/booking/get-booking-driver/:lat/:long",
    "title": "Get Booking Driver",
    "version": "1.0.0",
    "name": "Get_Booking_Driver",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "get",
    "url": "/api/app/booking/get-booking-list/:status",
    "title": "Get Booking List",
    "version": "1.0.0",
    "name": "Get_Booking_List",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "get",
    "url": "/api/app/booking/get-booking-list-customer/:status",
    "title": "Get Booking List",
    "version": "1.0.0",
    "name": "Get_Booking_List",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "get",
    "url": "/api/app/booking/pre-booking-ride-list",
    "title": "Pre Booking Ride List",
    "version": "1.0.0",
    "name": "Pre_Booking_Ride_List",
    "group": "App-Booking",
    "filename": "src/controllers/User/BookingController.ts",
    "groupTitle": "App-Booking"
  },
  {
    "type": "get",
    "url": "/api/common/country",
    "title": "Counrty List",
    "version": "1.0.0",
    "name": "Country_List",
    "group": "App-Common",
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/get-cancel-reason",
    "title": "Get Cancel Reason",
    "version": "1.0.0",
    "name": "Get_Cancel_Reason",
    "group": "App-Common",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\" get Cancel Reason\",\"data\":{\"data\":[{\"is_status\":true,\"is_deleted\":false,\"_id\":\"66308c96babf0f8b3482bfff\",\"title\":\"Other\",\"created_at\":\"2024-04-30T06:15:50.135Z\",\"updated_at\":\"2024-04-30T06:15:50.135Z\",\"__v\":0},{\"is_status\":true,\"is_deleted\":false,\"_id\":\"66308c96babf0f8b3482c001\",\"title\":\"Driver Is not meet\",\"created_at\":\"2024-04-30T06:15:50.249Z\",\"updated_at\":\"2024-04-30T06:15:50.249Z\",\"__v\":0}]},\"exeTime\":150157}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/get-content/:slug",
    "title": "Get content",
    "version": "1.0.0",
    "name": "Get_content",
    "group": "App-Common",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\" get Content\",\"data\":{\"data\":[{\"is_status\":true,\"_id\":\"6613cb6022e791cc72fa1905\",\"isActive\":true,\"isDeleted\":false,\"name\":\"FAQ\",\"description\":\"<p><strong>Terms &amp; Conditions</strong></p><p><br></p><p>Welcome to Cherlish – your next dating station! Before you start swiping, please take a moment to read and understand our terms and conditions. By using our app, you agree to abide by these rules.</p><p>&nbsp;</p><p><strong>1. Eligibility:</strong></p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You must be at least 18 years old to use this app.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;You are responsible for providing accurate information about yourself.</p><p><strong>2. App Usage:</strong></p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This app is for personal, non-commercial use only.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;No impersonation, harassment, or harmful activities are allowed.</p><p><strong>3. User Conduct:</strong></p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Be respectful, kind, and considerate to other users.</p><p>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Do not post offensive, explicit, or inappropriate content.</p><p><strong>4. Privacy:</strong></p><ul><li>·&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We respect your privacy. Please review our Privacy Policy for detailed information.</li></ul>\",\"slug\":\"faq\",\"createdAt\":\"2023-10-16T05:45:27.115Z\",\"updatedAt\":\"2024-03-27T13:32:11.124Z\",\"__v\":1,\"faq\":[{\"answer\":\"English One Answer\",\"_id\":\"64e6da87f57c963fc0e8259c\",\"question\":\"English One Question\"},{\"answer\":\"English Two Answer\",\"_id\":\"64e6e5f4323f0030c017228c\",\"question\":\"English Two Question\"},{\"question\":\"English third Question\",\"answer\":\"English Third Question\"}],\"is_active\":true,\"is_delete\":false,\"updated_at\":\"2024-04-08T11:43:29.945Z\"}]},\"exeTime\":6248}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "post",
    "url": "/api/common/image-upload",
    "title": "Image Upload",
    "version": "1.0.0",
    "name": "Image_Upload",
    "group": "App-Common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "File",
            "optional": false,
            "field": "profilePic",
            "description": "<p>Profile Pic</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"status\": 200,\n    \"statusText\": \"SUCCESS\",\n    \"message\": \"Image Uploaded Successfully\",\n    \"data\": {\n        \"upload\": \"taxi/profile/image_1685013073538.png\"\n    },\n    \"exeTime\": 0\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/make-list",
    "title": "Make List",
    "version": "1.0.0",
    "name": "Make_List",
    "group": "App-Common",
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/model-list/:id",
    "title": "Model List",
    "version": "1.0.0",
    "name": "Model_List",
    "group": "App-Common",
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/state/:country_id",
    "title": "State List",
    "version": "1.0.0",
    "name": "State_List",
    "group": "App-Common",
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/city",
    "title": "City List",
    "version": "1.0.0",
    "name": "State_List",
    "group": "App-Common",
    "query": [
      {
        "group": "Query",
        "type": "Number",
        "optional": false,
        "field": "country_id",
        "description": "<p>eg.- 91</p>"
      }
    ],
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "get",
    "url": "/api/common/type-list",
    "title": "Type List",
    "version": "1.0.0",
    "name": "Type_List",
    "group": "App-Common",
    "filename": "src/controllers/CommonController.ts",
    "groupTitle": "App-Common"
  },
  {
    "type": "post",
    "url": "/api/app/tip/add-tip",
    "title": "Add Tip",
    "version": "1.0.0",
    "name": "Add_Tip",
    "group": "App-TIP",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "amount",
            "description": "<p>amount.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "driverId",
            "description": "<p>driverId.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"amount\":20,\"driverId\":\"\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"add tip\",\"data\":[]}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/TipController.ts",
    "groupTitle": "App-TIP"
  },
  {
    "type": "get",
    "url": "/api/app/tip/get-tip",
    "title": "Get Tip",
    "version": "1.0.0",
    "name": "Get_Tip",
    "group": "App-TIP",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"get Tip\",\"data\":[]}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/TipController.ts",
    "groupTitle": "App-TIP"
  },
  {
    "type": "get",
    "url": "/api/app/tip/get-tip-amount",
    "title": "Get Tip Amount",
    "version": "1.0.0",
    "name": "Get_Tip_Amount",
    "group": "App-TIP",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\" get Tip Amount\",\"data\":{\"data\":[{\"is_status\":true,\"_id\":\"663092b7f0362d4c04a585c1\",\"amount\":10,\"created_at\":\"2024-04-30T06:41:59.552Z\",\"updated_at\":\"2024-04-30T06:41:59.552Z\",\"__v\":0},{\"is_status\":true,\"_id\":\"663092b7f0362d4c04a585c4\",\"amount\":5,\"created_at\":\"2024-04-30T06:41:59.553Z\",\"updated_at\":\"2024-04-30T06:41:59.553Z\",\"__v\":0},{\"is_status\":true,\"_id\":\"663092b7f0362d4c04a585c2\",\"amount\":20,\"created_at\":\"2024-04-30T06:41:59.553Z\",\"updated_at\":\"2024-04-30T06:41:59.553Z\",\"__v\":0},{\"is_status\":true,\"_id\":\"663092b7f0362d4c04a585c3\",\"amount\":30,\"created_at\":\"2024-04-30T06:41:59.553Z\",\"updated_at\":\"2024-04-30T06:41:59.553Z\",\"__v\":0}]},\"exeTime\":25438}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/TipController.ts",
    "groupTitle": "App-TIP"
  },
  {
    "type": "post",
    "url": "/api/app/user/add-address",
    "title": "Add Address",
    "version": "1.0.0",
    "name": "Add_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"type\":\"Pickup\",\"address\":\"Jaipur\",\"latitude\":22.8,\"longitude\":77,\"addressType\":\"Home\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"data\":{},\"exeTime\":1178344}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "post",
    "url": "/api/app/user/edit-address/:id",
    "title": "edit Address",
    "version": "1.0.0",
    "name": "Add_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "addressType",
            "description": "<p>addressType</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"type\":\"Pickup\",\"address\":\"Jaipur\",\"latitude\":22.8,\"longitude\":77,\"addressType\":\"Home\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Edit Address\",\"data\":{\"location\":{\"type\":\"Point\",\"coordinates\":[77,22.8]},\"address\":\"Jaipur\",\"latitude\":22.8,\"longitude\":77,\"type\":\"Pickup\",\"city\":null,\"state\":null,\"country\":null,\"landmark\":null,\"house_no\":null,\"street\":null,\"addressType\":\"Home\",\"isDefault\":true,\"_id\":\"661a43beb602f2a27c7a1b69\",\"created_at\":\"2024-04-13T08:35:10.876Z\",\"updated_at\":\"2024-04-13T08:35:10.876Z\",\"__v\":0},\"exeTime\":73691}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "post",
    "url": "/api/app/user/add-car",
    "title": "Add Car",
    "version": "1.0.0",
    "name": "Add_Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carType",
            "description": "<p>carType.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carMake",
            "description": "<p>carMake.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carModel",
            "description": "<p>carModel</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carName",
            "description": "<p>carName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carImage",
            "description": "<p>carImage</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rightExrerior",
            "description": "<p>rightExrerior</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "leftExrerior",
            "description": "<p>leftExrerior</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "backNumberPlate",
            "description": "<p>backNumberPlate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "frontNumberPlate",
            "description": "<p>frontNumberPlate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chassisNumber",
            "description": "<p>chassisNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carRegistrationCertificate",
            "description": "<p>carRegistrationCertificate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carRegistrationCertificateBack",
            "description": "<p>carRegistrationCertificateBack</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carPermit",
            "description": "<p>carPermit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carInsurance",
            "description": "<p>carInsurance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>carNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carColor",
            "description": "<p>carColor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fuelType",
            "description": "<p>fuelType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carPuc",
            "description": "<p>carPuc</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"carType\":\"Pickup\",\"carMake\":\"Jaipur\",\"carModel\":22.8,\"carName\":77,\"carImage\":\"Home\",\"rightExrerior\":\"Pickup\",\"leftExrerior\":\"Jaipur\",\"backNumberPlate\":22.8,\"frontNumberPlate\":77,\"chassisNumber\":\"Home\",\"carRegistrationCertificate\":\"HTtp\",\"carPermit\":\"\",\"carInsurance\":\"\",\"carNumber\":\"\",\"carColor\":\"\",\"fuelType\":\"\",\"carPuc\":\"\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Car add\",data\":{},\"exeTime\":1178344}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "post",
    "url": "/api/app/user/edit-car",
    "title": "Edit Car",
    "version": "1.0.0",
    "name": "Edit_Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehicle_id",
            "description": "<p>car id</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isDefault",
            "description": "<p>isDefault</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isApprove",
            "description": "<p>isApprove</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carType",
            "description": "<p>carType.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carMake",
            "description": "<p>carMake.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carModel",
            "description": "<p>carModel</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carName",
            "description": "<p>carName</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carImage",
            "description": "<p>carImage</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "rightExrerior",
            "description": "<p>rightExrerior</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "leftExrerior",
            "description": "<p>leftExrerior</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "backNumberPlate",
            "description": "<p>backNumberPlate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "frontNumberPlate",
            "description": "<p>frontNumberPlate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "chassisNumber",
            "description": "<p>chassisNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carRegistrationCertificate",
            "description": "<p>carRegistrationCertificate</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carRegistrationCertificateBack",
            "description": "<p>carRegistrationCertificateBack</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carPermit",
            "description": "<p>carPermit</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carInsurance",
            "description": "<p>carInsurance</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carNumber",
            "description": "<p>carNumber</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carColor",
            "description": "<p>carColor</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fuelType",
            "description": "<p>fuelType</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "carPuc",
            "description": "<p>carPuc</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-address/:id",
    "title": "Get  Address",
    "version": "1.0.0",
    "name": "Get_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Get Address\",\"data\":{\"location\":{\"type\":\"Point\",\"coordinates\":[77,22.8]},\"address\":\"Jaipur\",\"latitude\":22.8,\"longitude\":77,\"type\":\"Pickup\",\"city\":null,\"state\":null,\"country\":null,\"landmark\":null,\"house_no\":null,\"street\":null,\"addressType\":\"Home\",\"isDefault\":true,\"_id\":\"661a43beb602f2a27c7a1b69\",\"created_at\":\"2024-04-13T08:35:10.876Z\",\"updated_at\":\"2024-04-13T08:35:10.876Z\",\"__v\":0},\"exeTime\":73691}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-all-address",
    "title": "Get All Address",
    "version": "1.0.0",
    "name": "Get_All_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"data\":{\"data\":[{\"location\":{\"type\":\"Point\",\"coordinates\":[77,22.8]},\"address\":\"Jaipur\",\"latitude\":22.8,\"longitude\":77,\"type\":\"Pickup\",\"city\":null,\"state\":null,\"country\":null,\"landmark\":null,\"house_no\":null,\"street\":null,\"addressType\":\"Home\",\"isDefault\":true,\"_id\":\"661a44e9372b2ba1c86d63f5\",\"user\":\"661a2f234446a74948fe55c0\",\"created_at\":\"2024-04-13T08:40:09.447Z\",\"updated_at\":\"2024-04-13T08:40:09.447Z\",\"__v\":0}]},\"exeTime\":13440}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "delete",
    "url": "/api/app/user/remove-address/:id",
    "title": "Remove Address",
    "version": "1.0.0",
    "name": "Remove_Address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"remove address successfully\",\"data\":{},\"exeTime\":1178344}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-promo-code/:id",
    "title": "get-promo-code",
    "version": "1.0.0",
    "name": "get-promo-code",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Address",
    "filename": "src/controllers/User/PromoCodeController.ts",
    "groupTitle": "App-User-Address"
  },
  {
    "type": "get",
    "url": "/api/app/user/default-car/:id",
    "title": "Default Car",
    "version": "1.0.0",
    "name": "Default_Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User-Car",
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User-Car"
  },
  {
    "type": "post",
    "url": "/api/app/user/change-password",
    "title": "Change Password",
    "version": "1.0.0",
    "name": "Change-Password",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Old Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "new_password",
            "description": "<p>New Password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"password\":\"abc123\",\"new_password\":\"abc896\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Change Password Successfully\",\"data\":{},\"exeTime\":449}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist ,Please check the credentials\",\"data\":{},\"exeTime\":271}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "get",
    "url": "/api/app/user/delete-account",
    "title": "Delete Account",
    "version": "1.0.0",
    "name": "Delete-Account",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Delete Account Successfully\",\"data\":{},\"exeTime\":449}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-all-driver?lat=23.32&long=253.32",
    "title": "Get All Driver",
    "version": "1.0.0",
    "name": "Get_All_Driver",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\"Driver List\",\"data\":{\"data\":[{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"660d33f1106741c0502521ca\",\"email\":\"kumar@yopmail.com\",\"mobileNumber\":\"544544555445\",\"countryCode\":\"965\",\"name\":\"Kumar Driver\",\"userName\":\"Kumar Driver\",\"password\":\"$2b$10$mcGahVn8bSqihdsELhYQlunDt.9ycyU3I8AEUYTEg9KRcSM5YMwK2\",\"created_at\":\"2024-04-03T10:48:17.341Z\",\"updated_at\":\"2024-04-03T10:48:17.341Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"6610011b76e6f2f377f8c74f\",\"email\":\"rak@yopmail.com\",\"mobileNumber\":\"665655665656\",\"countryCode\":\"965\",\"name\":\"Saini Rak\",\"userName\":\"Saini Rak\",\"password\":\"$2b$10$vhPg/rtG7iS6/sY.NqHGKuY6/iBdJtdAI1hBhYxi7d99pwfGHi1.q\",\"created_at\":\"2024-04-05T13:48:11.462Z\",\"updated_at\":\"2024-04-05T13:48:11.462Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":false,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"661509e676e6f2f377f8cb1c\",\"email\":\"driverraju@yopmail.com\",\"mobileNumber\":\"7567657687\",\"countryCode\":\"91\",\"name\":\"Driver Raju\",\"userName\":\"Driver Raju\",\"password\":\"$2b$10$Yfe2Yxk9/eRVRyeEKehIUO3g8TNstrmWSgSk.rPTvlUzX5my55lZ6\",\"created_at\":\"2024-04-09T09:27:02.996Z\",\"updated_at\":\"2024-04-09T09:32:12.210Z\",\"__v\":0}]},\"exeTime\":50551}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-all-driver?lat=23.32&long=253.32",
    "title": "Get  Driver List",
    "version": "1.0.0",
    "name": "Get_Driver_List",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\"Driver List\",\"data\":{\"data\":[{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"660d33f1106741c0502521ca\",\"email\":\"kumar@yopmail.com\",\"mobileNumber\":\"544544555445\",\"countryCode\":\"965\",\"name\":\"Kumar Driver\",\"userName\":\"Kumar Driver\",\"password\":\"$2b$10$mcGahVn8bSqihdsELhYQlunDt.9ycyU3I8AEUYTEg9KRcSM5YMwK2\",\"created_at\":\"2024-04-03T10:48:17.341Z\",\"updated_at\":\"2024-04-03T10:48:17.341Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"6610011b76e6f2f377f8c74f\",\"email\":\"rak@yopmail.com\",\"mobileNumber\":\"665655665656\",\"countryCode\":\"965\",\"name\":\"Saini Rak\",\"userName\":\"Saini Rak\",\"password\":\"$2b$10$vhPg/rtG7iS6/sY.NqHGKuY6/iBdJtdAI1hBhYxi7d99pwfGHi1.q\",\"created_at\":\"2024-04-05T13:48:11.462Z\",\"updated_at\":\"2024-04-05T13:48:11.462Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":false,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"661509e676e6f2f377f8cb1c\",\"email\":\"driverraju@yopmail.com\",\"mobileNumber\":\"7567657687\",\"countryCode\":\"91\",\"name\":\"Driver Raju\",\"userName\":\"Driver Raju\",\"password\":\"$2b$10$Yfe2Yxk9/eRVRyeEKehIUO3g8TNstrmWSgSk.rPTvlUzX5my55lZ6\",\"created_at\":\"2024-04-09T09:27:02.996Z\",\"updated_at\":\"2024-04-09T09:32:12.210Z\",\"__v\":0}]},\"exeTime\":50551}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "get",
    "url": "/api/app/user/get-profile",
    "title": "Get Profile",
    "version": "1.0.0",
    "name": "Get_Profile",
    "group": "App-User",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Get Profile Successfully\",\"data\":{\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"User\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":true,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":\"\",\"latitude\":23.2554,\"longitude\":75.3256,\"deviceToken\":\"\",\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"_id\":\"66151ffb553cc450e4bd5043\",\"userId\":\"9403916\",\"email\":\"harshit12@yopmail.com\",\"password\":\"$2b$10$1W0TcLfoZf8.z1ABR.ICX.OnRsGaaEG7bOeHOfgjvm4ykTfKDX4zW\",\"name\":\"Test\",\"created_at\":\"2024-04-09T11:01:15.235Z\",\"updated_at\":\"2024-04-09T11:54:49.246Z\",\"__v\":0,\"address\":\"Jaipur\",\"countryCode\":\"91\",\"gender\":\"male\",\"mobileNumber\":\"64646446\"},\"exeTime\":35}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "DELETE",
    "url": "/api/app/user/remove-car",
    "title": "Remove Car",
    "version": "1.0.0",
    "name": "Remove_Car",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "vehicle_id",
            "description": "<p>car id</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"status\": 200,\n   \"statusText\": \"Success\",\n   \"message\": \"Car remove Successfully\",\n   \"data\": {},\n   \"exeTime\": 9788\n}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "post",
    "url": "/api/app/user/update-profile",
    "title": "Update Profile",
    "version": "1.0.0",
    "name": "Update_Profile",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>mobileNumber.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "countryCode",
            "description": "<p>countryCode.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>Gender</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profileImage",
            "description": "<p>profileImage</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "govermentId",
            "description": "<p>govermentId</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "bankAccountDocument",
            "description": "<p>bankAccountDocument</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "drivingLicence",
            "description": "<p>drivingLicence</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isProfileCompleted",
            "description": "<p>isProfileCompleted</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "isOnline",
            "description": "<p>isOnline</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"gender\":\"male\",\"mobileNumber\":\"64646446\",\"countryCode\":\"91\",\"latitude\":23.2554,\"longitude\":75.3256,\"address\":\"Jaipur\",\"profileImage\":\"\",\"govermentId\":\"\",\"bankAccountDocument\":\"\",\"drivingLicence\":\"\",\"gender\":\"Male\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Update Profile Successfully\",\"data\":{\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"User\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":true,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":\"\",\"latitude\":23.2554,\"longitude\":75.3256,\"deviceToken\":\"\",\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"_id\":\"66151ffb553cc450e4bd5043\",\"userId\":\"9403916\",\"email\":\"harshit12@yopmail.com\",\"password\":\"$2b$10$1W0TcLfoZf8.z1ABR.ICX.OnRsGaaEG7bOeHOfgjvm4ykTfKDX4zW\",\"name\":\"Test\",\"created_at\":\"2024-04-09T11:01:15.235Z\",\"updated_at\":\"2024-04-09T11:13:59.117Z\",\"__v\":0,\"gender\":\"male\",\"mobileNumber\":\"64646446\",\"countryCode\":\"91\",\"address\":\"Jaipur\"},\"exeTime\":42}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not found\",\"data\":{},\"exeTime\":271}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "get",
    "url": "/api/app/user/saved-address",
    "title": "Saved Address",
    "version": "1.0.0",
    "name": "saved-address",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Pass jwt token.</p>"
          }
        ]
      }
    },
    "group": "App-User",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"Success\",\"message\":\"Driver List\",\"data\":{\"data\":[{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"660d33f1106741c0502521ca\",\"email\":\"kumar@yopmail.com\",\"mobileNumber\":\"544544555445\",\"countryCode\":\"965\",\"name\":\"Kumar Driver\",\"userName\":\"Kumar Driver\",\"password\":\"$2b$10$mcGahVn8bSqihdsELhYQlunDt.9ycyU3I8AEUYTEg9KRcSM5YMwK2\",\"created_at\":\"2024-04-03T10:48:17.341Z\",\"updated_at\":\"2024-04-03T10:48:17.341Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"6610011b76e6f2f377f8c74f\",\"email\":\"rak@yopmail.com\",\"mobileNumber\":\"665655665656\",\"countryCode\":\"965\",\"name\":\"Saini Rak\",\"userName\":\"Saini Rak\",\"password\":\"$2b$10$vhPg/rtG7iS6/sY.NqHGKuY6/iBdJtdAI1hBhYxi7d99pwfGHi1.q\",\"created_at\":\"2024-04-05T13:48:11.462Z\",\"updated_at\":\"2024-04-05T13:48:11.462Z\",\"__v\":0},{\"gender\":\"Male\",\"age\":0,\"is_active\":false,\"is_deleted\":false,\"otp\":null,\"creditLimit\":0,\"language\":\"en\",\"type\":\"Driver\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":null,\"latitude\":0,\"longitude\":0,\"deviceToken\":null,\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"profileImage\":null,\"bankAccountDocument\":null,\"drivingLicence\":null,\"govermentId\":null,\"_id\":\"661509e676e6f2f377f8cb1c\",\"email\":\"driverraju@yopmail.com\",\"mobileNumber\":\"7567657687\",\"countryCode\":\"91\",\"name\":\"Driver Raju\",\"userName\":\"Driver Raju\",\"password\":\"$2b$10$Yfe2Yxk9/eRVRyeEKehIUO3g8TNstrmWSgSk.rPTvlUzX5my55lZ6\",\"created_at\":\"2024-04-09T09:27:02.996Z\",\"updated_at\":\"2024-04-09T09:32:12.210Z\",\"__v\":0}]},\"exeTime\":50551}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/UserController.ts",
    "groupTitle": "App-User"
  },
  {
    "type": "post",
    "url": "/api/app/auth/forget-password",
    "title": "Forget Password",
    "version": "1.0.0",
    "name": "Forget_Password",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\"email\":\"harshit12@yopmail.com\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Send OTP on this email pls verify the OTP \",\"data\":{},\"exeTime\":258}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist with this email\",\"data\":{},\"exeTime\":331}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/login",
    "title": "Login",
    "version": "1.0.0",
    "name": "Login",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User Type (&quot;User,Driver&quot;).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"email\":\"qwe@gmail.com\",\"password\":\"abc123\",\"type\":\"User\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Login Successfully\",\"data\":{\"user\":{\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":\"2507\",\"creditLimit\":0,\"language\":\"en\",\"type\":\"User\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"\",\"country\":null,\"endDate\":null,\"voipToken\":\"\",\"latitude\":0,\"longitude\":0,\"deviceToken\":\"\",\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"_id\":\"66151ffb553cc450e4bd5043\",\"userId\":\"9403916\",\"email\":\"harshit12@yopmail.com\",\"password\":\"$2b$10$4Hu44KGQnJxOTp7zk/3yiOYk92tYRUsHFrvW1iG0b/iZJVvkV4hXO\",\"name\":\"Test\",\"created_at\":\"2024-04-09T11:01:15.235Z\",\"updated_at\":\"2024-04-09T11:04:37.870Z\",\"__v\":0},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE1MWZmYjU1M2NjNDUwZTRiZDUwNDMiLCJlbWFpbCI6ImhhcnNoaXQxMkB5b3BtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNzEyNjYxMDg1LCJleHAiOjE3MTI3NDc0ODV9.P5oT3jke2Su8TQzdntlF0UW-GFrvbzGCRyzTMhCQEBo\"},\"exeTime\":165}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist ,Please check the credentials\",\"data\":{},\"exeTime\":271}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "get",
    "url": "/api/app/auth/logout",
    "title": "Logout",
    "version": "1.0.0",
    "name": "Logout",
    "group": "App-auth",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Logout  Successfully\",\"data\":{},\"exeTime\":232}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/resend-otp",
    "title": "Resend OTP",
    "version": "1.0.0",
    "name": "Resend_OTP",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>type.</p>"
          }
        ]
      }
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/reset-password",
    "title": "Reset Password",
    "version": "1.0.0",
    "name": "Reset_Password",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\"email\":\"harshit12@yopmail.com\", \"password\":\"abc123\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Password Changed Successfully\",\"data\":{},\"exeTime\":433}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist with this email\",\"data\":{},\"exeTime\":331}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/verify-otp",
    "title": "Verify OTP",
    "version": "1.0.0",
    "name": "Verify_OTP",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp",
            "description": "<p>OTP.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\"email\":\"harshit12@yopmail.com\", \"otp\":\"2507\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Verify OTP Successfully\",\"data\":{},\"exeTime\":232}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist with this email\",\"data\":{},\"exeTime\":331}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/verify-otp-authenticate",
    "title": "Verify OTP Email",
    "version": "1.0.0",
    "name": "Verify_OTP_Email",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "otp",
            "description": "<p>OTP.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\"email\":\"harshit12@yopmail.com\", \"otp\":\"2507\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"Verify OTP Successfully\",\"data\":{\"user\":{\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":\"2507\",\"creditLimit\":0,\"language\":\"en\",\"type\":\"User\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":\"\",\"latitude\":0,\"longitude\":0,\"deviceToken\":\"\",\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":true,\"_id\":\"66151ffb553cc450e4bd5043\",\"userId\":\"9403916\",\"email\":\"harshit12@yopmail.com\",\"password\":\"$2b$10$4Hu44KGQnJxOTp7zk/3yiOYk92tYRUsHFrvW1iG0b/iZJVvkV4hXO\",\"name\":\"Test\",\"created_at\":\"2024-04-09T11:01:15.235Z\",\"updated_at\":\"2024-04-09T11:01:15.235Z\",\"__v\":0},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjE1MWZmYjU1M2NjNDUwZTRiZDUwNDMiLCJlbWFpbCI6ImhhcnNoaXQxMkB5b3BtYWlsLmNvbSIsInR5cGUiOiJVc2VyIiwiaWF0IjoxNzEyNjYwNjc3LCJleHAiOjE3MjEzMDA2Nzd9.-2bHKP1CYRvK7ADYquXx57kU-a9IYj0-DcKuVCcqoOY\"},\"exeTime\":35}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Not Found",
          "content": "{\"status\":404,\"statusText\":\"NOTFOUND\",\"message\":\"User not exist with this email\",\"data\":{},\"exeTime\":331}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/sign-up",
    "title": "Signup",
    "version": "1.0.0",
    "name": "sign-up",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User Type (&quot;User,Driver&quot;).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginType",
            "description": "<p>Login Type (&quot;Email,Google,Facebook,Apple&quot;).</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"email\": \"jhfhfj@gmail.com\",\"password\": \"abc123\",\"name\": \"Test\",\"type\": \"User\",\"loginType\": \"Email\",\"deviceToken\":\"\",\"deviceType\":\"Android\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":201,\"statusText\":\"CREATED\",\"message\":\"SignUp successfully\",\"data\":{\"user\":{\"age\":0,\"is_active\":true,\"is_deleted\":false,\"otp\":\"8782\",\"creditLimit\":0,\"language\":\"en\",\"type\":\"User\",\"profilePic\":null,\"description\":null,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":true,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Email\",\"deviceType\":\"Android\",\"country\":null,\"endDate\":null,\"voipToken\":\"\",\"latitude\":0,\"longitude\":0,\"deviceToken\":\"\",\"socialId\":null,\"myReferralCode\":null,\"referByCode\":null,\"accountId\":null,\"isVerify\":false,\"_id\":\"66151e2e6f8c163e109832da\",\"userId\":\"9979665\",\"email\":\"jhfhfj@gmail.com\",\"password\":\"$2b$10$.40XJGtnt/KV89zTRFGSu.SjWIGTPRXyI1fDfJHFsjo6KHESD5KO.\",\"name\":\"Test\",\"created_at\":\"2024-04-09T10:53:34.507Z\",\"updated_at\":\"2024-04-09T10:53:34.507Z\",\"__v\":0}}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response Conflict",
          "content": "{\"status\":409,\"statusText\":\"CONFLICT\",\"message\":\"User already exist with this email\",\"data\":{},\"exeTime\":75}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "post",
    "url": "/api/app/auth/social-signup",
    "title": "Social Signup",
    "version": "1.0.0",
    "name": "social-sign-up",
    "group": "App-auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>User Type (&quot;Driver,User&quot;).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "loginType",
            "description": "<p>Login Type (&quot;Email,Google,Facebook,Apple&quot;).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "socialId",
            "description": "<p>Social ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "profileImage",
            "description": "<p>Social image.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceToken",
            "description": "<p>Device Token.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "deviceType",
            "description": "<p>Device Type.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Normal-signUp-Request-Example:",
          "content": "{\"email\":\"a236@gmail.com\",\"name\":\"AWE\",\"type\":\"User\",\"loginType\":\"Google\",\"deviceToken\":\"deviceToken\",\"socialId\":\"ACd234\",\"deviceType\":\"Ios\"}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":201,\"statusText\":\"CREATED\",\"message\":\"SignUp sucessfully\",\"data\":{\"user\":{\"age\":0,\"gossipSection\":\"No\",\"is_active\":true,\"is_deleted\":false,\"otp\":null,\"percentage\":0,\"language\":\"en\",\"appLanguage\":\"en\",\"type\":\"Expact\",\"profilePic\":null,\"psychologistLanguage\":[],\"description\":null,\"noOfClick\":0,\"loginTime\":null,\"logoutTime\":[],\"isQuestionSubmit\":false,\"isSuicide\":false,\"isProfileCompleted\":false,\"is_notification\":true,\"isApprove\":false,\"isHaveTherapists\":false,\"isSubscription\":false,\"experience\":0,\"loginType\":\"Google\",\"areaOfExperties\":[],\"otherExperties\":[],\"refferalCount\":0,\"endDate\":null,\"freeSession\":2,\"completedFreeSession\":0,\"paidSession\":0,\"completedPaidSession\":0,\"latitude\":0,\"longitude\":0,\"addrsss\":null,\"totalAmount\":0,\"psychologistCommission\":0,\"perSession\":0,\"deviceToken\":\"deviceToken\",\"socialId\":\"ACd234\",\"_id\":\"6499633224a6d7062c440643\",\"email\":\"a236@gmail.com\",\"name\":\"AWE\",\"password\":\"$2b$10$czvw1B2VucOSuwl7sSxiLeMQxsw8Osv3exoE9YFYnXdum6kVYvStC\",\"education\":[],\"created_at\":\"2023-06-26T10:06:42.370Z\",\"updated_at\":\"2023-06-26T10:06:42.370Z\",\"__v\":0},\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDk5NjMzMjI0YTZkNzA2MmM0NDA2NDMiLCJlbWFpbCI6ImEyMzZAZ21haWwuY29tIiwidHlwZSI6IkV4cGFjdCIsImlhdCI6MTY4Nzc3NDAwMiwiZXhwIjoxNjg3ODYwNDAyfQ.Ki1RNioT2EDcB81shxi4wP_D-xKEz7LQQyz-D_kX7io\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/AuthController.ts",
    "groupTitle": "App-auth"
  },
  {
    "type": "get",
    "url": "/api/app/notification/get-list?limit=1&page=2",
    "title": "Notification List",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................</p>"
          }
        ]
      }
    },
    "name": "Notification_List",
    "group": "Notification_API",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"statusText\":\"SUCCESS\",\"message\":\"NotificationList\",\"data\":{\"docs\":[{\"_id\":\"661a47060645269aaae044f2\",\"type\":\"Admin\",\"image\":null,\"allUser\":false,\"is_read\":false,\"user\":\"661a2f234446a74948fe55c0\",\"title\":\"Hello\",\"message\":\"Hello\",\"created_at\":\"2024-04-13T08:49:10.822Z\",\"updated_at\":\"2024-04-13T08:49:10.822Z\",\"__v\":0}],\"totalDocs\":1,\"limit\":10,\"page\":1,\"totalPages\":1,\"pagingCounter\":1,\"hasPrevPage\":false,\"hasNextPage\":false,\"prevPage\":null,\"nextPage\":null},\"exeTime\":182237}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/NotificationController.ts",
    "groupTitle": "Notification_API"
  },
  {
    "type": "delete",
    "url": "/api/app/notification/delete-notification?notificationId=63731fbae74f02ba9ba64ad6",
    "title": "Delete Notification",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................</p>"
          }
        ]
      }
    },
    "name": "delete-notification",
    "group": "Notification_API",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"message\":\"Delete Notification\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/NotificationController.ts",
    "groupTitle": "Notification_API"
  },
  {
    "type": "put",
    "url": "/api/app/notification/read-notification?notificationId=6576f6076af77b38a16a77eb",
    "title": "Read Notification",
    "version": "1.0.0",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "string",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.......................</p>"
          }
        ]
      }
    },
    "name": "read-notification",
    "group": "Notification_API",
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\"status\":200,\"message\":\"Read Notification\",\"data\":{}}",
          "type": "json"
        }
      ]
    },
    "filename": "src/controllers/User/NotificationController.ts",
    "groupTitle": "Notification_API"
  }
] });
