const catModel = require("../Models/catModel");
const addNewCategory = async (req, res, next) => {
  const { name, colorCode } = req.body;
  let existingCat;
  try {
    existingCat = await catModel.findOne({ name: name });
  } catch (error) {
    res.json({
      message: "Something happend while adding category please try again",
      error: false,
    });
    return next(error);
  }
  if (existingCat) {
    res.json({
      message:
        "Category already exists please add a new one or select existing one",
      error: true,
    });
  } else {
    const newCat = new catModel({
      name,
      colorCode,
    });
    try {
      await newCat.save();
    } catch (error) {
      res.json({
        message:
          "Something went wrong while adding new category please try again",
        error: true,
      });
      return next(error);
    }
    res.json({ message: "Category added succesfully", error: false });
  }
};
const getCategories = async (req, res, next) => {
  let allCategories;
  try {
    allCategories = await catModel.find();
  } catch (error) {
    res.json({ message: "Something went wrong please try again", error: true });
    return next(error);
  }
  res.json({ categories: allCategories, error: false });
};
exports.addNewCategory = addNewCategory;
exports.getCategories = getCategories;
