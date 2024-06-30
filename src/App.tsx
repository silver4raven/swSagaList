//Core elements
import React, { ReactElement, useState, useEffect } from "react";
import { GridSortModel } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
//mui components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
//custom components
/* import MoviesList from "./components/MoviesList"; */
import DetailsCard from "./components/DetailsCard";
import ToolsAppBar from "./components/ToolsAppBar";
import DataTable from "./components/DataTable";
//functions
import convertToRoman from "./functionsAndInterfaces/convertToRoman";
//interfaces
import { episode } from "./functionsAndInterfaces/episode";
import { rating } from "./functionsAndInterfaces/rating";
import { Typography } from "@mui/material";

export default function App(): ReactElement | null {
  let movies: episode[] = [];
  let episode: episode = {};
  let ratitngs: rating[] = [];
  let emptyRating: rating = { Source: "", Value: "" };

  const SwApi = "https://swapi.dev/api/films/?format=json";
  const [swMovies, getSwMovies] = useState(movies);
  const [swMoviesFiltered, getSwMoviesFiltered] = useState(movies);
  const [selectedEpisode, selectEpisode] = useState(episode);
  const [searchQuery, setSearchQuerry] = useState("");
  const [sortModel, setSortModel] = useState<GridSortModel>([
    {
      field: "release_date",
      sort: "desc",
    },
  ]);

  function handleSortModelChange(sortModel: GridSortModel): void {
    setSortModel(sortModel);
  }
  function changeSearchQuerry(value: string): void {
    setSearchQuerry(value);
    let moviesFiltered: episode[] = [];
    for (const i in swMovies) {
      if (swMovies[i].title?.toLowerCase().indexOf(value) !== -1) {
        moviesFiltered.push(swMovies[i]);
      }
    }
    getSwMoviesFiltered(moviesFiltered);
  }
  function changeEpisode(selectedEpisode: number): void {
    for (const i in swMovies) {
      if (swMovies[i].episode_id === selectedEpisode) {
        selectEpisode(swMovies[i]);
      }
    }
  }
  useEffect(() => {
    //Keys in omdbapi start with lowercase but in swapi start with upercase.
    callRestApi(SwApi).then((result) => {
      console.log("***SwApi replied!***");
      movies = result.results;
      getSwMovies(movies);
      for (const i in result.results) {
        ratitngs.push(emptyRating);
      }
      for (const i in result.results) {
        const apiUrl: string =
          "http://www.omdbapi.com/?apikey=b9a5e69d&t=Star%20Wars:%20Episode%20" +
          convertToRoman(result.results[i].episode_id) +
          "%20" +
          removeSpaces(result.results[i].title);
        callRestApi(apiUrl).then((result) => {
          console.log("***OmdbApi replied!***");
          movies[parseInt(i)].ratings = result.Ratings;
          let averagRating = 0;
          averagRating = getAverageRating(result.Ratings);
          movies[parseInt(i)].average_rating = averagRating;
          movies[parseInt(i)].poster = result.Poster;
          getSwMovies(movies.slice());
        });
      }
    });
  }, []);

  useEffect(() => {
    changeSearchQuerry(searchQuery);
  }, [swMovies]);

  const ColorModeContext = React.createContext({ toggleColorMode: () => {} });
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Paper
          className="App"
          sx={{ height: "100%", bgcolor: "text.secondary" }}
        >
          <Container
            className="AppContainer"
            sx={{
              width: "100%",
              height: "100%",
              bgcolor: "common.white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <ToolsAppBar
              searchQuery={searchQuery}
              onSearchChange={(value: string) => changeSearchQuerry(value)}
              shortBy={sortModel[0] ? sortModel[0].field : ""}
              changeShortBy={(newShortBy) => {
                handleSortModelChange([
                  {
                    field: newShortBy,
                    sort: "desc",
                  },
                ]);
              }}
              theme={theme}
              colorMode={colorMode}
            />
            {swMovies.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  alignContent: "center",
                  paddingTop: "20%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography align="center">Loading. Please wait!</Typography>
                <CircularProgress />
              </Box>
            ) : (
              <Stack direction="row" sx={{ flex: "1 1 auto" }}>
                <DataTable
                  movieList={swMoviesFiltered}
                  onClick={(selectedEpisode: number) =>
                    changeEpisode(selectedEpisode)
                  }
                  onSortModelChange={(sortModel) => {
                    handleSortModelChange(sortModel);
                  }}
                  sortModel={sortModel}
                />
                <DetailsCard episode={selectedEpisode} />
              </Stack>
            )}
          </Container>
        </Paper>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

//Functions

async function callRestApi(restEndpoint: string): Promise<any> {
  console.log("***Rest API call initiated!***");
  console.log("***Rest endpoint: ", restEndpoint, " .***");
  const response = await fetch(restEndpoint);
  const jsonResponse = await response.json();
  return jsonResponse;
}

function removeSpaces(title: string): string {
  let safeTitle: string = title.replace(/ /g, "%20");
  return safeTitle;
}

function getAverageRating(ratings: rating[]): number {
  return Math.round(
    (parseFloat(ratings[0].Value) * 10 +
      parseFloat(ratings[1].Value) +
      parseFloat(ratings[2].Value)) /
      3
  );
}
