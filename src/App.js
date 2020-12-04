import React, { useEffect, useState } from "react";
import { moviesApi } from "./api";
import "./styles.css";

export default function App() {
  const [id, setid] = useState(false);
  const [text, setText] = useState("");
  const [isVisible, setVisible] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [state, setState] = useState({
    nowPlaying: null,
    upComing: null
  });

  const loadData = async (id, text) => {
    setLoading(true);
    try {
      if (text === "now") {
        const {
          data: { results: nowPlaying }
        } = await moviesApi.nowPlaying();

        setState({
          nowPlaying
        });
      }

      if (text === "up") {
        const {
          data: { results: upComing }
        } = await moviesApi.upComing();

        setState({
          upComing
        });
      }

      console.log("say Hello " + text + id);
    } catch (e) {
      setError("Can't find movies information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id !== false && text !== "") {
      loadData(id, text);
    } else if (id === false) {
      return false;
    }
  }, [id]);

  function sayHello(e, id, text) {
    let wrap = test(e);

    setid(id);
    setText(text);
    setVisible(true);
    wrap.nextSibling.classList.add("visible");
  }

  function close() {
    setid(false);
    setVisible(false);
    setText("");
  }

  function test(e) {
    let wrap = "";

    if (e.target.classList.contains("box_")) {
      wrap = e.target.parentNode;
    } else if (e.target.classList.contains("content_")) {
      wrap = e.target.parentNode.parentNode;
    } else {
      wrap = e.target;
    }

    return wrap;
  }

  return (
    <div className="App">
      {/* <h1 onClick={() => {sayHello(20)}}>Hello CodeSandbox</h1> */}
      {isVisible ? `visual ${id} ${text}` : `none ${id} ${text}`}

      <div
        className="wrap_"
        onClick={(e) => {
          test(e);
        }}
      >
        wrap
        <div className="box_">
          box
          <div className="content_">content</div>
        </div>
      </div>
      <span
        onClick={(e) => {
          sayHello(e, 6325, "now");
        }}
        className="6325 text wrap_"
      >
        Hello CodeSandbox <span className="box_">blabla</span>
      </span>
      <div>옆에</div>
      <h1
        onClick={(e) => {
          sayHello(e, 6300, "up");
        }}
        className="6300 text"
      >
        Hello CodeSandbox{" "}
      </h1>

      {isVisible
        ? text === "now"
          ? state.nowPlaying &&
            state.nowPlaying.length > 0 && (
              <div
                onMouseLeave={close}
                style={{
                  width: "300px",
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  marginLeft: "-150px",
                  background: "#ff0"
                }}
              >
                <span onClick={close}>닫아</span>
                {state.nowPlaying.map((movie) => (
                  <div key={movie.id}>
                    {movie.id}
                    {movie.original_title}
                    {movie.poster_path}
                    {movie.vote_average}
                    {movie.release_date.substring(0, 4)}
                  </div>
                ))}
              </div>
            )
          : text === "up"
          ? state.upComing &&
            state.upComing.length > 0 && (
              <div
                onMouseLeave={close}
                style={{
                  width: "300px",
                  position: "absolute",
                  top: "0px",
                  left: "50%",
                  marginLeft: "-150px",
                  background: "#f00"
                }}
              >
                {state.upComing.map((movie) => (
                  <div key={movie.id}>
                    {movie.id}
                    {movie.original_title}
                    {movie.poster_path}
                    {movie.vote_average}
                    {movie.release_date.substring(0, 4)}
                  </div>
                ))}
              </div>
            )
          : false
        : false}
    </div>
  );
}
