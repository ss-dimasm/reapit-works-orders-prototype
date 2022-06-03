export const toBeCapitalizedSentence = (text: string): string => {
  return `${text[0].toUpperCase()}${text.slice(1)}`
}
