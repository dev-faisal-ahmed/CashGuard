export const isNumber = (value: string) => {
  for (const char of value) {
    const numberFromChar = Number(char);
    if (isNaN(numberFromChar) || typeof numberFromChar !== 'number')
      return false;
  }

  return true;
};
