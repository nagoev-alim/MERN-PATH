// 🔳 Custom import
import { httpCodes, validate } from '../utils/index.js';
import { Diary } from '../models/index.js';

/**
 * @description Diary Controller
 * @type {object}
 */
export default {
  // 🟨 Create Diary
  createDiary: async (req, res) => await fn(req, res, 'CREATE'),
  // 🟨 Get diaries
  getDiaries: async (req, res) => await fn(req, res, 'READ_ALL'),
  // 🟨 Get diary
  getDiary: async (req, res) => await fn(req, res, 'READ_SINGLE'),
  // 🟨 Update diary
  updateDiary: async (req, res) => await fn(req, res, 'UPDATE'),
  // 🟨 Delete diary
  deleteDiary: async (req, res) => await fn(req, res, 'DELETE'),
};

const fn = async (req, res, type) => {
  try {
    switch (type) {
      case 'CREATE': {
        const { error } = validate.diary(req.body);
        if (error) {
          return res.status(httpCodes.BAD_REQUEST.code).json({ message: error.details[0].message });
        }
        const doc = await Diary.create({ ...req.body, userId: req.user });
        const savedDoc = await doc.save();
        return res.status(httpCodes.OK.code).json({
          message: 'Diary created successfully',
          data: savedDoc,
        });
      }
      case 'READ_ALL': {
        const docs = await Diary.find({ userId: req.user }).sort({ createdAt: -1, sortDesc: 1 });
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully retrieved',
          data: docs,
        });
      }
      case 'READ_SINGLE': {
        const doc = await Diary.findById({ _id: req.params.id }).sort({ createdAt: -1, sortDesc: 1 });
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully retrieved',
          data: doc,
        });
      }
      case 'UPDATE': {
        const doc = await Diary.findById({ _id: req.params.id });
        if (!doc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        if (doc.userId.toString() !== req.user) {
          return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
        }
        const updatedDoc = await Diary.findByIdAndUpdate({ _id: doc._id }, req.body, { new: true }).select('_id title content date createdAt');
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully updated',
          data: updatedDoc,
        });
      }
      case 'DELETE': {
        const doc = await Diary.findById({ _id: req.params.id });
        if (!doc) {
          return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
        }
        if (doc.userId.toString() !== req.user) {
          return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
        }
        const deletedDoc = await Diary.findOneAndDelete({ _id: doc._id }).select('_id title content date createdAt');
        return res.status(httpCodes.OK.code).json({
          message: 'Successfully deleted',
          data: deletedDoc,
        });
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json(httpCodes.INTERNAL_SERVER_ERROR.message);
  }
};
