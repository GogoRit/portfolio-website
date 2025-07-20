import serverless from "serverless-http";
import { createServer } from "../../server";

// Create the server with serverless mode enabled
const app = createServer({ serverless: true });

// Export the serverless handler
export const handler = serverless(app);
