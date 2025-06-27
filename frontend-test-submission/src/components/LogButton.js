// frontend-test-submission/src/components/LogButton.js
import React from "react";
import { Button } from "@mui/material";
import { log } from "../utils/log";

const LogButton = () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LjIyc2NzZTEwMTI1NjBAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJleHAiOjE3NTEwMTUwODMsImlhdCI6MTc1MTAxNDE4MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjdjYWM2NDAwLTFhYzYtNGU3Mi1iMDZmLWQxM2ZkNmJlYzI1MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgc3JpdmFzdGF2YSIsInN1YiI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCJ9LCJlbWFpbCI6InZhaWJoYXYuMjJzY3NlMTAxMjU2MEBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsIm5hbWUiOiJ2YWliaGF2IHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjEzMTAxMjM4NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCIsImNsaWVudFNlY3JldCI6ImJyUGFiVGt3UHV5cFZidEgifQ.1O818RDmtVxyrheLVHUON1wtea-PXNO3xVn9aSnipmY";

  const handleClick = async () => {
    try {
      await log("frontend", "info", "component", "Log button clicked", token);
      alert("Log sent successfully ✅");
    } catch (err) {
      alert("❌ Logging failed.");
    }
  };

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      Click to Log
    </Button>
  );
};

export default LogButton;
