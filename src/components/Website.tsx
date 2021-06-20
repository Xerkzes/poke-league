import React, { useState } from "react";
import { Navigation } from "./Navbar/Navigation";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Participants } from "./Sites/Participants/Participants";
import { Divisions } from "./Sites/Divisions/Divisions";
import { Matches } from "./Sites/Matches/Matches";
import { Rules } from "./Sites/Rules/Rules";
import { Generator as RandoPokeGenerator } from "./Sites/Generator/Generator";
import { PokeReroll } from "./Sites/PokeReroll/PokeReroll";
import { TestPage } from "./Sites/Test/TestPage";
import { NoRoute } from "./Sites/404";
import { TextToJson } from "./Sites/TextToJson/TextToJson";
import { DraftLeague } from "./Sites/DraftLeague/DraftLeague";

interface WebsiteProps {}

export const Website: React.FC<WebsiteProps> = ({}) => {
  const [navbarOutwards, setNavbarOutwards] = useState<boolean>(true);

  return (
    <div className="website-container">
      <Router>
        <Navigation navbarOutwards={navbarOutwards} setNavbarOutwards={setNavbarOutwards} />

        <div className="content-container">
          <Switch>
            <Route path="/" exact component={Participants} />
            <Route path="/divisions" exact component={Divisions} />
            <Route path="/matches" exact component={Matches} />
            <Route path="/draftleague" exact component={DraftLeague} />
            <Route path="/rulesets" exact component={Rules} />
            <Route path="/poke-rerolls" exact component={PokeReroll} />
            <Route path="/random_pokemon_generator" exact component={RandoPokeGenerator} />
            <Route path="/test" exact component={TestPage} />
            <Route path="/json" exact component={TextToJson} />
            <Route path="/" component={NoRoute} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
