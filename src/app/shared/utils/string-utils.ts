export const removeLeadingSlash = (input: string): string =>
  input.startsWith('/') ? input.slice(1) : input;
