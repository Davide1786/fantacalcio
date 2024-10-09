// FILE DELLE RELAZIONI

function applyExtraSetup(sequelize) {
  const { club, goal, league, player, team, user, statPlayer, teamPlayer } = sequelize.models;

  club.hasMany(player); // 1 a n
  player.belongsTo(club); // 1 a 1

  player.hasMany(goal);
  goal.belongsTo(player);

  player.belongsTo(statPlayer);
  statPlayer.belongsTo(player);

  league.hasMany(team);
  team.belongsTo(league);

  user.hasMany(team);
  team.belongsTo(user);

  team.belongsToMany(player, { through: teamPlayer }); // n a n
  player.belongsToMany(team, { through: teamPlayer });
}

module.exports = { applyExtraSetup };
