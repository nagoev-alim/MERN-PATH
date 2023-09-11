import { httpCodes, validations } from '../utils/index.js';
import { Post, User } from '../models/index.js';

const postControllers = {

  // Создание новой записи
  create: async (req, res) => {
    try {
      // Валидация запроса
      const { error } = validations.addPost(req.body);
      if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
      }
      // Поиск записи по идентификатору пользователя
      const user = await User.findById(req.user.id).select('-password');
      // Создание новой записи
      const doc = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatarUrl,
        user: req.user.id,
      });
      // Сохранение новой записи в базу данных
      const post = await doc.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(post);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Получение всех записей
  getAll: async (req, res) => {
    try {
      // Получение всех записей
      const posts = await Post.find().sort({ date: -1 });
      // Создание ответа
      return res.status(httpCodes.OK.code).json(posts);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Получение записи по идентификатору
  getById: async (req, res) => {
    try {
      // Получение поста
      const post = await Post.findById(req.params.id);
      // Если пост не найден
      if (!post) {
        return res.status(httpCodes.NOT_FOUND.code).json({
          error: true,
          message: httpCodes.NOT_FOUND.message,
        });
      }
      // Создание ответа
      return res.status(httpCodes.OK.code).json(post);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление записи
  delete: async (req, res) => {
    try {
      // Получение поста
      const post = await Post.findById(req.params.id);
      // Если пост не найден
      if (!post) {
        return res.status(httpCodes.NOT_FOUND.code).json({
          error: true,
          message: httpCodes.NOT_FOUND.message,
        });
      }
      // Если пост не принадлежит пользователю
      if (post.user.toString() !== req.user.id) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({
          error: true,
          message: httpCodes.UNAUTHORIZED.message,
        });
      }
      // Удаление поста
      await Post.findByIdAndDelete(req.params.id);
      // Создание ответа
      return res.status(httpCodes.OK.code).json({
        message: 'Post deleted',
      });
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Обновление записи - лайк
  like: async (req, res) => {
    try {
      // Получение поста
      const post = await Post.findById(req.params.id);
      // Проверка на наличие лайков
      if (post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: 'Post already liked' });
      }
      // Добавление лайков
      post.likes.unshift({ user: req.user.id });
      // Сохранение поста в базу данных
      await post.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(post.likes);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Обновление записи - дизлайк
  dislike: async (req, res) => {
    try {
      // Получение поста
      const post = await Post.findById(req.params.id);
      // Проверка на наличие лайков
      if (!post.likes.some((like) => like.user.toString() === req.user.id)) {
        return res.status(httpCodes.BAD_REQUEST.code).json({ message: 'Post has not yet been liked' });
      }
      // Удаление лайков
      post.likes = post.likes.filter(({ user }) => user.toString() !== req.user.id);
      // Сохранение поста в базу данных
      await post.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(post.likes);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Добавление комментария
  addComment: async (req, res) => {
    try {
      // Валидация запроса
      const { error } = validations.addPost(req.body);
      if (error) {
        return res.status(400).json({ error: true, message: error.details[0].message });
      }
      // Поиск пользователя по идентификатору
      const user = await User.findById(req.user.id).select('-password');
      // Поиск поста по идентификатору
      const post = await Post.findById(req.params.id);
      // Создание комментария
      const comment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatarUrl,
        user: req.user.id,
      };
      // Добавление комментария в пост
      post.comments.unshift(comment);
      // Сохранение поста в базу данных
      await post.save();
      // Создание ответа
      return res.status(httpCodes.CREATED.code).json(post.comments);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },

  // Удаление комментария
  deleteComment: async (req, res) => {
    try {
      // Поиск поста по идентификатору
      const post = await Post.findById(req.params.id);
      // Поиск комментария поста
      const comment = post.comments.find((comment) => comment.id === req.params.comment_id);
      // Если комментарий не найден
      if (!comment) {
        return res.status(httpCodes.NOT_FOUND.code).json({ message: httpCodes.NOT_FOUND.message });
      }
      // Проверка на наличие прав у пользователя
      if (comment.user.toString() !== req.user.id) {
        return res.status(httpCodes.UNAUTHORIZED.code).json({ message: httpCodes.UNAUTHORIZED.message });
      }
      // Удаляем комментарий
      post.comments = post.comments.filter(({ id }) => id !== req.params.comment_id);
      // Сохранение поста в базу данных
      await post.save();
      // Создание ответа
      return res.status(httpCodes.OK.code).json(post.comments);
    } catch (e) {
      console.log(e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR.code).json({
        error: true,
        message: httpCodes.INTERNAL_SERVER_ERROR.message,
      });
    }
  },
};

export default postControllers;
