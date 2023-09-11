import mongoose from 'mongoose';
import { Url } from '../models/index.js';
import { httpCodes, validate } from '../utils/index.js';
import { configuration } from '../config/index.js';
import shortid from 'shortid';

/**
 * @description Url Controller
 */
const urlControllers = {
  /**
   * @description Get all documents
   * @return {array}
   */
  getAll: async (req, res) => {
    try {
      // Get all docs by user id
      const docs = await Url.find({ userId: req.user }).sort({ createdAt: -1 });
      // Return response
      return res.status(httpCodes.OK.code).json(docs);
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },

  /**
   * @description Get single document
   * @return {array}
   */
  getSingle: async (req, res) => {
    try {
      // Get field from request
      const { id } = req.params;
      // Get doc by user id
      const doc = await Url.findOne({ shortenId: id });
      // Return response
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json(httpCodes.NOT_FOUND.message);
      }
      // Update click field and redirect to original url
      if (doc) {
        doc.clicks++;
        await doc.save();
        // Return response
        return res.redirect(doc.originalUrl);
        // return res.status(httpCodes.OK.code).json(doc); // For testing purposes
      }
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
      const { error } = validate.url(req.body);
      if (error) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
      }
      // Get field from request body
      const { originalUrl } = req.body;
      const shortenId = shortid.generate();
      // Create doc
      const doc = await Url.create({
        originalUrl,
        shortenId,
        shortenUrl: `${configuration.url.base}/url/${shortenId}`,
        userId: req.user
      });
      // Return response
      return res.status(httpCodes.OK.code).json(doc);
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
      const doc = await Url.findById({ _id: id });
      // Validate doc
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json({ error: 'No such url' });
      }
      // Validate doc
      if (doc.userId.toString() !== req.user) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ error: httpCodes.UNAUTHORIZED.message });
      }
      // Delete doc
      const deletedDoc = await Url.findOneAndDelete({ _id: doc._id });
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

export default urlControllers;
