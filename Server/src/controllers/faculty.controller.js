import { Faculty } from "../models/faculty.model.js";

const getFacultyProfile = async (req, res) => {
  try {
    const { _id } = req.user;

    const faculty = await Faculty.findById(_id);

    if (faculty) {
      return res.status(200).json({ message: "Faculty Profile", faculty });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { getFacultyProfile };
