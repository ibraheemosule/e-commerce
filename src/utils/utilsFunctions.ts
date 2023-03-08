import { KeyboardEvent } from "react";

export const isAlphabet = (
  e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const re = /^[a-zA-Z ]+$/;
  if (!e.key.match(re)) e.preventDefault();
};
