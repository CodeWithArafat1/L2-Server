import type { ServerResponse } from "http";

export const sendResponse = (
  res: ServerResponse,
  status: number,
  success: boolean,
  message: string,
  data: any,
) => {
  const response = {
    success,
    message,
    data,
  };

  res.writeHead( status, { "content-type": "application/json" });
  res.end(JSON.stringify(response));
};
