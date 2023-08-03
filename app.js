import {auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,collection, addDoc,db,doc,setDoc} from "./firebaseConfig.js";
var date = document.querySelector(".date");
var month = document.querySelector(".month");
var year = document.querySelector(".year");
var radio = document.querySelectorAll(".radio");
var currentDate = new Date();
var signUp = document.getElementById("signup");
var loginbtn = document.querySelector(".login-btn")


////////////////////Function For Create Account/////////////////////////////
signUp.addEventListener("click", signup);
function signup() {
  var firstName = document.getElementById("firstname");
  var surName = document.getElementById("surname");
  var createEmail = document.getElementById("createemail");
  var createPassword = document.getElementById("password");
  const closeSignUp = document.getElementById("closeSignUp")

  if (
    !firstName.value ||
    !surName.value ||
    !createEmail.value ||
    !createPassword.value ||
    !date.value ||
    !month.value ||
    !year.value
  ) {
    alert("Please fill all input feilds");
    return;
  }

    let userdata = {
    firstName: firstName.value,
    lastName: surName.value,
    createEmail: createEmail.value,
    createPassword: createPassword.value,
    profileImg: ''
  };


 createUserWithEmailAndPassword( auth,userdata.createEmail, userdata.createPassword )
      .then((userCredential) => {
          const user = userCredential.user.uid;

          const cityRef = doc(db, 'users', user);
         setDoc(cityRef, userdata);
  closeSignUp.click()

          
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("masla hai", error.message);
    });

  firstName.value = "";
  surName.value = "";
  createEmail.value = "";
  createPassword.value = "";
  date.value = currentDate.getDate();
  year.value = currentDate.getFullYear();
  
}

/////////////////////////Function For Login/////////////////////

loginbtn.addEventListener('click',login)
let flag1 = true; 
function login() {
    var userEmail = document.getElementById("email");
    var userPassword = document.getElementById("password1");
    if(userEmail.value == "" || userPassword.value == ""){
        alert("fill all input field")
        return
    }
    
    signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
    .then( async (userCredential) => {
        flag1 = false
        window.location.href = "./page.html"
        const user = userCredential.user;
        eror()
        console.log("chal gya");
        
    })
    .catch((error) => {
        const errorMessage = error.message;
        eror()
        console.log("nhai chala" ,error.message,);
    });
    
    function eror(){
        if(flag1){
            userEmail.style.borderColor = "red";
            userPassword.style.borderColor = "red";
            return;
          }
    }
    
  userEmail.value = "";
  userPassword.value = "";

}

function blr(elem) {
  elem.style.borderColor = "rgb(221, 223, 226)";
}