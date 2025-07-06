export default async function handler(req, res) {
  const apiUrl = "http://test-noema-api.azurewebsites.net/api/requests";

  const response = await fetch(apiUrl, {
    method: req.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: req.method !== "GET" ? JSON.stringify(req.body) : undefined,
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
