const router = require('express').Router();
const { User } = require('../../models');
const logger = require('../../utils/winston/logger.js');

const badPW = 'Incorrect email or password, please try again'

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    logger.error({ level: 'error', label: '400', message: err });
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: err });
        logger.error({ level: 'error', label: '400', message: badPW
        });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: `${badPW}` });
        logger.info({level: 'info', label: '400', message: `${userData.id} entered a bad pw`});

      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
      logger.info({level: 'info', label: '200', message: `${userData.id} logged in`});
    });

  } catch (err) {
    logger.error({ level: 'error', label: '400', message: `${userData.id} logged in`});
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
      // logger.info({ level: 'info', label: '204', message: `${userData.id} logged out`});
    });
  } else {
    logger.error({ level: 'error', label: '404', message: `no user found to log out`});
    res.status(404).end();
  }
});

module.exports = router;
