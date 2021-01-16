import React, { useEffect, useState } from "react";
import ScoreCard from "./ScoreCard";
import "./styles/Main.css";
import axios from "axios";

const Main = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [query, setQuery] = useState("");
  const [target, setTarget] = useState("");
  const [stash, setStash] = useState([]);

  let time;
  let timeoutId;
  let colorBlocks = document.querySelectorAll(".neutral");

  useEffect(() => {
    let loadQuotes = async () => {
      let res = await axios.get(
        "https://api.jsonbin.io/b/600283cbe31fbc3bdef44bca/1",
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

    if (query === target.slice(0, query.length) && query.length !== 0) {
      colorBlocks.forEach((block) => block.classList.add("error", "success"));
      if (query.length === target.length) {
        clearInterval(timeoutId);
        setShowInstructions(false);
      }
    } else colorBlocks.forEach((block) => block.classList.remove("success"));
  };

  const startGame = () => {
    setShowInstructions(true);
    setQuery("");
    time = 0;
    colorBlocks.forEach((block) => block.classList.remove("success", "error"));

    let indx = Math.floor(Math.random() * 102);
    setTarget(stash[indx].quote);
    timeoutId = setInterval(() => {
      ++time;
    }, 1000);
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
            disabled={target === ""}
          />
          <br />
          <button onClick={startGame} className="neutral">
            TypeRace
          </button>
        </div>

        <ScoreCard
          showInstructions={showInstructions}
          time={time}
          length={target.split(" ").length + 1}
        />
      </div>
    </div>
  );
};

export default Main;
