const { userDataModel } = require("../models/userDataModel");
const userDataController = async (req, res) => {
  try {
    const { name, email, number, location, message } = req.body;

    // ALL FIELD ARE REQUIRED
    if (!name || !email || !number || !location || !message) {
      return res
        .status(400)
        .json({ success: false, message: "All Field Are Required" });
    }

    // CHECK THE EMAIL ALREADY EXIT OR NOT
    const existingUser = await userDataModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email Aready Exits" });
    }

    // CREATE DATA
    const newUsers = await userDataModel.create({
      name,
      email,
      number,
      location,
      message,
    });

    return res.status(201).json({
      success: true,
      message: "Thank you for contacting us",
      newUsers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = userDataController;
