const { noteService } = require("../services");

const noteController = {
  async addNote(req, res, next) {
    try {
      const note = await noteService.addNote(req.body);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },
  async getNotes(req, res, next) {
    const { id: customerId } = req.params;

    try {
      const notes = await noteService.getNotesByCustomerId(customerId);
      
      res.json(notes);
    } catch (error) {
      next(error);
    }
  },
  async getAllNotes(req, res, next) {
    try {
      const notes = await noteService.getAllNotes();
      res.json(notes);
    } catch (error) {
      next(error);
    }
  },

  async updateNotesById(req, res, next) {
    const { id } = req.params;
    console.log({ id });
    const body = req.body;
    console.log({ body });
    try {
      const note = await noteService.updateNotesById(id, body);
      res.json(note);
    } catch (error) {
      next(error);
    }
  },
  /*
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
  },*/
};

module.exports = noteController;
