export class ReplyError extends Error {
  private statusCode: number;
  private error: string;

  constructor(statusCode: number, error: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}
