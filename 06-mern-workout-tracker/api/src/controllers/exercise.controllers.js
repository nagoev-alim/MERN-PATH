import { Exercise as Model } from '../models/index.js';
import { httpCodes, validate } from '../utils/index.js';
import { Types } from 'mongoose';

/**
 * @description Model Controller
 */
const categoryControllers = {
  /**
   * @description Create a new document
   * @return {object}
   */
  createDocument: async (req, res) => {
    try {
      // Validate fields
      const { error } = validate.exercise(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Create doc
      await Model.create({ ...req.body, userId: req.user });
      const docs = await Model.aggregate([
        {
          $match: { userId: new Types.ObjectId(req.user) },
        },
        {
          $sort: { date: -1 }
        },
        {
          $group: {
            _id: "$date",
            records: { $push: "$$ROOT" }
          }
        }
      ]);
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Get all documents
   * @return {array}
   */
  getDocuments: async (req, res) => {
    try {
      // Get all docs by user id
      const docs = await Model.aggregate([
        {
          $match: { userId: new Types.ObjectId(req.user) },
        },
        {
          $sort: { date: -1 }
        },
        {
          $group: {
            _id: "$date",
            records: { $push: "$$ROOT" }
          }
        }
      ]);
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Get single document
   * @return {object}
   */
  getDocument: async (req, res) => {
    try {
      // Get ID by request
      const { id } = req.params;
      // Get doc by user id
      const doc = await Model.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
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
  updateDocument: async (req, res) => {
    try {
      // Get ID by request
      const { id } = req.params;
      // Find by ID doc
      const doc = await Model.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
      }
      // Delete doc
      await Model.findByIdAndUpdate({ _id: doc._id }, req.body, { new: true });
      const docs = await Model.aggregate([
        {
          $match: { userId: new Types.ObjectId(req.user) },
        },
        {
          $sort: { date: -1 }
        },
        {
          $group: {
            _id: "$date",
            records: { $push: "$$ROOT" }
          }
        }
      ]);
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Delete document
   * @return {object}
   */
  deleteDocument: async (req, res) => {
    try {
      // Get ID by request
      const { id } = req.params;
      // Find by ID doc
      const doc = await Model.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
      }
      // Delete doc
      await Model.findOneAndDelete({ _id: doc._id });
      const docs = await Model.aggregate([
        {
          $match: { userId: new Types.ObjectId(req.user) },
        },
        {
          $sort: { date: -1 }
        },
        {
          $group: {
            _id: "$date",
            records: { $push: "$$ROOT" }
          }
        }
      ]);
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
};

export default categoryControllers;
