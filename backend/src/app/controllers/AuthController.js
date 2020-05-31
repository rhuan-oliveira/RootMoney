const { UserAccount } = require('../models');

module.exports = {
  async store(req, res) {
    const { password, profile_id } = req.body;

    const UserAcc = await UserAccount.create({
      password,
      profile_id,
    });

    return res.json(UserAcc);
  },
};
