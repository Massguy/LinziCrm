const express = require("express");
const router = express.Router();
const noteController = require("../controllers/note.controller");
const { addNoteValidator } = require("../middleware/validations");
const auth = require("../middleware/auth");

router.post(
  "/",
  // auth("createAny", "note"),
  addNoteValidator,
  noteController.addNote
);

router
  .get("/:id", noteController.getNotes)
  .patch('/:id',  noteController.updateNotesById);

router.get("/", noteController.getAllNotes);

/*
router
  .route("/pipelines/:id")
  .get(pipelineController.getPipelineById)
  .patch(auth("updateAny", "pipeline"), pipelineController.updatePipelineById)
  .delete(auth("deleteAny", "pipeline"), pipelineController.deletePipelineById);

router.get("/all", pipelineController.allPipelines);*/

module.exports = router;
