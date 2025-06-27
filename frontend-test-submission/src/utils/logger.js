const axios = require("axios");

/**
 * Log messages to the Affordmed test server.
 */
async function log(stack, level, logPackage, message, token) {
  const payload = {
    stack: stack.toLowerCase(),
    level: level.toLowerCase(),
    package: logPackage.toLowerCase(),
    message,
  };

  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Log failed:", error.response?.data || error.message);
  }
}

module.exports = { log };
