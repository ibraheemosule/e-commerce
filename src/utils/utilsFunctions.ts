export const onlyAlphabet = (text: string) => {
  const re = /^[a-zA-Z ]+$/;
  if (text.match(re)) return true;
  return false;
};

export const validateEmail = (email: string) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(email);
};
