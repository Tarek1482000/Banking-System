let username = document.getElementById("username");
let password = document.getElementById("password");
let password2 = document.getElementById("password2");
let SignUpBt = document.getElementById("SignUpBt");
let UserTransaction = document.getElementById("UserTransaction");
let Login = document.getElementById("Login");
let Logout = document.getElementById("Logout");
let SignIn = document.getElementById("SignIn");
let BalanceBox = document.getElementById("BalanceBox");
let money = document.getElementById("money");

let DoTransfer = document.getElementById("DoTransfer");
let transferTo = document.getElementById("transferTo");
let amount = document.getElementById("amount");
let password_T = document.getElementById("password_T");

let Trasfare_Info = document.getElementById("Trasfare_Info");

let tbody = document.getElementById("tbody");
let viewww = document.getElementById("viewww");
let DeleteHistory = document.getElementById("DeleteHistory");
let Transfere_view = document.getElementById("Transfere_view");
let Transfere_Hide = document.getElementById("Transfere_Hide");
let ErrorFound = 1,
  NoErrorFound = 0,
  UserFound = 1,
  UserNotFound = 0,
  UserOnly = 2,
  PassOnly = 3;

class User {
  constructor(username, password, UserBalance, Historytable) {
    this.username_c = username;
    this.password_c = password;
    this.UserBalance_c = UserBalance;
    this.Historytable_c = Historytable;
  }
}

let DataBase = [];
DataBase[0] = new User("tarek", "tarek", 10000, "");
DataBase[1] = new User("ahmed", "ahmed", 10000, "");
let User_Arr = [];

// localStorage.clear();  
if (
  localStorage.getItem("DataBaseS") !== undefined &&
  localStorage.getItem("DataBaseS") !== null
) {
  // Retrieve and parse the data
  DataBase = JSON.parse(localStorage.getItem("DataBaseS"));
} else {
  // If no data exists, initialize localStorage with an empty array
  localStorage.setItem("DataBaseS", JSON.stringify(DataBase));
}

if (localStorage.logedin === "yes") {
  User_Found();
} else {
  LogoutFunc();
}

function LoginStart() {
  let error = validate_Data("Login"),
    user_status = UserNotFound;
  if (error === NoErrorFound) {
    user_status = Check_User(username.value, password.value);
    localStorage.logedin = "yes";

    if (user_status === UserFound) {
      localStorage.usernamelogin = username.value;
      User_Found();
    } else if (user_status === UserOnly) {
      User_Only();
    } else if (user_status === PassOnly) {
      Pass_Only();
    } else if (user_status === UserNotFound) {
      User_Not_Found();
    }
    for (let i = 0; i < DataBase.length; i++) {
      console.log(DataBase[i]);
    }
  }
}

function User_Found() {
  let user_f_5 = "",
    user_Balancee = 0;
  if (username) username.placeholder = "Username";
  if (password) password.placeholder = "Password";
  for (
    let i = 0;
    i < 20 &&
    localStorage.usernamelogin[i] !== undefined &&
    localStorage.usernamelogin[i] !== null;
    i++
  ) {
    user_f_5 += localStorage.usernamelogin[i];
  }
  user_Balancee = User_Get_balance(localStorage.usernamelogin);
  User_login(user_f_5, user_Balancee);
}

function User_Get_balance(user_n) {
  let ba;
  for (let i = 0; i < DataBase.length; i++) {
    if (user_n === DataBase[i].username_c) {
      ba = DataBase[i].UserBalance_c;
      return ba;
    }
  }
}

function User_Get_index(user_n) {
  for (let i = 0; i < DataBase.length; i++) {
    if (user_n === DataBase[i].username_c) {
      return i;
    }
  }
  return null;
}

function Userchange_balance(user_na, add_or_sub, value) {
  for (let i = 0; i < DataBase.length; i++) {
    if (user_na === DataBase[i].username_c) {
      if (add_or_sub === "add") {
        DataBase[i].UserBalance_c += +value;
      } else if (add_or_sub === "sub") {
        DataBase[i].UserBalance_c = DataBase[i].UserBalance_c - +value;
      }
    }
  }
  localStorage.DataBaseS = JSON.stringify(DataBase);
}

