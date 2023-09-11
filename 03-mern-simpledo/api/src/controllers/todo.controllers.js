import { Todo } from '../models/index.js';
import { httpCodes, validate } from '../utils/index.js';
import { configuration } from '../config/index.js';

/**
 * @description Todo Controller
 */
const todoControllers = {
  /**
   * @description Get all documents
   * @return {array}
   */
  get: async (req, res) => {
    try {
      // Get all docs by user id
      const docs = await Todo.find({ userId: req.user }).sort({ createdAt: -1 });
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Create new document
   * @return {object}
   */
  create: async (req, res) => {
    try {
      // Validate fields
      const { error } = validate.todo(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Get field from request body
      const { title } = req.body;
      // Create doc
      const doc = await Todo.create({ title, userId: req.user });
      // Return response
      return res.status(httpCodes.OK.code).json(doc);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },


  /**
   * @description Update document
   * @return {object}
   */
  update: async (req, res) => {
    try {
      // Get ID by request
      const { id } = req.params;
      // Find by ID doc
      const doc = await Todo.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
      }
      // Delete doc
      const updatedDoc = await Todo.findByIdAndUpdate({ _id: doc._id }, req.body, { new: true });
      // Return response
      return res.status(httpCodes.OK.code).json(updatedDoc);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Delete document
   * @return {object}
   */
  delete: async (req, res) => {
    try {
      // Get ID by request
      const { id } = req.params;
      // Find by ID doc
      const doc = await Todo.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ error: 'No such url' });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ error: httpCodes.UNAUTHORIZED.message });
      }
      // Delete doc
      const deletedDoc = await Todo.findOneAndDelete({ _id: doc._id });
      // Return response
      return res.status(httpCodes.OK.code).json({
        message: 'Successfully deleted',
        deletedDoc,
      });
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
};

export default todoControllers;
