export class AppError extends Error {
  constructor(message: string, name?: string) {
    super(message);
    this.name = name ?? 'Có lỗi xảy ra';
  }
}
