// @NOTE options textNode and font are self exclusive, font has higher priority

export const getTextWidth = (text: string, options: { textNode?: HTMLElement; font?: string } = {}) => {
  const { font, textNode } = options;
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (context) {
    if (font) {
      context.font = font;
    } else {
      context.font = textNode ? getComputedStyle(textNode).font : getComputedStyle(document.body).font;
    }
  }

  return context ? context.measureText(text).width : 0;
};
