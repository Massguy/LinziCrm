const Note = require("../models/note");

const addNote = async (body) => {
  try {
    const note = new Note({
      ...body,
    });
    await note.save();
    return note;
  } catch (error) {
    throw error;
  }
};

const getNotesByCustomerId = async (customerId) => {
  try {
    return Note.find({ customerId });
  } catch (error) {
    throw error;
  }
};

const getAllNotes = async (req) => {
  try {
    return Note.find();
  } catch (error) {
    throw error;
  }
};

const updateNotesById = async (id, body) => {

  try {
    const note = await Note.findByIdAndUpdate(
    id, body,  { new: true }
    );
    if (!note) throw new ApiError(httpStatus.NOT_FOUND, "Note not found");
    return note;
  } catch (error) {
    throw error;
  }
};


// const  async (req, res) => {
//   try {
//     const updatedOrder = await Order.findOneAndUpdate(
//       { orderId: req.params.orderId },
//       req.body,
//       { new: true }
//     );
//     res.status(200).send({
//       success: true,
//       data: updatedOrder,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });


/*const getPipelineById = async (_id) => {
  try {
    const pipeline = await Note.findById(_id);
    if (!pipeline)
      throw new ApiError(httpStatus.NOT_FOUND, "Note not found");
    return pipeline;
  } catch (error) {
    throw error;
  }
};

const updatePipelineById = async (_id, body) => {
  try {
    const pipeline = await Note.findOneAndUpdate(
      { _id },
      { $set: body },
      { new: true }
    );
    if (!pipeline)
      throw new ApiError(httpStatus.NOT_FOUND, "Note not found");
    return pipeline;
  } catch (error) {
    throw error;
  }
};

const deletePipelineById = async (_id) => {
  try {
    const pipeline = await Note.findByIdAndRemove(_id);
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
    const pipelines = await Note.find(query);
    return pipelines;
  } catch (error) {
    throw error;
  }
};*/

module.exports = {
  addNote,
  getNotesByCustomerId,
  getAllNotes,
  updateNotesById,
  /* getPipelineById,
  updatePipelineById,
  deletePipelineById,
  allPipelines,*/
};
