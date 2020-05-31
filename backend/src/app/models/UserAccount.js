const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const UserAccount = sequelize.define(
    'UserAccount',
    {
      password: DataTypes.VIRTUAL,
      password_hash: DataTypes.TEXT,
      user_profile: DataTypes.INTEGER,
    },
    {
      hooks: {
        async beforeSave(user) {
          if (user.password) {
            user.password_hash = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  UserAccount.associate = (models) => {
    UserAccount.belongsTo(models.UserProfile, { foreignKey: 'user_profile' });
  };

  UserAccount.prototype.checkPassword = (password) => {
    return bcrypt.compare(password, this.password_hash);
  };

  return UserAccount;
};