function User_Only() {
  LogoutFunc();
  password.style.backgroundColor = "rgb(199, 183, 183)";
  password.value = "";
  password.placeholder = "Wrong password!!";
  username.placeholder = "Username";
}
function Pass_Only() {
  LogoutFunc();
  username.style.backgroundColor = "rgb(199, 183, 183)";
  username.value = "";
  username.placeholder = "Wrong username!!";
  password.placeholder = "Password";
}
function User_Not_Found() {
  LogoutFunc();
  username.style.backgroundColor = "rgb(199, 183, 183)";
  password.style.backgroundColor = "rgb(199, 183, 183)";
  username.value = "";
  password.value = "";
  username.placeholder = "Wrong username!!";
  password.placeholder = "Wrong password!!";
}

function User_login(user_nam, user_balance) {
  if (SignIn) SignIn.style.display = "none";
  if (Logout) Logout.style.display = "block";
  if (BalanceBox) BalanceBox.style.display = "block";

  if (Trasfare_Info) Trasfare_Info.style.display = "block";
  if (DoTransfer) DoTransfer.style.display = "block";
  if (username) username.value = "";
  if (password) password.value = "";

  if (Login) {
    Login.innerHTML = user_nam;
    Login.style.background = "rgb(116, 215, 235)";
    Login.style.color = "rgb(20, 71, 75)";
  }

  if (money) money.innerHTML = formatBalance(user_balance);

  if (tbody) {
    tbody.innerHTML =
      DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c;

    if (tbody.innerHTML !== "") {
      Transfere_view.style.display = "block";
    }
  }
}

function LogoutFunc() {
  if (Login) {
    Login.innerHTML = "Login";
    Login.style.background = "white";
    Login.style.background = "";
  }
  if (localStorage.logedin) localStorage.logedin = "No";
  if (SignIn) SignIn.style.display = "block";
  if (BalanceBox) BalanceBox.style.display = "none";
  if (Logout) Logout.style.display = "none";
  if (Trasfare_Info) Trasfare_Info.style.display = "none";
  if (DoTransfer) DoTransfer.style.display = "none";
}

function SignupStart() {
  let error = validate_Data("SignUp");
  if (error === NoErrorFound) {
    SaveUser(username.value, password.value, 10000, "");
    redirectToLink("login.html");
  }
}

function redirectToLink(link) {
  window.location.href = link;
}

function validate_Data(info) {
  let error = NoErrorFound;
  if (username.value === "") {
    username.placeholder = "username !!";
    username.style.backgroundColor = "wheat";
    error = ErrorFound;
  } else {
    if (info === "SignUp") {
      for (let i = 0; i < DataBase.length; i++) {
        if (username.value === DataBase[0].username_c) {
          username.value = "";
          username.placeholder = "username already exist !!";
          username.style.backgroundColor = "rgb(199, 183, 183)";
          error = ErrorFound;
        }
      }
    }
    if (error === NoErrorFound) {
      username.style.backgroundColor = "white";
    }
  }

  if (password.value === "") {
    password.placeholder = "password !!";
    password.style.backgroundColor = "wheat";
    error = ErrorFound;
  } else {
    password.style.backgroundColor = "white";
  }
  if (info === "SignUp") {
    if (password2.value === "") {
      password2.placeholder = "confirm password !!";
      password2.style.backgroundColor = "wheat";
      error = ErrorFound;
    } else {
      if (password.value !== password2.value) {
        password2.value = "";
        password2.style.backgroundColor = "rgb(199, 183, 183)";
        password2.placeholder = " Wrong Confirmation !!";
        error = ErrorFound;
      } else {
        password2.style.backgroundColor = "white";
      }
    }
  }
  return error;
}

function SaveUser(username, pass, balance, history) {
  let user = new User(username, pass, balance, history);
  // Ensure that the DataBase array is initialized
  if (!Array.isArray(DataBase)) {
    DataBase = [];
  }

  DataBase.push(user);
  localStorage.DataBaseS = JSON.stringify(DataBase);
}

function Check_User(username, password) {
  let userf = 0,
    passf = 0,
    found = 1;
  for (let i = 0; i < DataBase.length; i++) {
    if (DataBase[i].username_c === username) {
      userf = 1;
    }

    if (DataBase[i].password_c === password) {
      passf = 1;
    }
  }
  if (userf === found && passf === found) {
    return UserFound;
  } else if (userf === found) {
    return UserOnly;
  } else if (passf === found) {
    return PassOnly;
  }
  return UserNotFound;
}

