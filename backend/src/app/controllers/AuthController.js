const { UserAccount } = require('../models');

module.exports = {
  async store(req, res) {
    const { password, user_profile } = req.body;

    const UserAcc = await UserAccount.create({
      password,
      user_profile,
    });

    return res.json(UserAcc);
  },
};
