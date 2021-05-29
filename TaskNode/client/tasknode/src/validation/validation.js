let number = /[0-9]/g;
let smallalpha = /[a-z]/g;
let capalpha = /[A-Z]/g;
let specialchars = /\W/;
let letters = /^[0-9a-zA-Z]+$/g;
let alphabets = /^[A-Za-z_ ]+$/;
let contactno = /^\d{10}$/;
let validEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const name = (name) => {
  if (!name.match(alphabets)) {
    return "Name must contain only alphabets";
  }
  return true;
};
export const contact = (number) => {
  if (!number.match(contactno)) {
    return "Phone must be of 10 digits";
  }
  return true;
};

export const email = (email) => {
  if (validEmail.test(email)) {
    return true;
  }
  return "Enter a valid email address";
};

export const username = (username) => {
  if (!username.match(letters)) {
    return "Username must be alphanumeric";
  }
  return true;
};
export const password = (password) => {
  let pswdlength = password.length;

  if (!password.match(number)) {
    return "Password must contain atlease one number";
  } else if (!password.match(smallalpha)) {
    return "Password must contain atleast one small alphabet";
  } else if (!password.match(capalpha)) {
    return "Password must contain atleast one capital alphabet";
  } else if (!password.match(specialchars)) {
    return "Password must contain atleast one special alphabet";
  } else if (pswdlength < 8 || pswdlength > 16) {
    return "Minimum length of password is 8 but not more than 16";
  }
  return true;
};

export const dob = (age) => {
  if (!age) {
    return "Enter your age";
  } else if (age === "in" || age === "In") {
    return "Invalide date";
  }
  return true;
};

export const verifyAllfields = (formValue) => {
  if (!formValue.name.match(alphabets)) {
    return "Name must contain only alphabets";
  } else if (!formValue.contact.match(contactno)) {
    return "Phone must be of 10 digits";
  } else if (!formValue.email.match(validEmail)) {
    return "Enter a valid information";
  } else if (formValue.dob === "in" || formValue.dob === "In") {
    return "Invalide date";
  } else if (!formValue.username.match(letters)) {
    return "Username must be alphanumeric";
  } else if (!formValue.password.match(number)) {
    return "Password must contain atlease one number";
  } else if (!formValue.password.match(smallalpha)) {
    return "Password must contain atleast one small alphabet";
  } else if (!formValue.password.match(capalpha)) {
    return "Password must contain atleast one capital alphabet";
  } else if (!formValue.password.match(specialchars)) {
    return "Password must contain atleast one special alphabet";
  } else if (formValue.password.length < 8 || formValue.password.length > 16) {
    return "Minimum length of password is 8 but not more than 16";
  }
  return true;
};
