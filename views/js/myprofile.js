import { showAlert } from "./alert.js"
// window.alert("BADUR")
var obj = JSON.parse(document.cookie.substring(6))

var el = document.querySelector('.admin-nav')
// if (obj.role == 'admin') {
//   el.innerHTML =
//     '<h5 class="admin-nav__heading">Admin</h5><ul class="side-nav"><li><a href="#"><img src="/assets/img/icon.png" alt="icon"> Manage users</a></li><li><a href="#"><img src="/assets/img/icons.png" alt="icon"> Manage Doctors</a></li><li><a href="#"><img src="/assets/img/icons.png" alt="icon"> Manage E-Services</a></li></ul>';
// } else {
//   el.innerHTML =
//     '<h5 class="admin-nav__heading">User</h5><ul class="side-nav"><li><a href="#"><img src="/assets/img/icons.png" alt="icon"> Manage Medical Reminder</a></li><li><a href="#"><img src="/assets/img/icons.png" alt="icon"> Manage E-Services</a></li></ul>';
// }

var el1 = document.querySelector('.form.form-user-data');
el1.innerHTML =
  `<div class="form__group">
    <label class="form__label" for="name">Name</label>
    <input class="form__input" id="name" type="text" value="${obj.name.toUpperCase()}" required="required" name="name"/>
  </div>
  <div class="form__group ma-bt-md">
    <label class="form__label" for="email">Email address</label>
    <input class="form__input" id="email" type="email" value="${obj.email}" required="required" name="email"/>
  </div>`;


var el2 = document.querySelector('form.form-user-password');
el2.innerHTML = `
  <div class="form__group">
    <label class="form__label" for="password-current">Current password</label>
    <input class="form__input" id="password-current" type="password" placeholder="••••••••" required="required" minlength="8" />
  </div>
  <div class="form__group">
    <label class="form__label" for="password">New password</label>
    <input class="form__input" id="password" type="password" placeholder="••••••••" required="required" minlength="8" />
  </div>
  <div class="form__group ma-bt-lg">
    <label class="form__label" for="password-confirm">Confirm password</label>
    <input class="form__input" id="password-confirm" type="password" placeholder="••••••••" required="required" minlength="8" />
  </div>
  <div class="form__group right">
  <button class="btn btn--small btn--green btn--save-password" style="background-color: #4CAF50; color: white; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; border-radius: 4px; cursor: pointer; transition: background-color 0.3s;" onmouseover="this.style.backgroundColor='#45a049'" onmouseout="this.style.backgroundColor='#4CAF50'">Save password</button>
</div>

`;

// type is either 'password' or data
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? 'http://localhost:4001/api/v1/users/updateMyPassword'
        : 'http://localhost:4001/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data,
    });

    // Check for existence of res.data
    if (res.data && res.data.status === 'success') {
      showAlert('success', 'Data updated successfully!');
    }
  } catch (err) {
    let message =
      typeof err.response !== 'undefined'
        ? err.response.data.message
        : err.message;

    // Handle the case where err.response is undefined
    showAlert('error', message);
  }
};

const userDataForm = document.querySelector('.form.form-user-data');
userDataForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  var obj = JSON.parse(document.cookie.substring(6));

  const form = new FormData();
  form.append('name', document.getElementById('name').value);
  form.append('email', document.getElementById('email').value);
  form.append('photo', document.getElementById('photo').files[0]);
  form.append('userId', obj._id);

  console.log(form);
  await updateSettings(form, 'data');
});

const userPasswordForm = document.querySelector('form.form-user-password');
userPasswordForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelector('.btn--save-password').textContent = 'Updating...';

  const passwordCurrent = document.getElementById('password-current').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  await updateSettings(
    { passwordCurrent, password, passwordConfirm },
    'password'
  );

  document.querySelector('.btn--save-password').textContent = 'Save password';
  document.getElementById('password-current').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password-confirm').value = '';
});

