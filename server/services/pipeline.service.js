const { Pipeline } = require("../models/pipeline");

const addPipeline = async (body) => {
  try {
    const pipeline = new Pipeline({
      ...body,
    });
    await pipeline.save();
    return pipeline;
  } catch (error) {
    throw error;
  }
};
const getPipelineById = async (_id) => {
  try {
    const pipeline = await Pipeline.findById(_id);
    if (!pipeline)
      throw new ApiError(httpStatus.NOT_FOUND, "Pipeline not found");
    return pipeline;
  } catch (error) {
    throw error;
  }
};

const updatePipelineById = async (_id, body) => {
  try {
    const pipeline = await Pipeline.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!pipeline)
      throw new ApiError(httpStatus.NOT_FOUND, "Pipeline not found");
    return pipeline;
  } catch (error) {
    throw error;
  }
};

const deletePipelineById = async (_id) => {
  try {
    const pipeline = await Pipeline.findByIdAndRemove(_id);
    if (!pipeline)
      throw new ApiError(httpStatus.NOT_FOUND, "pipeline not found");
    return pipeline;
  } catch (error) {
    throw error;
  }
};

const allPipelines = async (req) => {
  const { searchTerm } = req.query;
  const query = { customerName: { $regex: searchTerm, $options: "i" } };
  try {
    const pipelines = await Pipeline.find(query);
    return pipelines;
  } catch (error) {
    throw error;
  }
};

const paginatePipelines = async (req) => {
  try {
    let aggQueryArray = [];
    if (req.body.keywords && req.body.keywords != "") {
      const re = new RegExp(`${req.body.keywords}`, "gi");
      aggQueryArray.push({
        $match: { model: { $regex: re } },
      });
    }

    let aggQuery = Pipeline.aggregate(aggQueryArray);
    const options = {
      page: req.body.page,
      limit: 6,
      sort: { date: "desc" },
    };
    const pipeline = await Pipeline.aggregatePaginate(aggQuery, options);
    return pipeline;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addPipeline,
  getPipelineById,
  updatePipelineById,
  deletePipelineById,
  allPipelines,
  paginatePipelines,
};
