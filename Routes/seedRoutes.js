import express from "express";
import User from "../Models/UserModel.js";
import Content from "../Models/ContentModel.js";
import List from "../Models/ListModel.js";
import Genre from "../Models/GenreModel.js";
import {data, genres} from "../data.js";

const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  try {

    await User.deleteMany({});
    await Content.deleteMany({});
    await List.deleteMany({});
    await Genre.deleteMany({});

    const createdUsers = await User.insertMany(data.users); 
    const createdContents = await Content.insertMany(data.content);
    const createdLists = await List.insertMany(data.lists);
    const createdGenres = [];

    for (let index = 0; index < genres.length; index++) {
      const element = genres[index];
      const newGenre = new Genre({genre: element});
      await newGenre.save();
      createdGenres.push(newGenre);
    }

    res.send({createdUsers, createdContents,createdLists,createdGenres});
  } catch (e) {
    console.log("failed to update " + e.message);
  }
});

export default seedRouter;

