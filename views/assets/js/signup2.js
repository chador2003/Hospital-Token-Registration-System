const form = document.getElementById("signup");
const username1 = document.getElementById("username1");
const cid1 = document.getElementById("cid1");
const contact1 = document.getElementById("contact1No");
const email1 = document.getElementById("email1");
const password1 = document.getElementById("password");
const password2_1 = document.getElementById("confirm-Password");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("small");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector("small");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const username1validate = (username1) => {
  const re = /^[A-Za-z]+$/;
  return re.test(username1);
};

const iscid1Valid = (cid1) => {
  const re =
    /^[1-5][1-9][0-9]|[1-9][0-9]|0[0-9]|[1-1][0-9][0-9]|[2-2][0-0-4][0-9][0-9]|[3-5][0-0-9][0-9]$/;
  return re.test(cid1);
};

const contact1validate = (username1) => {
  const re = /^(17|77)\d{6}$/;
  return re.test(username1);
};

const isemail1Valid = (email1) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email1);
};

const isPasswordSecure = (password1) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
  return re.test(password1);
};

const validateInputs = () => {
  const username1value = username1.value.trim();
  const cid1value = cid1.value.trim();
  const contact1value = contact1.value.trim();
  const email1value = email1.value.trim();
  const passwordvalue = password1.value.trim();
  const password2value = password2_1.value.trim();

  if (username1value === "") {
    setError(username1, "username1 cannot be blank");
  } else if (!(username1value.length >= 3 && username1value.length <= 25)) {
    setError(username1, "length of usename should be inbetween 3 and 25");
  } else if (!username1validate(username1value)) {
    setError(username1, "usename should be only alphabate");
  } else {
    setSuccess(username1);
  }

  if (cid1value === "") {
    setError(cid1, "cid1 cannot be blank");
  } else if (cid1value.length !== 11) {
    setError(cid1, "length of cid1 number should be 11");
  } else if (!iscid1Valid(cid1value)) {
    setError(cid1, "cid1 number is not valid");
  } else {
    setSuccess(cid1);
  }

  if (contact1value === "") {
    setError(contact1, "contact1 number cannot be blank");
  } else if (!contact1validate(contact1value)) {
    setError(
      contact1,
      "contact1 number should start with 17 or 77 and length should be 8 digit"
    );
  }

  if (email1value === "") {
    setError(email1, "email1 cannot be blank");
  } else if (!isemail1Valid(email1value)) {
    setError(email1, "email1 is not in proper formate");
  } else {
    setSuccess(email1);
  }

  if (passwordvalue === "") {
    setError(password1, "password cannot be blank");
  } else if (passwordvalue.length !== 8) {
    setError(password1, "it should be atleast 8 character");
  } else if (!isPasswordSecure(passwordvalue)) {
    setError(
      password1,
      "password should be minimum of 8 character,\nshould contain a capital letter and small letter, \natleast a number and a special character "
    );
  }

  if (password2value === "") {
    setError(password2_1, "confirm password cannot be empty");
  } else if (password2value !== passwordvalue) {
    setError(password2_1, "confirm password and password should be same");
  } else {
    setSuccess(password2_1);
  }
};
