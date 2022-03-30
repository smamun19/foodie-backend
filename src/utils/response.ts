import HttpStatusCode from "./HttpStatusCode";

export class KnownError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    message: string,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = "KnownError";
  }
}
