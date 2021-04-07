import React from "react";
import { NavLink } from "react-router-dom";
import PokeballImg from "./000.png";

interface NavigationProps {
  navbarOutwards: boolean;
  setNavbarOutwards: React.Dispatch<React.SetStateAction<boolean>>;
}

const links = [
  { text: "Participants", location: "/", icon: "account_circle" },
  { text: "Divisions", location: "/divisions", icon: "table_chart" },
  { text: "Matches", location: "/matches", icon: "sports_esports" },
  { text: "Rules", location: "/rulesets", icon: "event_note" },
  {
    text: "Generator",
    location: "/random_pokemon_generator",
    sprite: PokeballImg,
    alt: "generate random Pokemons",
  },
  // { text: "Test Page", location: "/test", icon: "bug_report" },
];

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
          <span
            className="material-icons navbar-pin navbar-pin-float"
            onClick={() => setNavbarOutwards(false)}
          >
            push_pin
          </span>
        ) : (
          <span
            className="material-icons navbar-pin navbar-pin-stick"
            onClick={() => setNavbarOutwards(true)}
          >
            push_pin
          </span>
        )}
      </div>

      <ul className="navbar-ul">
        {links.map((link) => {
          return (
            <li key={link.text}>
              <NavLink
                exact
                to={`${link.location}`}
                activeClassName="navbar-link-active"
              >
                <div className="navbar-item">
                  {/* icon */}
                  {link?.icon ? (
                    <span className="material-icons nav-icon">{link.icon}</span>
                  ) : (
                    ""
                  )}

                  {/* sprite */}
                  {link?.sprite ? (
                    <img
                      className="nav-icon"
                      src={link.sprite}
                      alt={`${link.alt}`}
                    />
                  ) : (
                    ""
                  )}

                  <p className="whitespace-nowrap">{link.text}</p>
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
