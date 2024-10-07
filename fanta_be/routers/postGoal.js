const express = require("express");
const Player = require("../models/Player");
const Team = require("../models/Team");
const Club = require("../models/Club");
const Goal = require("../models/Goal");

// module.exports = (sequelize) => {
//   router = express.Router();

//   const player = Player(sequelize);
//   const team = Team(sequelize);
//   const club = Club(sequelize);

//   router.post("/goals", async (req, res) => {
//     const { minute, playerName, playerSurname, teamId, clubId } = req.body;

//     try {
//       // const foundPlayer = await player.findOne({
//       //   where: {
//       //     name: playerName,
//       //     surname: playerSurname,
//       //   },
//       //   include: [{
//       //     model: Team,
//       //     through: { where: { teamId: marvidaTeamId } }  // Collegamento alla tabella ponte
//       //   }]
//       // });

//       // if (foundPlayer) {
//       //   const newGoal = await goal.create({
//       //     minute,
//       //     id_player: foundPlayer.id, // Lukaku
//       //     id_team: marvidaTeamId, // Marvida
//       //   });
//       // }

//       // Trova il giocatore reale nel club reale

//       const foundPlayer = await player.findOne({
//         where: {
//           name: playerName, // Romelu
//           surname: playerSurname, // Lukaku
//           id_club: club, // Napoli
//         },
//       });

//       if (!foundPlayer) {
//         return res.status(404).json({ error: "Giocatore non trovato nel club specificato" });
//       }

//       // Crea un nuovo goal nella realtà
//       const newGoal = await goal.create({
//         minute, // 67'
//         id_player: foundPlayer.id, // Romelu Lukaku
//         id_club: club, // Napoli
//       });

//       // Trova il team fantasy che ha acquistato questo giocatore
//       const owningFantasyTeam = await teamFantasy.findOne({
//         where: {
//           id_player: foundPlayer.id, // Romelu Lukaku
//         },
//       });

//       if (owningFantasyTeam) {
//         // Assegno il gol al team fantasy
//         await owningFantasyTeam.increment("goals_scored", { by: 1 });

//         // Risposta con successo se il giocatore appartiene ad un team
//         res.status(201).json({
//           message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute} per il team fantasy ${owningFantasyTeam.name}`,
//           goal: newGoal,
//         });
//       } else {
//         // Risposta con successo se il giocatore non appartiene ad un team
//         res.status(200).json({
//           message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute} per il team fantasy ${owningFantasyTeam.name}`,
//           goal: newGoal,
//         });
//       }
//     } catch (error) {
//       console.error("Errore nella creazione del goal:", error);
//       res.status(500).json({ error: "Errore nella creazione del goal" });
//     }
//   });

//   return router;
// };

module.exports = (sequelize) => {
  const router = express.Router();
  const player = Player(sequelize);
  const team = Team(sequelize);
  const goal = Goal(sequelize);

  router.post("/goals", async (req, res) => {
    const { minute, playerName, playerSurname, teamId, clubId } = req.body;

    try {
      // Trova il giocatore reale nel club reale
      const foundPlayer = await player.findOne({
        where: {
          name: playerName, // Cristiano
          surname: playerSurname, // Ronaldo
          id_club: clubId, // Juventus (o altro club reale)
        },
      });

      if (!foundPlayer) {
        return res.status(404).json({ error: "Giocatore non trovato nel club specificato" });
      }

      // Crea un nuovo goal per il giocatore reale e il team fantasy
      const newGoal = await goal.create({
        minute,
        id_player: foundPlayer.id, // ID del giocatore trovato
        id_team: teamId, // ID del team fantasy
      });

      // Trova il team fantasy che ha acquistato questo giocatore
      const owningFantasyTeam = await Player_Team.findOne({
        where: {
          id_player: foundPlayer.id, // Cristiano Ronaldo
        },
        include: [team], // Associa il team fantasy
      });

      if (owningFantasyTeam) {
        // Incrementa il numero di gol segnati per il team fantasy
        await owningFantasyTeam.team.increment("goals_scored", { by: 1 });

        res.status(201).json({
          message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute} per il team fantasy ${owningFantasyTeam.team.name}`,
          goal: newGoal,
        });
      } else {
        res.status(200).json({
          message: `Gol segnato da ${foundPlayer.name} ${foundPlayer.surname} al minuto ${minute}, ma il giocatore non appartiene a nessun team fantasy.`,
          goal: newGoal,
        });
      }
    } catch (error) {
      console.error("Errore nella creazione del goal:", error);
      res.status(500).json({ error: "Errore nella creazione del goal" });
    }
  });

  return router;
};
