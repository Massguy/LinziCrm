const mongoose = require("mongoose");
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const Schema = mongoose.Schema;
const pipelineSchema = mongoose.Schema({
  customerName: {
    required: [true, "You need a name"],
    type: String,
    maxlength: 100,
  },
  customerContactInward: {
    required: [true, "You need a description"],
    type: String,
    maxlength: 10000,
  },
  customerContactOutward: {
    required: false,
    type: String,
    maxlength: 10000,
  },
  followUp1: {
    required: false,
    type: String,
    maxlength: 10000,
  },
  followUp2: {
    required: false,
    type: String,
    maxlength: 10000,
  },
  customerNotes: {
    required: false,
    type: String,
    maxlength: 10000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

pipelineSchema.plugin(aggregatePaginate);

const Pipeline = mongoose.model("Pipeline", pipelineSchema);
module.exports = {
  Pipeline,
};
