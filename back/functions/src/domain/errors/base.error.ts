export class Error {
  statusCode: number;
  status: string;
  message: string;
  tittle: string;

  constructor(
    statusCode: number,
    tittle: string,
    message: string,
    status: string,
  ) {
    this.statusCode = statusCode;
    this.status = status;
    this.message = message;
    this.tittle = tittle;
  }
}