function formatBalance(Balance) {
  return Balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function performTransfer() {
  if (check_transfere_inputs() === NoErrorFound) {
    Userchange_balance(transferTo.value, "add", amount.value);
    Userchange_balance(localStorage.usernamelogin, "sub", amount.value);

    DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c += `{  
    <tr>
    <td>${localStorage.usernamelogin}</td>
    <td>${transferTo.value}</td> 
     <td>--------</td>
    <td  style="color: red;">-${amount.value}</td>
  </tr>}`;

    tbody.innerHTML =
      DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c;

    DataBase[User_Get_index(transferTo.value)].Historytable_c += `{  
    <tr>
    <td>${transferTo.value}</td>
    <td>--------</td>
    <td>${localStorage.usernamelogin}</td>
    <td  style="color: rgb(82, 232, 82);"> +${amount.value}</td>
  </tr>}`;

    localStorage.DataBaseS = JSON.stringify(DataBase);

    transferTo.value = "";
    amount.value = "";
    password_T.value = "";

    for (let i = 0; i < DataBase.length; i++) {
      console.log(DataBase[i]);
    }

    prompt("Transaction Done Successfully😀");

    Transfere_view.style.display = "block";
  }
  if (
    DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c !== ""
  ) {
    Transfere_view.style.display = "block";
  } else {
    Transfere_view.style.display = "none";
  }
}

function check_transfere_inputs() {
  let error = NoErrorFound,
    user_nf = 0,
    wrongPass = 0;
  if (transferTo.value === "") {
    transferTo.placeholder = "username !!";
    transferTo.style.backgroundColor = "wheat";
    error = ErrorFound;
  } else {
    transferTo.style.backgroundColor = "white";

    for (let i = 0; i < DataBase.length; i++) {
      if (DataBase[i].username_c === transferTo.value) {
        transferTo.placeholder = "Enter username";
        user_nf = 1;
      }
    }
  }
  if (user_nf === 0 && transferTo.value !== "") {
    error = ErrorFound;
    transferTo.style.backgroundColor = "rgb(199, 183, 183)";
    transferTo.value = "";
    transferTo.placeholder = "user not found !!";
  }
  if (amount.value === "" || amount.value < 0) {
    amount.value = "";
    amount.placeholder = "amount !!";
    amount.style.backgroundColor = "wheat";
    error = ErrorFound;
  } else {
    amount.style.backgroundColor = "white";
  }

  if (transferTo.value === localStorage.usernamelogin) {
    transferTo.value = "";
    transferTo.placeholder = "Can't transfere for yourself !!";
    transferTo.style.backgroundColor = "rgb(199, 183, 183)";
    error = ErrorFound;
  } else if (error === NoErrorFound) {
    transferTo.style.backgroundColor = "white";
    transferTo.placeholder = "Enter username";
  }

  if (password_T.value === "") {
    password_T.value = "";
    password_T.placeholder = "Password !!";
    password_T.style.backgroundColor = "wheat";
    error = ErrorFound;
  } else {
    for (let i = 0; i < DataBase.length; i++) {
      if (DataBase[i].username_c === localStorage.usernamelogin) {
        if (DataBase[i].password_c === password_T.value) {
          wrongPass = 1;
        }
      }
    }
    if (wrongPass === 1) {
      password_T.style.backgroundColor = "white";
      password_T.placeholder = "Your Password";
    } else {
      error = ErrorFound;
      password_T.value = "";
      password_T.style.backgroundColor = "rgb(199, 183, 183)";
      password_T.placeholder = "Wrong Password !!";
    }
  }

  if (amount.value > User_Get_balance(localStorage.usernamelogin)) {
    amount.style.backgroundColor = "rgb(199, 183, 183)";
    amount.value = "";
    amount.placeholder = "Your balance is not enough !!";
    error = ErrorFound;
  } else {
    amount.placeholder = "Enter amount";
    amount.style.backgroundColor = "white";
  }
  return error;
}

function viewHistory() {
  viewww.style.display = "block";
  DeleteHistory.style.display = "block";
  Transfere_view.style.display = "none";
  Transfere_Hide.style.display = "block";
}

function HideHistory() {
  viewww.style.display = "none";
  DeleteHistory.style.display = "none";
  Transfere_view.style.display = "block";
  Transfere_Hide.style.display = "none";
}

function DeleteHistoryy() {
  DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c = "";

  localStorage.DataBaseS = JSON.stringify(DataBase);

  if (tbody)
    tbody.innerHTML =
      DataBase[User_Get_index(localStorage.usernamelogin)].Historytable_c;

  Transfere_view.style.display = "none";

  redirectToLink("UserTransaction.html");
}
