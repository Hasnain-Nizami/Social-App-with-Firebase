var log = document.getElementById("log");
var modal = document.getElementsByClassName("modal");
var modalbox = document.getElementsByClassName("modalBoxWraper");
var postmessage1 = document.getElementById("postMessage");
var file = document.getElementById("file");
var postBox = document.querySelector(".postBox");
let pendingImg = document.querySelector(".pendingImg");
const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];

/////////////////////////////////////////////////////////

userPosts.forEach((ele) => {
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "post-box1");
  divElement.innerHTML = ` <div class="posting">
    <div class="pics"><img src="./WhatsApp Image 2023-04-29 at 20.12.20.jpg" alt" alt=""></div>
    <div class="felxy2">
        <p>Muhammad Hasnain</p>
        <span>9h..</span>
    </div>
</div>
<span>${ele.userTxt}</span>
<div class="postImg"><img src="${ele.userImg}" alt=""></div>
<div class="line"></div>
<div class="likeBox">
    <div class="like-flex">
        <i class="fa-regular fa-thumbs-up"></i>
        <p>Like</p>
    </div>
    <div class="like-flex">
        <i class="fa-regular fa-comment"></i>
        <p>Comment</p>
    </div>
    <div class="like-flex">
        <i class="fa-solid fa-share"></i>
        <p>Share</p>
    </div>
</div>
<div class="line"></div>`;
postBox.append(divElement)
})
///////////////////////////////////////////////////////////
function foo() {
  modal[0].classList.toggle("hide");
}
function logout() {
  localStorage.removeItem("isLoggedInUser");
  window.location.href = "index.html";
}
log.addEventListener("click", foo);
function modals(value) {
  if ("a" == value) {
    modalbox[0].classList.remove("hide");
    document.querySelector("html").style.overflowY = "hidden"
  } else if ("b" == value) {
    modalbox[0].classList.add("hide");
    document.querySelector("html").style.overflowY = "auto"
  } else {
    value.parentNode.style.display = "none";
    pendingImg.firstElementChild.src = ""
  }
}



function post() {

  //////////////////////////make crud operation/////////////////
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "post-box1");
  divElement.innerHTML = ` <div class="posting">
    <div class="pics"><img src="" alt=""></div>
    <div class="felxy2">
        <p>Muhammad Hasnain</p>
        <span>9h..</span>
    </div>
</div>
<span>${postmessage1.value}</span>
<div class="postImg"><img src="${pendingImg.firstElementChild.src}" alt=""></div>
<div class="line"></div>
<div class="likeBox">
    <div class="like-flex">
        <i class="fa-regular fa-thumbs-up"></i>
        <p>Like</p>
    </div>
    <div class="like-flex">
        <i class="fa-regular fa-comment"></i>
        <p>Comment</p>
    </div>
    <div class="like-flex">
        <i class="fa-solid fa-share"></i>
        <p>Share</p>
    </div>
</div>
<div class="line"></div>`;

 
  
  postBox.prepend(divElement)

  const postObj = {
   userTxt : postmessage1.value,
   userImg : pendingImg.firstElementChild.src
  }
  userPosts.unshift(postObj)
  localStorage.setItem('userPosts', JSON.stringify(userPosts))
  modals("b")
}


function postImage() {
  pendingImg.firstElementChild.src = URL.createObjectURL(file.files[0]);
  pendingImg.style.display = "block";
}
