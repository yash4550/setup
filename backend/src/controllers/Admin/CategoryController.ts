import _RS from "../../helpers/ResponseHelper";
import Category from "../../models/Category";

class CategoryController {
  static async list(req, res, next) {
    try {
      const startTime = new Date().getTime();

      let sort: any = [["createdAt", -1]];
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
            name: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            message: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
          {
            type: {
              $regex: new RegExp(req.query.search),
              $options: "i",
            },
          },
        ];
      }
      if (req.query.start_date && req.query.end_date) {
        filteredQuery.createdAt = {
          $gte: new Date(req.query.start_date),
          $lte: new Date(req.query.end_date),
        };
      }

      if (req.query.start_date && req.query.start_date.trim()) {
        filteredQuery.createdAt = { $gte: new Date(req.query.start_date) };
      }

      if (req.query.end_date && req.query.end_date.trim()) {
        filteredQuery.createdAt = { $lte: new Date(req.query.end_date) };
      }
      let query: any = [
        {
          $match: filteredQuery,
        },
        {
          $sort: {
            created_at: -1,
          },
        },
      ];
      var myAggregate = Category.aggregate(query);
      const list = await Category.aggregatePaginate(myAggregate, options);

      return _RS.ok(res, "SUCCESS", "list", list, new Date().getTime());
    } catch (error) {
      next(error);
    }
  }
  static async addCategory(req, res, next) {
    try {
      const startTime = new Date().getTime();
      const { name, image } = req.body;
      const data = {
        name,
        image,
      };
      const location = await new Category(data).save();
      return _RS.created(res, "SUCCESS", "Add Category Successfully", location);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
