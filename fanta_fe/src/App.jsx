/* eslint-disable no-unused-vars */
import "./App.css";
import Club from "./components/club/Club.jsx";
import Grid from "@mui/material/Grid2";
import Player from "./components/player/Player.jsx";
import PlayerStats from "./components/playerStats/PlayerStats.jsx";

function App() {
  const NAVIGATION = [
    {
      segment: "Creazone Database",
      title: "Dashboard",
    },
    {
      segment: "Teams",
      title: "Orders",
    },
    {
      segment: "Leghe",
      title: "Integrations",
    },
  ];

  return (
    <>
      <Grid className={"container"}>
        <Grid className={"wrapperApp"}>
          <Grid className={"sidebar"}>
            SIDEBAR
            {NAVIGATION.map((el, index) => (
              <ul key={index}>
                <li>{el.segment}</li>
              </ul>
            ))}
          </Grid>
          <Grid className={"main"}>
            {/* <main>MAIN</main> */}

            <Club />
            <Player />
            <PlayerStats />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
