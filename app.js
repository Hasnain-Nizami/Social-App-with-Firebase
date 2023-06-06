var firstName = document.getElementById("firstname")
var surName = document.getElementById("surname")
var createEmail = document.getElementById("createemail")
var createPassword = document.getElementById("password")
var date = document.querySelector(".date")
var month = document.querySelector(".month")
var year = document.querySelector(".year")
var radio = document.querySelectorAll(".radio")
var userEmail = document.getElementById("email")
var userPassword = document.getElementById("password1")
var currentDate = new Date()



const user = JSON.parse(localStorage.getItem('user')) || []
/////////////////////////Function For Login/////////////////////
function login(){
    let flag1 = true
    let flag = true
    if(userEmail.value !== "" && userPassword.value !== ""){
        const userfound = user.forEach((elm)=>{
            if(elm.email == userEmail.value){
                flag1 = false
                if(elm.password == userPassword.value){
                    window.location.href="./page.html";
                    flag = false
                } 
            }
        })
           
    }else{
        alert("fill all input fields")
        return
    }
    if(flag1){
        
        userEmail.style.borderColor = "red"
        alert("Email was uncorrect")
        return

    }else if(flag){
        userPassword.style.borderColor = "red"
        alert("Password not match")
        return
    }
    
    userEmail.value = ""
    userPassword.value = ""
}

function blr(elem){
            elem.style.borderColor = "rgb(221, 223, 226)"

}
////////////////////Function For Create Account///////////////////////////// 
function signup(){
    
    let element ; 
    radio.forEach((elem)=>{
        if(elem.checked){
            element = elem
        }
    })

    if(!firstName.value || !surName.value || !createEmail.value || !createPassword.value || !date.value || !month.value || !year.value || !element){
        alert("Please fill all input feilds")
        return
    }else if(createPassword.value.length < 8){
        alert("Password must contain 8 character")
        return
    }
    const userDetails ={
        firstname:firstName.value,
        lastName:surName.value,
        email:createEmail.value,
        password:createPassword.value,
        date:new Date(`${year.value},${month.value},${date.value}`),
        gender:element.previousElementSibling.innerHTML
    };
    user.push(userDetails)
    localStorage.setItem('user',JSON.stringify(user))

    firstName.value = ""
    surName.value = "" 
    createEmail.value = ""
    createPassword.value = ""
    date.value = currentDate.getDate()
    year.value = currentDate.getFullYear()
    element.checked = false
}

