const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    marks: {
        physics: { type: [Number], required: true },
        chemistry: [Number],
        maths: { type: [Number], required: true },
    },
});

module.exports = mongoose.model("student", studentSchema);
