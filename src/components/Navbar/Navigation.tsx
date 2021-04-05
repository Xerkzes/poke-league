import React from "react";
import { NavLink } from "react-router-dom";
import PokeballImg from "./000.png";

interface NavigationProps {
  navbarOutwards: boolean;
  setNavbarOutwards: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navigation: React.FC<NavigationProps> = ({
  navbarOutwards,
  setNavbarOutwards,
}) => {
  return (
    <div
      className={
        "navbar-container" + (navbarOutwards ? " navbar-container-maximum" : "")
      }
    >
      <div className="navbar-btn-expand-div">
        {navbarOutwards ? (
          <button onClick={() => setNavbarOutwards(false)}>&#8592;</button>
        ) : (
          <button onClick={() => setNavbarOutwards(true)}>&#8594;</button>
        )}
      </div>

      <ul className="navbar-ul">
        <li>
          <NavLink exact to="/" activeClassName="navbar-link-active">
            <div className="navbar-item">
              <span className="material-icons nav-icon">account_circle</span>
              <p>Participants</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/divisions" activeClassName="navbar-link-active">
            <div className="navbar-item">
              <span className="material-icons nav-icon">table_chart</span>
              <p>Divisions</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/matches" activeClassName="navbar-link-active">
            <div className="navbar-item">
              <span className="material-icons nav-icon">sports_esports</span>
              <p>Matches</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink
            exact
            to="/random_pokemon_generator"
            activeClassName="navbar-link-active"
          >
            <div className="navbar-item">
              <img
                className="nav-icon"
                src={PokeballImg}
                alt="generate random Pokemons"
              />
              <p>Generator</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
