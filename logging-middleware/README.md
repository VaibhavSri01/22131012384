# Logging Middleware for Affordmed Test

Reusable logger that sends structured logs to the Affordmed evaluation server.

## Usage

### In Node.js or React:
```js
import { log } from "../utils/log"; // React frontend
// or
const { log } = require("./logger"); // Backend or Node.js

log("frontend", "info", "component", "Form submitted", token);
