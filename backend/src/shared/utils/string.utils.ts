export const camelToSnakeCase = (str: string) =>
  str.split(/\.?(?=[A-Z])/).join('_').toLowerCase()