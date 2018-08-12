const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let todoSchema = new Schema(
	{
		title: { type: String, required: true },
		deadline: { type: Date, required: true },
		priority: { type: String, enum: ["None", "Low", "Medium", "High"] },
		notes: { type: String, required: true }
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at"
		}
	}
);

module.exports = mongoose.model("Todo", todoSchema);
