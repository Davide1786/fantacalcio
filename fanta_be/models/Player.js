// const { DataTypes } = require("sequelize");
// const Club = require("./Club");

// /**
//  * @param {sequelize.Sequelize} sequelize
//  * @returns {import('sequelize').ModelCtor<Model<any, any>>}
//  */

// module.exports = function (sequelize) {
//   const Player = sequelize.define(
//     "Player",
//     {
//       name: { type: DataTypes.STRING },
//       surname: { type: DataTypes.STRING },
//       age: { type: DataTypes.NUMBER },
//       nationality: { type: DataTypes.STRING },
//       role: { type: DataTypes.STRING },
//       price_player: { type: DataTypes.NUMBER },
//       info: { type: DataTypes.TEXT },

//       id_club: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: Club,
//           key: "id", // Assumiamo che l'id del club sia la chiave primaria
//         },
//       },
//     },
//     {
//       tableName: "Players", // Specifica esplicitamente il nome della tabella
//     }
//   );
//   Club.hasMany(Player, { foreignKey: "id_club" });

//   return Player;

// };

// const { DataTypes } = require("sequelize");
// const createClubModel = require("./Club"); // Importa la funzione del modello Club
// const createTeamModel = require("./Team"); // Importa la funzione del modello Club
// const createGoalModel = require("./Goal"); // Importa la funzione del modello Club

// /**
//  * @param {sequelize.Sequelize} sequelize
//  * @returns {import('sequelize').ModelCtor<Model<any, any>>}
//  */
// module.exports = function (sequelize) {
//   // Chiamare la funzione per ottenere il modello Club
//   const Club = createClubModel(sequelize);
//   const Team = createTeamModel(sequelize);
//   const Goal = createGoalModel(sequelize);

//   const Player = sequelize.define(
//     "Player",
//     {
//       name: { type: DataTypes.STRING },
//       surname: { type: DataTypes.STRING },
//       age: { type: DataTypes.INTEGER }, // Usa INTEGER invece di NUMBER
//       nationality: { type: DataTypes.STRING },
//       role: { type: DataTypes.STRING },
//       price_player: { type: DataTypes.INTEGER }, // Usa INTEGER invece di NUMBER
//       info: { type: DataTypes.TEXT },
//       id_club: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: Club, // Il modello di Club corretto
//           key: "id", // Assumiamo che l'id del club sia la chiave primaria
//         },
//       },
//     },
//     {
//       tableName: "Players", // Specifica esplicitamente il nome della tabella
//     }
//   );

//   /*
//   Club.hasMany(Player, { foreignKey: "id_club" });
//   hasMany: Indica che un Club può avere molti Players.
//   Player: Questo è il modello target (il modello che avrà la chiave esterna).
//   foreignKey: "id_club": Specifica che la colonna della chiave esterna nella
//   tabella Player sarà chiamata id_club. Questa colonna conterrà l'ID del Club a
//   cui il Player appartiene.

//   Player.belongsTo(Club, { foreignKey: "id_club" });
//   belongsTo: Indica che un Player appartiene a un Club.
//   Club: Questo è il modello target (il modello che verrà referenziato).
//   foreignKey: "id_club": Specifica che la colonna della chiave esterna nella
//   tabella Player è chiamata id_club. Questo è coerente con l'associazione hasMany.
//   */

//   // Definisce l'associazione hasMany tra Club e Player
//   Club.hasMany(Player, { foreignKey: "id_club" });
//   Player.belongsTo(Club, { foreignKey: "id_club" });

//   // aggiungere il team che ha comprato il giocatore
//   Team.hasMany(Player, { foreignKey: "id_player" });
//   Player.belongsTo(Team, { foreignKey: "id_team" });

//   Player.hasMany(Goal, { foreignKey: "id_player" });
//   Goal.belongsTo(Player, { foreignKey: "id_player" });

//   return Player;
// };

const { DataTypes } = require("sequelize");
const createClubModel = require("./Club");
const createTeamModel = require("./Team");
const createGoalModel = require("./Goal");

module.exports = function (sequelize) {
  const Club = createClubModel(sequelize);
  const Team = createTeamModel(sequelize);
  const Goal = createGoalModel(sequelize);

  const Player = sequelize.define(
    "Player",
    {
      name: { type: DataTypes.STRING },
      surname: { type: DataTypes.STRING },
      age: { type: DataTypes.INTEGER },
      nationality: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING },
      price_player: { type: DataTypes.INTEGER },
      info: { type: DataTypes.TEXT },
      // id_club: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: Club,
      //     key: "id",
      //   },
      // },
    },
    {
      tableName: "Players",
    }
  );

  Club.hasMany(Player, { foreignKey: "id_club" });
  Player.belongsTo(Club, { foreignKey: "id_club" });

  Team.hasMany(Player, { foreignKey: "id_player" });
  Player.belongsTo(Team, { foreignKey: "id_team" });

  Player.hasMany(Goal, { foreignKey: "id_player" });
  Goal.belongsTo(Player, { foreignKey: "id_player" });

  return Player;
};
