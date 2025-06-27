import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Paper
} from "@mui/material";
import { log } from "../utils/log";
import { v4 as uuidv4 } from "uuid";

const UrlShortenerPage = () => {
  const [urls, setUrls] = useState([
    { longUrl: "", shortcode: "", validity: "", result: null, error: "" }
  ]);

  // Bearer token for logging
  const [token] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJ2YWliaGF2LjIyc2NzZTEwMTI1NjBAZ2FsZ290aWFzdW5pdmVyc2l0eS5lZHUuaW4iLCJleHAiOjE3NTEwMTUwODMsImlhdCI6MTc1MTAxNDE4MywiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjdjYWM2NDAwLTFhYzYtNGU3Mi1iMDZmLWQxM2ZkNmJlYzI1MiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InZhaWJoYXYgc3JpdmFzdGF2YSIsInN1YiI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCJ9LCJlbWFpbCI6InZhaWJoYXYuMjJzY3NlMTAxMjU2MEBnYWxnb3RpYXN1bml2ZXJzaXR5LmVkdS5pbiIsIm5hbWUiOiJ2YWliaGF2IHNyaXZhc3RhdmEiLCJyb2xsTm8iOiIyMjEzMTAxMjM4NCIsImFjY2Vzc0NvZGUiOiJNdWFndnEiLCJjbGllbnRJRCI6IjZjM2IwYmY1LTQwYWEtNGU3ZS1iNjZjLTBlZDY4OTE2ODU1ZCIsImNsaWVudFNlY3JldCI6ImJyUGFiVGt3UHV5cFZidEgifQ.1O818RDmtVxyrheLVHUON1wtea-PXNO3xVn9aSnipmY"
  );

  const handleChange = (index, field, value) => {
    const updated = [...urls];
    updated[index][field] = value;
    setUrls(updated);
  };

  const addMore = () => {
    if (urls.length < 5) {
      setUrls([
        ...urls,
        { longUrl: "", shortcode: "", validity: "", result: null, error: "" }
      ]);
    }
  };

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortcode = () => uuidv4().slice(0, 6);

  const handleSubmit = async () => {
    const updated = await Promise.all(
      urls.map(async (item) => {
        let error = "";

        // URL validation
        if (!item.longUrl || !validateUrl(item.longUrl)) {
          error = "❌ Invalid URL";
          await log("frontend", "error", "component", "Invalid URL format", token);
          return { ...item, error };
        }

        const code = item.shortcode || generateShortcode();
        const validity = parseInt(item.validity) > 0 ? parseInt(item.validity) : 30;

        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + validity);

        const result = {
          short: `http://localhost:3000/${code}`,
          long: item.longUrl,
          expiresAt: expiry.toLocaleString()
        };

        await log(
          "frontend",
          "info",
          "component",
          `Shortened URL: ${item.longUrl} => ${code}`,
          token
        );

        return {
          ...item,
          shortcode: code,
          validity,
          result,
          error: ""
        };
      })
    );

    setUrls(updated);
    localStorage.setItem("urlData", JSON.stringify(updated));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        🔗 URL Shortener
      </Typography>

      {urls.map((item, index) => (
        <Paper key={index} elevation={3} sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Original URL"
                fullWidth
                value={item.longUrl}
                onChange={(e) => handleChange(index, "longUrl", e.target.value)}
                error={!!item.error}
                helperText={item.error}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Custom Shortcode (optional)"
                fullWidth
                value={item.shortcode}
                onChange={(e) => handleChange(index, "shortcode", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Validity in Minutes (optional)"
                type="number"
                fullWidth
                value={item.validity}
                onChange={(e) => handleChange(index, "validity", e.target.value)}
              />
            </Grid>

            {item.result && (
              <Grid item xs={12}>
                <Typography>
                  ✅ Short URL:{" "}
                  <a href={item.result.short} target="_blank" rel="noreferrer">
                    {item.result.short}
                  </a>
                  <br />
                  ⏳ Expires At: {item.result.expiresAt}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Paper>
      ))}

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          🔐 Shorten URLs
        </Button>
        {urls.length < 5 && (
          <Button variant="outlined" onClick={addMore}>
            ➕ Add More
          </Button>
        )}
      </Box>

      <Box mt={3}>
        <Button
          variant="text"
          onClick={() => (window.location.href = "/stats")}
        >
          📊 View URL Stats
        </Button>
      </Box>
    </Container>
  );
};

export default UrlShortenerPage;
