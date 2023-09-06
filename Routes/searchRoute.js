import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genre from "../Models/GenreModel.js";
import { isAuth } from "../Services/authService.js";
import GetSearchFilter from "../Services/GetSearchFilter.js";
import Content from "../Models/ContentModel.js";

const searchRouter = express.Router();

searchRouter.get(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    //Get needed params from query string
    console.log(req.query.query);
    const { query } = req;
    console.log(query);
    // const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;

    //Get search params and sort order from GetFilter service
    const { options } = GetSearchFilter(query);
    console.log(options);

    //Get products that fit the selected filtering and sorting options
    const contents = await Content.find(options);
    const countContents = await Content.countDocuments(options);

    res.send({ contents, page, countContents, pages: 1 });
  })
);

searchRouter.get(
  "/genres",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const data = await Genre.find();
      res.status(200).json(data.map((g) => g.genre));
    } catch (error) {
      res.status(500).json(error);
    }
  })
);

export default searchRouter;
