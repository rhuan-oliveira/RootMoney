module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define(
    'UserProfile',
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {}
  );

  return UserProfile;
};
