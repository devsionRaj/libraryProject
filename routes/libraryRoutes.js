const express = require("express");
const authController = require("../controllers/authController");
const libraryController = require("../controllers/libraryController");

const router = express.Router();

router
  .route("/")
  .post(
    authController.protect,
    authController.restrictTo("admin", "clerk"),
    libraryController.createLibraryRecord
  );

router
  .route("/:id")
  .get(libraryController.getLibraryRecord)
  .patch(
    authController.protect,
    authController.restrictTo("admin", "clerk"),
    libraryController.updateLibraryRecord
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin", "clerk"),
    libraryController.deleteLibraryRecord
  );

module.exports = router;
