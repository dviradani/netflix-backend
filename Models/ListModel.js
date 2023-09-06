import mongoose, { Schema } from "mongoose";

const listSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    contents: [{ type: Schema.Types.ObjectId, ref: "Content" }],
  },
  { timestamps: true }
);

const List = mongoose.model("List", listSchema);
export default List;
