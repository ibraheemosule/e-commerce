export const onlyAlphabet = (text: string) => {
  const re = /^[a-zA-Z ]+$/;
  if (text.match(re)) return true;
  return false;
};

export const validateEmail = (email: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(email);
};

export const validatePassword = (password: string) => {
  if (!/(?=.*[A-Z])/.test(password)) {
    return "uppercase letter";
  }
  if (!/(?=.*[a-z])/.test(password)) {
    return "lowercase letter";
  }
  if (!/(?=.*[^A-Za-z0-9<>])/.test(password)) {
    return "special character (excluding < and >)";
  }
  if (password.length < 8) {
    return "minimum length of 8 characters";
  }

  return "true";
};
