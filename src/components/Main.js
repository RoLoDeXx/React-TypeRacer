import React, { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import "./styles/Main.css";
import axios from "axios";

const Main = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [time, setTime] = useState(0);
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState("");
  const [stash, setStash] = useState([]);

  useEffect(() => {
    let loadQuotes = async () => {
      let res = await axios.get(
        "https://api.jsonbin.io/b/600283cbe31fbc3bdef44bca",
        {
          headers: {
            "secret-key":
              "$2b$10$1q4xcPv054Qnrnvown8jDuKUPr93vTA4P1k7MaDwXdbkoNdGSRp7a",
          },
        }
      );
      setStash(res.data);
    };
    loadQuotes();
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
    if (query === target.slice(0, query.length)) {
      console.log("match");
      if (query.length === target.length) alert("finish");
    } else console.log("mis");
  };

  return (
    <div>
      <div>
        <div className="div1">
          {target === "" ? (
            <p className="targetText">Click on start to begin!</p>
          ) : (
            <p className="targetText">{target}</p>
          )}
        </div>

        <div className="typeForm">
          <input
            type="text"
            placeholder="Start typing here..."
            autoComplete="off"
            value={query}
            onChange={(e) => handleChange(e)}
          />
          <br />
          <button
            onClick={() => {
              let indx = Math.floor(Math.random() * 102);
              setTarget(stash[indx].quote);
            }}
          >
            TypeRace
          </button>
        </div>

        <div>
          <ScoreCard showInstructions={true} />
        </div>
      </div>
    </div>
  );
};

export default Main;
