const { pipelineService } = require("../services");
const pipelineController = {
  async addPipeline(req, res, next) {
    try {
      const pipeline = await pipelineService.addPipeline(req.body);
      res.json(pipeline);
    } catch (error) {
      next(error);
    }
  },
  async getPipelineById(req, res, next) {
    try {
      const _id = req.params.id;
    
      const pipeline = await pipelineService.getPipelineById(_id);
      res.json(pipeline);
    } catch (error) {
      next(error);
    }
  },
  async updatePipelineById(req, res, next) {
    try {
      const _id = req.params.id;
      const pipeline = await pipelineService.updatePipelineById(_id, req.body);
      res.json(pipeline);
    } catch (error) {
      next(error);
    }
  },
  async deletePipelineById(req, res, next) {
    try {
      const _id = req.params.id;
      const pipeline = await pipelineService.deletePipelineById(_id);
      res.json(pipeline);
    } catch (error) {
      next(error);
    }
  },
  async allPipelines(req, res, next) {
    try {
      const pipelines = await pipelineService.allPipelines(req);
      res.json(pipelines);
    } catch (error) {
      next(error);
    }
  },
  async paginatePipelines(req,res,next){
    try{
        const pipelines =await pipelineService.paginatePipelines(req)
        res.json(pipelines);
    } catch(error){
        next(error)
    }
},
};

module.exports = pipelineController;
