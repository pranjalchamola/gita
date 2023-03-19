import baseUrl from "../../api/apiUrl";
import "./verseBody.css";
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";

const VerseBody = (props) => {
  const [chapter, setChapter] = useState([]);
  const [translations, setTranslations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState();

  useEffect(() => {
    axios
      .get(`${baseUrl}/chapter/number/${props.chapterNum}`)
      .then((response) => {
        setChapter(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.chapterNum]);

  useEffect(() => {
    if (props.authorsName.length !== 0 && props.chapterNum !== null) {
      axios
        .get(
          `${baseUrl}/translation/byAuthor/${props.authorsName}/${props.chapterNum}`
        )
        .then((response) => {
          setTranslations(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.authorsName, props.chapterNum]);

  return (
    <div className="body-div">
      {chapter.verse && chapter.verse.length > 0
        ? chapter.verse.map((item, index) => (
            <React.Fragment key={index}>
              <div className="list-verse-data" id={`verse-${index + 1}`}>
                <div>
                  {item.verseData.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                      <span style={{ display: "block", marginBottom: "1px" }}>
                        {line}
                        <br />
                      </span>
                    </React.Fragment>
                  ))}
                </div>
                <div className="translation-div">
                  {translations.length
                    ? translations.map((translation, indexT) =>
                        translation.verses && translation.verses[index] ? (
                          <React.Fragment key={indexT}>
                            <div className="abcd">
                              {translation.verses[index].text} -:{" "}
                              <span style={{ color: "grey", fontSize: "12px" }}>
                                {translation.verses[index].resourceName}
                              </span>
                            </div>
                            <br />
                          </React.Fragment>
                        ) : null
                      )
                    : null}
                </div>
              </div>
            </React.Fragment>
          ))
        : null}
    </div>
  );
};

export default VerseBody;
