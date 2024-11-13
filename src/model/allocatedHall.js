const mongoose = require("mongoose");

const allocationSchema = new mongoose.Schema({
    hall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hall",
        required: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    courseCode: {
        type: String,
        required: true,
        trim: true
    },
    students: {
        type: Number,
        required: true,
        min: 1
    },
    level: {
        type: Number,
        required: true,
     
    },
    allocatedAt: {
        type: Date,
        default: Date.now
    },
});
// Pre-save middleware to set courseCode to uppercase and remove whitespace
allocationSchema.pre("save", function(next) {
    this.courseCode = this.courseCode.replace(/\s+/g, "").toUpperCase();
    next();
});
module.exports = mongoose.model("Allocation", allocationSchema);
