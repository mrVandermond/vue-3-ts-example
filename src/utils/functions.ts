export function getItemIndexBy<T>(array: T[], item: T, field: keyof T): number {
  return array.findIndex((temp) => temp[field] === item[field]);
}
