export class Book {
  constructor(
    public barcode: string,
    public isbn: string,
    public add_time: Date,
    public location: string,
    public available: boolean,
    public deleted: boolean
  ) {}
}
