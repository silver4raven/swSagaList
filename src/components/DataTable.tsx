//Core elements
import { SxProps } from "@mui/material";
import React, { ReactElement } from "react";
//mui components
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { GridSortModel } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
//interfaces
import { episode } from "../functionsAndInterfaces/episode";

interface Props {
  style?: SxProps;
  movieList: episode[];
  onClick: (selectedEpisode: number) => void;
  sortModel: GridSortModel;
  onSortModelChange: (newSortModel: GridSortModel) => void;
}

export default function DataTable({
  movieList,
  onClick,
  sortModel,
  onSortModelChange,
}: Props): ReactElement | null {
  const columns: GridColDef[] = [
    { field: "episode_id", headerName: "Episode", width: 80 },
    { field: "title", headerName: "Title", width: 180 },
    {
      field: "average_rating",
      headerName: "Av. Rating",
      type: "number",
      width: 190,
      cellClassName: "font-tabular-nums",
      renderCell: (params) => avRating(params.value),
      /* valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`, */
    },
    {
      field: "release_date",
      headerName: "Release Date",
      type: "string",
      width: 140,
    },
  ];

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    onClick(params.row.episode_id);
  };
  return (
    <Box sx={{ height: "100%", width: "50%", bgcolor: "background.default" }}>
      <DataGrid
        onRowClick={handleRowClick}
        getRowId={(row) => row.episode_id}
        rows={movieList}
        columns={columns}
        pageSizeOptions={[10]}
        sortModel={sortModel}
        onSortModelChange={(newSortModel) => onSortModelChange(newSortModel)}
        autoPageSize
      />
    </Box>
  );
}

const avRating = (value: number) => (
  <Tooltip
    title={
      value ? <Typography>Average rating: {value.toString()}%</Typography> : 0
    }
  >
    <Rating
      size="small"
      name="read-only"
      value={value ? value / 10 : 0}
      readOnly
      precision={0.5}
      max={10}
    />
    {/* {<Typography>{value.toString()}</Typography>} */}
  </Tooltip>
);

/* function numToName(number: number): string {
  let names = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return names[number];
}
function dateTransformer(date: string): string {
  return (
    date.slice(8, 10) +
    " " +
    numToName(parseInt(date.slice(5, 7)) - 1) +
    " " +
    date.slice(0, 4) +
    " " +
    "00:00:00 GMT"
  );
}
const parseDate: GridValueGetter<(typeof movieList)[number], unknown> = (
  value,
  movieList
) => {
  return movieList.release_date
    ? dateTransformer(movieList.release_date)
    : "01 Jan 1970 00:00:00 GMT";
}; */
