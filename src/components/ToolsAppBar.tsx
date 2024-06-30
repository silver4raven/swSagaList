//Core elements
import React, { ReactElement } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
//mui components
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
//mui icons
import SearchIcon from "@mui/icons-material/Search";

import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  shortBy: string;
  changeShortBy: (newShortBy: string) => void;
  theme: Theme;
  colorMode: { toggleColorMode: () => void };
}

const shortTypes = [
  { value: "episode_id", typeLabel: "Episode number" },
  { value: "title", typeLabel: "Title" },
  { value: "average_rating", typeLabel: "Average rating" },
  { value: "release_date", typeLabel: "Year of release" },
];

export default function ToolsAppBar({
  searchQuery,
  onSearchChange,
  shortBy,
  changeShortBy,
  theme,
  colorMode,
}: Props): ReactElement | null {
  return (
    <Box>
      <AppBar position="static" style={{ boxShadow: "none" }}>
        <Toolbar>
          <FormControl sx={{ minWidth: "120px;" }}>
            <InputLabel id="demo-simple-select-label">Short by</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={/* shortBy === "undefined" ? "release_date" :  */ shortBy}
              label="Short by"
              onChange={(e) => changeShortBy(e.target.value)}
            >
              {shortTypes.map((shortType) => {
                return (
                  <MenuItem value={shortType.value} key={shortType.value}>
                    {shortType.typeLabel}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }}></Box>
          {theme.palette.mode} mode
          <IconButton
            sx={{ ml: 1 }}
            onClick={() => colorMode.toggleColorMode()}
            color="inherit"
          >
            {theme.palette.mode === "dark" ? (
              <Brightness7Icon />
            ) : (
              <Brightness4Icon />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

//functions

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
