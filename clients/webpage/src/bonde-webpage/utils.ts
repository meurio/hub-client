export const checkToParse = (input: any) => {
  try {
    return JSON.parse(input);
  } catch (e) {
    return input;
  }
};
