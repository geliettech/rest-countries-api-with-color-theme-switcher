// Import the React library to use components and hooks
import * as React from "react";

// Import components
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Define and export the CircularIndeterminate functional component
export default function CircularIndeterminate() {
  return (
    <Box
      // Style the Box to create a flex container that centers its children
      sx={{
        display: "flex", 
        justifyContent: "center",
        alignItems: "center", 
        height: "60vh", 
      }}
    >
      {/* Display a loading spinner with custom color and size */}
      <CircularProgress color="hsl(0, 0%, 100%)" size="3rem" />
    </Box>
  );
}
