const express = require("express");
const router = express.Router();
const pipelineController = require("../controllers/pipeline.controller");
const auth = require("../middleware/auth");
const { addPipelineValidator } = require("../middleware/validations");

router.post(
  "/",
  auth("createAny", "pipeline"),
  addPipelineValidator,
  pipelineController.addPipeline
);

router
  .route("/pipelines/:id")
  .get(pipelineController.getPipelineById)
  .patch(auth("updateAny", "pipeline"), pipelineController.updatePipelineById)
  .delete(auth("deleteAny", "pipeline"), pipelineController.deletePipelineById);

router.get("/all", pipelineController.allPipelines);
router.post("/paginate/all", 
pipelineController.paginatePipelines)

module.exports = router;
