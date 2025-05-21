import { showAlert } from "./alert.js";
// ========= trying the read from database ========
//  =========== === ends ===========================

// ======================= ========================================== ============================== ====================
// new code implementation
const username1 = document.getElementById("name");
const cid1 = document.getElementById("cidNumber");
const contact1 = document.getElementById("contactNumber");
const email1 = document.getElementById("email");
const password1 = document.getElementById("password");
const password2_1 = document.getElementById("passwordConfirm");

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
  const re = /^[A-Za-z]+(?: [A-Za-z]+)?$/;
  return re.test(username1);
};

const iscid1Valid = (cid1) => {
  const re = /^[1-5](0[1-9]|1[0-9]|20)(0[1-9]|1[0-7])\d{6}$/;
   return re.test(cid1);
};

const contact1validate = (contact1) => {
  const re = /^(17|77)\d{6}$/;
  return re.test(contact1);
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

// ======================= ========================================== ============================== ====================

export const signup = async (
  name,
  cidNumber,
  cidNumberr,
  contactNumber,
  email,
  emaill,
  password,
  passwordConfirm
) => {
  //  ======== reading the data of backend =======
const getusers = await axios({
  method: "GET",
  url: "http://localhost:4001/api/v1/users"
})

const allusers = getusers.data.data;
console.log(allusers);

const emailArray = allusers.map(user => user.email);
for (let i in emailArray) {
  if (emailArray[i] === email){
    setError(emaill, "the email already exists")
  }
}

const cidArray = allusers.map(user => user.cidNumber);
for (let i in cidArray) {
  if (cidArray[i] === cidNumber){
    setError(cidNumberr, "The cid number already exists")
  }
}
// the code ends here ============================
  try {
    const res = await axios({
      method: "POST",
      url: "http://localhost:4001/api/v1/users/signup",
      data: {
        name,
        cidNumber,
        contactNumber,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res.data);
    if (res.data.status === "success") {
      showAlert("success", "Account created successfully!");
      window.setTimeout(() => {
        location.assign("/home2");
      }, 1500);
    }
  } catch (err) {
  let message;
  if (err.response && err.response.data && err.response.data.message) {
    message = err.response.data.message;
  } else {
    message = err.message || "Something went wrong!";
  }
  showAlert("error", message);
}
};

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const cidNumber = document.getElementById("cidNumber").value;
  const cidNumberr = document.getElementById("cidNumber");
  const contactNumber = document.getElementById("contactNumber").value;
  const email = document.getElementById("email").value;
  const emaill = document.getElementById("email");
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  validateInputs();
  signup(name, cidNumber,cidNumberr, contactNumber, email,emaill, password, passwordConfirm);
});

const validateInputs = () => {
  const username1value = username1.value.trim();
  console.log(username1value);
  console.log(username1);
  const cid1value = cid1.value.trim();
  const contact1value = contact1.value.trim();
  const email1value = email1.value.trim();
  const passwordvalue = password1.value.trim();
  const password2value = password2_1.value.trim();

  console.log("allusers");
  if (username1value === "") {
    setError(username1, "username1 cannot be blank");
    // return false;
  } else if (!(username1value.length >= 3 && username1value.length <= 25)) {
    setError(username1, "length of usename should be inbetween 3 and 25");
    // return false;
  } else if (!username1validate(username1value)) {
    setError(username1, "usename should be only alphabate");
    // return false;
  } else {
    setSuccess(username1);
  }

  if (cid1value === "") {
    setError(cid1, "cid1 cannot be blank");
    // return false;
  } else if (cid1value.length !== 11) {
    setError(cid1, "length of cid1 number should be 11");
    // return false;
  } else if (!iscid1Valid(cid1value)) {
    setError(cid1, "cid1 number is not valid");
    // return false;
  } else {
    setSuccess(cid1);
  }

  if (contact1value === "") {
    setError(contact1, "contact1 number cannot be blank");
    // return false;
  }else if(contact1value.length !==8){
    setError(contact1, "phone number should be of 8 digit")
    // return false;
  } else if (!contact1validate(contact1value)) {
    setError(
      contact1,
      "contact1 number should start with 17 or 77"
    );
    // return false;
  }else{
    setSuccess(contact1)
  }

  if (email1value === "") {
    setError(email1, "email1 cannot be blank");
    // return false;
  } else if (!isemail1Valid(email1value)) {
    setError(email1, "email1 is not in proper formate");
    // return false;
  } else {
    setSuccess(email1);
  }

  if (passwordvalue === "") {
    setError(password1, "password cannot be blank");
    // return false;
  } else if (passwordvalue.length <= 8) {
    setError(password1, "it should be atleast 8 character");
    // return false;
  } else if (!isPasswordSecure(passwordvalue)) {
    setError(
      password1,
      "password should be minimum of 8 character,\nshould contain a capital letter and small letter, \natleast a number and a special character "
    );
    // return false;
  }
  else{
    setSuccess(password1)
  }

  if (password2value === "") {
    setError(password2_1, "confirm password cannot be empty");
    // return false;
  } else if (password2value !== passwordvalue) {
    setError(password2_1, "confirm password and password should be same");
    // return false;
  } else {
    setSuccess(password2_1);
  }

  // return true;
};
