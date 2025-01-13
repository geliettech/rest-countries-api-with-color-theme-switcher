import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: { xs: "40vh", sm: "50vh", md: "60vh" },
      }}
    >
      <CircularProgress color="hsl(0, 0%, 100%)" size="3rem" />
    </Box>
  );
}