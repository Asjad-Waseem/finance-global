// Note: This file serves as a workaround to route HTTP backend requests through HTTPS, ensuring compatibility with Vercel's production environment.

import { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const apiUrl = "http://test-noema-api.azurewebsites.net/api/requests";
  try {
    const response = await fetch(apiUrl, {
      method: req?.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req?.method !== "GET" ? JSON?.stringify(req?.body) : undefined,
    });
    const data = await response?.json();
    res.status(response?.status)?.json(data);
  } catch (error) {
    console?.error("Proxy error:", error);
    res?.status(500).json({
      message: "Proxy request failed",
      error: error instanceof Error ? error?.message : error,
    });
  }
}
