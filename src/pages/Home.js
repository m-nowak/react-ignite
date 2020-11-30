import React, { useEffect, useState } from "react";
import GameDetail from "../components/GameDetail";

import { useDispatch, useSelector } from "react-redux";
import { loadGames } from "../actions/gamesAction";

import Game from "../components/Game";

import styled from "styled-components";
import { motion, AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { fadeIn } from "../animations";

import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  const pathId = location.pathname.split("/")[2];
  const dispatch = useDispatch();
  const [overFlow, setOverFlow] = useState(false);

  useEffect(() => {
    if (overFlow && pathId) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
    console.log("");
    dispatch(loadGames());
  }, [dispatch, overFlow, pathId]);

  const { popular, newGames, upcoming, searched } = useSelector(
    (state) => state.games
  );

  return (
    <GameList variants={fadeIn} initial="hidden" animate="show">
      <AnimateSharedLayout type="crossfade">
        <AnimatePresence>
          {pathId && (
            <GameDetail
              overFlow={overFlow}
              setOverFlow={setOverFlow}
              pathId={pathId}
            />
          )}
        </AnimatePresence>
        {searched.length ? (
          <div className="searched">
            <h2>Searched Games</h2>
            <Games>
              {searched.map(
                (game) =>
                  game.background_image && (
                    <Game
                      overFlow={overFlow}
                      setOverFlow={setOverFlow}
                      name={game.name}
                      released={game.released}
                      id={game.id}
                      key={game.id}
                      image={game.background_image}
                    />
                  )
              )}
            </Games>
          </div>
        ) : (
          ""
        )}
        <h2>Upcoming Games</h2>
        <Games>
          {upcoming.map((game) => (
            <Game
              overFlow={overFlow}
              setOverFlow={setOverFlow}
              name={game.name}
              released={game.released}
              id={game.id}
              key={game.id}
              image={game.background_image}
            />
          ))}
        </Games>
        <h2>Popular Games</h2>
        <Games>
          {popular.map((game) => (
            <Game
              overFlow={overFlow}
              setOverFlow={setOverFlow}
              name={game.name}
              released={game.released}
              id={game.id}
              key={game.id}
              image={game.background_image}
            />
          ))}
        </Games>
        <h2>New Games</h2>
        <Games>
          {newGames.map((game) => (
            <Game
              overFlow={overFlow}
              setOverFlow={setOverFlow}
              name={game.name}
              released={game.released}
              id={game.id}
              key={game.id}
              image={game.background_image}
            />
          ))}
        </Games>
      </AnimateSharedLayout>
    </GameList>
  );
};

const GameList = styled(motion.div)`
  padding: 0rem 0rem 10rem 0rem;
  margin: 0 5rem;
  h2 {
    padding: 5rem 0rem 5rem 0rem;
  }
  @media (max-width: 900px) {
    margin: 0 1rem;
  }
  @media (max-width: 480px) {
    h2 {
      font-size: 2rem;
      text-align: center;
    }
  }
`;

const Games = styled(motion.div)`
  min-height: 80vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-column-gap: 3rem;
  grid-row-gap: 5rem;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
  @media (max-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(90%, 1fr));
  }
`;

export default Home;
