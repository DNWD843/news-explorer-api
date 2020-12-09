const router = require('express').Router();

const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');

const {
  getArticlesReqValidator, createArticleReqValidator, deleteArticleReqValidator
} = require('../middlewares/articlesValidators');

router.get('/', getArticlesReqValidator, getArticles);
router.post('/', createArticleReqValidator, createArticle);
router.delete('/:articleId', deleteArticleReqValidator, deleteArticle);

module.exports = router;
