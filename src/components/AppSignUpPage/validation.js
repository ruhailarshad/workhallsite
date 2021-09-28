const isCheck = (val, Reg, name) => {
  if (!val.length) {
    return {
      isValid: false,
      error: `${name} must not be left empty`,
    };
  } else if (!Reg.test(val)) {
    return {
      isValid: false,
      error: `Please enter a valid ${name}`,
    };
  }
  return {
    isValid: true,
    error: "",
  };
};

export const nameCheck = (val) => {
  const nameReg = /^[a-z ,.'-]+$/i;
  return isCheck(val, nameReg, "name");
};

export const desCheck = (val) => {
  const nameReg = /^[a-zA-Z ]+$/;
  return isCheck(val, nameReg, "occupation");
};
export const phoneCheck = (val) => {
  const Reg = /^[0-9]*$/;
  return isCheck(val, Reg, "Phone Number");
};
export const emailCheck = (val) => {
  const Reg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return isCheck(val, Reg, "Email");
};
