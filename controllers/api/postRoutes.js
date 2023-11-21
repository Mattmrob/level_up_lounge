const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const logger = require('../../utils/winston/logger.js');

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // logging new post creation fails - @TODO
    // logger.info({level: 'info', label: '200', message: `${user_id} created ${newPost.name}`});
    res.status(200).json(newPost);
  } catch (err) {
    logger.error({level: 'error', label: '400', message: err});
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      logger.warn({level: 'warn', label: '404', message: `${req.params.id} does not exist`});
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    logger.info({level: 'info', label: '200', message: `${req.params.id} has been deleted`});
    res.status(200).json(postData);
  } catch (err) {
    logger.error({level: 'error', label: '500', message: 'server proj deletion failed unexplicably'});
    res.status(500).json(err);
  }
});

module.exports = router;
