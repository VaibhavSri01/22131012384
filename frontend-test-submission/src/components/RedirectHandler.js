// frontend-test-submission/src/components/RedirectHandler.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Container, Typography } from "@mui/material";
import { log } from "../utils/log";

const RedirectHandler = () => {
  const { shortcode } = useParams();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const data = localStorage.getItem("urlData");
    if (!data) {
      setStatus("error");
      log("frontend", "error", "component", "No URL data found in storage");
      return;
    }

    const parsed = JSON.parse(data);
    const match = parsed.find((item) => item.shortcode === shortcode);

    if (match) {
      const expiry = new Date(match.result.expiresAt);
      const now = new Date();

      if (now > expiry) {
        setStatus("expired");
        log("frontend", "warn", "component", `Shortcode ${shortcode} expired`);
        return;
      }

      log("frontend", "info", "component", `Redirecting to ${match.longUrl}`);
      window.location.href = match.longUrl;
    } else {
      setStatus("notfound");
      log("frontend", "error", "component", `Shortcode ${shortcode} not found`);
    }
  }, [shortcode]);

  if (status === "loading") {
    return (
      <Container>
        <Typography variant="h6" sx={{ mt: 5 }}>Redirecting...</Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container>
      {status === "notfound" && (
        <Typography variant="h5" color="error" sx={{ mt: 5 }}>
          ❌ Short URL not found.
        </Typography>
      )}
      {status === "expired" && (
        <Typography variant="h5" color="error" sx={{ mt: 5 }}>
          ⌛ This short link has expired.
        </Typography>
      )}
    </Container>
  );
};

export default RedirectHandler;
