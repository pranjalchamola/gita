import React, { useState, useEffect } from "react";
import "./SideBarChapters.css";
import { Typography, Button, Drawer, Box } from "@mui/material";
import axios from "axios";
import baseUrl from "../../api/apiUrl";
import VerseBody from "../body/verseBody";

const SideBarChapters = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [data, setData] = useState([]);
  const [verse, setVerse] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(1);

  useEffect(() => {
    axios
      .get(`${baseUrl}/chapter`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const chapters = data.length > 0 ? data.map((item) => item.chapterName) : [];

  const handleClick = (index) => {
    setSelectedIndex(index + 1);
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      axios
        .get(`${baseUrl}/chapter/number/${selectedIndex}`)
        .then((response) => {
          setVerse(response.data.verse);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [selectedIndex]);

  return (
    <div>
      {" "}
      <button className="button-left" onClick={() => setIsDrawerOpen(true)}>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontSize: "18px" }}
          color="white"
        >
          Chapters And Shlokas
          <i
            className="fa fa-angle-down"
            style={{
              fontSize: "24px",
              marginLeft: "7px",
              verticalAlign: "middle",
            }}
          ></i>
        </Typography>
      </button>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        className="my-drawer"
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={2} className="side-box-left">
          <Button
            style={{ position: "absolute" }}
            className="closing-button-left"
            onClick={() => setIsDrawerOpen(false)}
          >
            <i
              className="fa fa-close"
              style={{ color: "white", fontSize: "24px" }}
            ></i>
          </Button>{" "}
          <div className="parent-div-chapters">
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "17px",
                marginLeft: "10px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
              color="white"
            >
              Chapters
            </Typography>
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 1,
                fontSize: "17px",
                marginLeft: "60px",
                marginTop: "10px",
                fontWeight: "bold",
              }}
              color="white"
            >
              Shlokes
            </Typography>
          </div>
          <div className="parent-div-chapters">
            <div className="list-chapters">
              {!!chapters &&
                !!chapters.length &&
                chapters.map((chapter, index) => {
                  return (
                    <div
                      className="list-chapter-item"
                      key={index}
                      onClick={() => handleClick(index)}
                    >
                      {chapter}
                    </div>
                  );
                })}
            </div>

            <div className="list-verses">
              {verse.length > 0
                ? verse.map((item, index) => (
                    <div
                      to={`#verse-${index + 1}`}
                      className="list-verse-item"
                      key={index}
                    >
                      {item.verseKey}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </Box>
      </Drawer>
      <VerseBody chapterNum={selectedIndex} authorsName={props.authorsName} />
    </div>
  );
};

export default SideBarChapters;
