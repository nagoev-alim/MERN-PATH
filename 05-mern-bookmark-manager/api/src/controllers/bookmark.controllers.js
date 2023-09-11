import { Bookmark as Model, Category } from '../models/index.js';
import { httpCodes, validate } from '../utils/index.js';
import { Types } from 'mongoose';

/**
 * @description Model Controller
 */
const bookmarkControllers = {
  /**
   * @description Create a new document
   * @return {object}
   */
  createDocument: async (req, res) => {
    try {
      // Validate fields
      const { error } = validate.bookmark(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Create doc
      const { title, url, categoryId } = req.body;
      let doc = new Model();
      doc.title = title;
      doc.url = url;
      doc.userId = req.user;
      if (categoryId) {
        doc.categoryId = categoryId;
        doc.category = await Category.findById({ _id: categoryId }).select('title id');
      }
      const savedDoc = await doc.save();
      // Return response
      return res.status(httpCodes.OK.code).json(savedDoc);
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
      const docs = await Model.find({ userId: req.user })
        .sort({ createdAt: -1 });
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
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
      const { title, url, categoryId } = req.body;
      let category;
      let updatedDoc;
      // Get ID by request
      const { id } = req.params;
      // Find by ID doc
      let doc = await Model.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
      }
      // If request body contains valid/invalid field
      if (!Types.ObjectId.isValid(categoryId)) {
        doc.category = undefined;
        doc.categoryId = undefined;
        doc.save();
        updatedDoc = await Model.findByIdAndUpdate({ _id: doc._id }, { title, url }, { new: true });
      } else {
        category = await Category.findById({ _id: categoryId }).select('title id');
        updatedDoc = await Model.findByIdAndUpdate({ _id: doc._id }, {
          title,
          url,
          categoryId,
          category,
        }, { new: true });
      }
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
      const deletedDoc = await Model.findOneAndDelete({ _id: doc._id });
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

export default bookmarkControllers;
