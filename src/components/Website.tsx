import React, { useState } from "react";
import { Navigation } from "./Navbar/Navigation";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Participants } from "./Sites/Participants/Participants";
import { Divisions } from "./Sites/Divisions/Divisions";
import { Matches } from "./Sites/Matches/Matches";
import { Generator as RandoPokeGenerator } from "./Sites/Generator/Generator";

interface WebsiteProps {}

export const Website: React.FC<WebsiteProps> = () => {
  const [navbarOutwards, setNavbarOutwards] = useState<boolean>(true);

  return (
    <div className="website-container">
      <Router>
        <Navigation
          navbarOutwards={navbarOutwards}
          setNavbarOutwards={setNavbarOutwards}
        />

        <div className="content-container">
          <Route path="/" exact component={Participants} />
          <Route path="/divisions" exact component={Divisions} />
          <Route path="/matches" exact component={Matches} />
          <Route
            path="/random_pokemon_generator"
            exact
            component={RandoPokeGenerator}
          />
        </div>
      </Router>
    </div>
  );
};
