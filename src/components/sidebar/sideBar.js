import "../navbar/MuiNavbarStyle.css";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

import React, { useEffect, useState } from "react";
import baseUrl from "../../api/apiUrl";

const SideBar = (props) => {
  const { translationName, setTranslationName } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/translation`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 6.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = data.length > 0 ? data.map((item) => item.authorName) : [];

  const namesLang =
    data.length > 0
      ? data.map(
          (item) =>
            item.chapterList[0].verses[0].language.slice(0, 1).toUpperCase() +
            item.chapterList[0].verses[0].language.slice(1) +
            " - " +
            item.authorName
        )
      : [];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    props.onUpdateAuthorsName(value);
    setTranslationName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    event.preventDefault();
    //console.log(translationName);
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="demo-multiple-checkbox-label" style={{ color: "white" }}>
        Select Translation
      </InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={translationName}
        onChange={handleChange}
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
        style={{ color: "white" }}
      >
        {namesLang.map((name, index) => (
          <MenuItem
            key={index}
            value={names[index]} // set the value to the corresponding item in `names`
            style={{ backgroundColor: "#252931", color: "white" }}
          >
            <Checkbox
              style={{ color: "white" }}
              checked={translationName.indexOf(names[index]) > -1}
            />
            <ListItemText primary={name} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SideBar;
