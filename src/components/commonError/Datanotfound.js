import { Box, Typography } from "@mui/material";
import React from "react";

export const Datanotfound = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h6">No Data found...</Typography>
    </Box>
  );
};
