const router = require('express').Router();
const { Project } = require('../../models');
const withAuth = require('../../utils/auth');
const logger = require('../../utils/winston/logger.js');

router.post('/', withAuth, async (req, res) => {
  try {
    const newProject = await Project.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    // logging new project creation fails - @TODO
    // logger.info({level: 'info', label: '200', message: `${user_id} created ${newProject.name}`});
    res.status(200).json(newProject);
  } catch (err) {
    logger.error({level: 'error', label: '400', message: err});
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const projectData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!projectData) {
      logger.warn({level: 'warn', label: '404', message: `${req.params.id} does not exist`});
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    logger.info({level: 'info', label: '200', message: `${req.params.id} has been deleted`});
    res.status(200).json(projectData);
  } catch (err) {
    logger.error({level: 'error', label: '500', message: 'server proj deletion failed unexplicably'});
    res.status(500).json(err);
  }
});

module.exports = router;
