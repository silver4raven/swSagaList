//Core elements
import React, { ReactElement } from "react";
import { indigo } from "@mui/material/colors";
//mui components
import { Typography, Card, Stack, Box } from "@mui/material";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import Skeleton from "@mui/material/Skeleton";
//functions
import convertToRoman from "../functionsAndInterfaces/convertToRoman";
//interfaces
import { episode } from "../functionsAndInterfaces/episode";

interface Props {
  episode: episode;
}

export default function DetailsCard({ episode }: Props): ReactElement | null {
  if (JSON.stringify(episode) === JSON.stringify({})) {
    return (
      <Card sx={{ minWidth: 275, width: "50%", p: 2, borderRadius: "0px" }}>
        <Typography align="center" paddingTop={"10%"} width={"100%"}>
          "Please select an episode from the list and enjoy!!!"
        </Typography>
      </Card>
    );
  } else {
    return (
      <Card sx={{ minWidth: 275, width: "50%", p: 2, borderRadius: "0px" }}>
        <Stack spacing={2}>
          <Typography variant="h6">
            Episode{" "}
            {episode.episode_id ? convertToRoman(episode.episode_id) : ""} -{" "}
            {episode.title}
          </Typography>
          <Stack direction={"row"} spacing={2}>
            {episode.poster ? (
              <Box width={"30%"}>
                <img width={"100%"} src={episode.poster} alt="poster"></img>
              </Box>
            ) : (
              <Skeleton variant="rounded" width={"30%"} height={240} />
            )}

            <Box width={"70%"}>
              <Typography>{episode.opening_crawl}</Typography>
            </Box>
          </Stack>
          <Typography>Directed by: {episode.director}</Typography>
          <Tooltip
            title={
              episode.average_rating ? (
                <Typography>
                  Average rating: {episode.average_rating.toString()}%
                </Typography>
              ) : (
                <Typography>Ratings not available. Please wait!</Typography>
              )
            }
          >
            <Stack direction={"row"} spacing={2}>
              <Typography>Average rating:</Typography>
              <Rating
                name="read-only"
                value={episode.average_rating ? episode.average_rating / 10 : 0}
                readOnly
                precision={0.5}
                max={10}
              />
            </Stack>
          </Tooltip>
          <Stack direction={"row"} spacing={1}>
            <Box sx={boxStyle}>
              <Typography variant="body2">
                Internet Movie Database:{" "}
                {episode.ratings
                  ? parseFloat(episode.ratings[0].Value) * 10
                  : ""}
                %
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography variant="body2">
                Rotten Tomatoes{" "}
                {episode.ratings ? parseFloat(episode.ratings[1].Value) : ""}%
              </Typography>
            </Box>
            <Box sx={boxStyle}>
              <Typography variant="body2">
                Metacritic{" "}
                {episode.ratings ? parseFloat(episode.ratings[2].Value) : ""}%
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Card>
    );
  }
}

//functions and variables

const borderColor = indigo[500];

const boxStyle = {
  borderWidth: "0.1em",
  borderStyle: "solid",
  borderColor: "text.secondary",
  borderRadius: "0.3em",
  px: 1,
};
