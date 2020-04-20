const { UserProfile } = require('../models');

module.exports = {
  async store(req, res) {
    const store = await UserProfile.create(req.body);
    res.json(store);
  },

  async index(req, res) {
    const index = await UserProfile.findAll();
    res.json(index);
  },

  async update(req, res) {
    const update = await UserProfile.update(
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone
      },
      {
        where: {id: req.body.id}
      }
    )
    res.json(update);
  },

  async indexone(req, res) {
    const { id } = req.query;

    const indexone = await UserProfile.findByPk(id);

    return res.json(indexone);
  }
};