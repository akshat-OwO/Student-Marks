const mongoose = require("mongoose");
const Student = require("../schema/student");

const marks = async (req, res) => {
    const { name, age, gender, marks } = req.body;

    // validation for positive marks
    if (marks.physics.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }
    if (marks.chemistry && marks.chemistry.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }
    if (marks.maths.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }

    // validation for obtained marks not exceeding total marks
    if (marks.physics[0] > marks.physics[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }
    if (marks.chemistry && marks.chemistry[0] > marks.chemistry[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }
    if (marks.maths && marks.maths[0] > marks.maths[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }

    try {
        const response = await Student.create({ name, age, gender, marks });
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

const scores = async (req, res) => {
    const { first_name, last_name, years_old, gender, scores } = req.body;
    const name = first_name + " " + last_name;
    const age = years_old;

    const physicsIndex = scores.subjects.findIndex((p) => p == "physics");
    const chemistryIndex = scores.subjects.findIndex((p) => p == "chemistry");
    const mathsIndex = scores.subjects.findIndex((p) => p == "maths");

    let marks;
    if (chemistryIndex == -1) {
        marks = {
            physics: [
                scores.marks_obtained[physicsIndex],
                scores.total_marks[physicsIndex],
            ],
            maths: [
                scores.marks_obtained[mathsIndex],
                scores.total_marks[mathsIndex],
            ],
        };
    } else {
        marks = {
            physics: [
                scores.marks_obtained[physicsIndex],
                scores.total_marks[physicsIndex],
            ],
            chemistry: [
                scores.marks_obtained[chemistryIndex],
                scores.total_marks[physicsIndex],
            ],
            maths: [
                scores.marks_obtained[mathsIndex],
                scores.total_marks[mathsIndex],
            ],
        };
    }

    // validation for positive marks
    if (marks.physics.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }
    if (marks.chemistry && marks.chemistry.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }
    if (marks.maths.some((marks) => marks < 0)) {
        return res
            .status(400)
            .json({ error: "marks should be positive integers" });
    }

    // validation for obtained marks not exceeding total marks
    if (marks.physics[0] > marks.physics[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }
    if (marks.chemistry && marks.chemistry[0] > marks.chemistry[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }
    if (marks.maths && marks.maths[0] > marks.maths[1]) {
        return res
            .status(400)
            .json({ error: "obtained marks cannot exceed total marks" });
    }

    try {
        const response = await Student.create({ name, age, gender, marks });
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const calculated = async (req, res) => {
    try {
        const model = await Student.find();
        const data = model.map((student) => {
            const physics_percentage =
                (student.marks.physics[0] / student.marks.physics[1]) * 100;
            let chemistry_percentage;
            if (student.marks.chemistry.length > 0) {
                chemistry_percentage =
                    (student.marks.chemistry[0] / student.marks.chemistry[1]) *
                    100;
            }
            const maths_percentage =
                (student.marks.maths[0] / student.marks.maths[1]) * 100;

            let overall_percentage;
            if (student.marks.chemistry.length == 0) {
                overall_percentage =
                    ((student.marks.physics[0] + student.marks.maths[0]) /
                        (student.marks.physics[1] + student.marks.maths[1])) *
                    100;
            } else {
                overall_percentage =
                    ((student.marks.physics[0] +
                        student.marks.maths[0] +
                        student.marks.chemistry[0]) /
                            (student.marks.physics[1] +
                                student.marks.maths[1] +
                                student.marks.chemistry[1])) *
                    100;
            }

            return {
                name: student.name,
                age: student.age,
                gender: student.gender,
                physics_percentage,
                chemistry_percentage,
                maths_percentage,
                overall_percentage,
            };
        });

        const jsonString = await JSON.stringify(data);
        const json = await JSON.parse(jsonString);

        return res.status(200).json(json);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { marks, scores, calculated };
