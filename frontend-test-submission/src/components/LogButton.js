// frontend-test-submission/src/components/LogButton.js
import React from "react";
import { Button } from "@mui/material";
import { log } from "../utils/log";

const LogButton = () => {
  const handleClick = () => {
    log("frontend", "info", "component", "Log button clicked");
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Click to Log
    </Button>
  );
};

export default LogButton;
