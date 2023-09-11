import { Temporary } from '../models/index.js';
import { httpCodes, validate } from '../utils/index.js';
import { configuration } from '../config/index.js';
import shortid from 'shortid';

/**
 * @description Temporary Controller
 */
const temporaryControllers = {
  /**
   * @description Get single document
   * @return {array}
   */
  get: async (req, res) => {
    try {
      // Get field from request
      const { id } = req.params;
      // Get doc by user id
      const doc = await Temporary.findOne({ shortenId: id });
      // Return response
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json(httpCodes.NOT_FOUND.message);
      }
      // Update click field and redirect to original url
      if (doc) {
        doc.clicks++;
        await doc.save();
        // Return response
        return res.redirect(doc.originalUrl)
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
      const doc = await Temporary.create({
        originalUrl,
        shortenId,
        shortenUrl: `${configuration.url.base}/${shortenId}`,
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
      // Get field from request
      const { id } = req.params;
      // Get doc by user id
      const doc = await Temporary.findOne({ _id: id });
      // Return response
      if (!doc) {
        return res.status(httpCodes.NOT_FOUND.code).json(httpCodes.NOT_FOUND.message);
      }
      // Delete doc
      const deletedDoc = await Temporary.findByIdAndDelete(doc._id);
      return res.status(httpCodes.OK.code).json({
        message: 'Document deleted successfully',
        deletedDoc,
      }); // For testing purposes
    } catch (error) {
      console.log(error);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
    }
  },
};

export default temporaryControllers;
