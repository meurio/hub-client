import { ContentState, convertToRaw } from 'draft-js';

export default (text: any) => {
  const contentState = ContentState.createFromText(text);
  const rawContentState = convertToRaw(contentState);
  return JSON.stringify(rawContentState);
};
