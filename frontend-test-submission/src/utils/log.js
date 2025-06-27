import axios from "axios";

/**
 * Log messages to the Affordmed test server.
 *
 * @param {string} stack - "frontend" or "backend"
 * @param {string} level - "debug", "info", "warn", "error", or "fatal"
 * @param {string} logPackage - e.g., "component", "hook", "utils", etc.
 * @param {string} message - Your custom log message
 * @param {string} token - Authorization Bearer Token
 */
export async function log(stack, level, logPackage, message, token) {
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
