const { check, validationResult } = require("express-validator");
const httpStatus = require("http-status");

const addPipelineValidator = [
  check("customerName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add customer Name")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character required !")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

const addNoteValidator = [
  check("title")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add the note title")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character required !")
    .bail(),

  check("content")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add the note content")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character required !")
    .bail(),

  check("customerId")
    .trim()
    .not()
    .isEmpty()
    .withMessage("You need to add the customerId")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Minimum 3 character required !")
    .bail(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(httpStatus.BAD_REQUEST).json({
        errors: errors.array(),
      });
    }
    next();
  },
];

module.exports = {
  addPipelineValidator,
  addNoteValidator,
};
