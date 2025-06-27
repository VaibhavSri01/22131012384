import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Box,
  Divider,
  Button,
} from "@mui/material";
import { log } from "../utils/log";

const UrlStatsPage = () => {
  const [data, setData] = useState([]);
  const [token] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LjIyc2NzZTEwMTI1NjBAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJleHAiOjE3NTEwMTUwODMsImlhdCI6MTc1MTAxNDE4MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjdjYWM2NDAwLTFhYzYtNGU3Mi1iMDZmLWQxM2ZkNmJlYzI1MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgc3JpdmFzdGF2YSIsInN1YiI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCJ9LCJlbWFpbCI6InZhaWJoYXYuMjJzY3NlMTAxMjU2MEBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsIm5hbWUiOiJ2YWliaGF2IHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjEzMTAxMjM4NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCIsImNsaWVudFNlY3JldCI6ImJyUGFiVGt3UHV5cFZidEgifQ.1O818RDmtVxyrheLVHUON1wtea-PXNO3xVn9aSnipmY"
  );

  useEffect(() => {
    const stored = localStorage.getItem("urlData");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        log("frontend", "info", "component", "Loaded stats from localStorage", token);
      } catch (err) {
        log("frontend", "error", "component", "Failed to parse localStorage stats", token);
      }
    } else {
      log("frontend", "warn", "component", "No stats data found", token);
    }
  }, [token]);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        📊 URL Statistics
      </Typography>

      {data.length === 0 ? (
        <Typography>No shortened URLs found.</Typography>
      ) : (
        data.map((item, i) => (
          item.result && (
            <Paper key={i} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6">🔗 Short URL:</Typography>
              <a href={item.result.short} target="_blank" rel="noreferrer">
                {item.result.short}
              </a>

              <Box mt={1}>
                <Typography>🌐 Original URL: {item.longUrl}</Typography>
                <Typography>⏳ Expires At: {item.result.expiresAt}</Typography>
                <Typography>📅 Created: {new Date().toLocaleString()}</Typography>
                <Typography>👁️‍🗨️ Clicks: (Simulated)</Typography>

                <ul style={{ marginTop: 4 }}>
                  <li>📍 India – 1:30 PM – from WhatsApp</li>
                  <li>📍 Germany – 2:15 PM – from Email</li>
                </ul>
              </Box>

              <Divider sx={{ mt: 2 }} />
            </Paper>
          )
        ))
      )}

      <Box mt={3}>
        <Button
          variant="outlined"
          onClick={() => (window.location.href = "/")}
        >
          🔙 Back to Shortener
        </Button>
      </Box>
    </Container>
  );
};

export default UrlStatsPage;
