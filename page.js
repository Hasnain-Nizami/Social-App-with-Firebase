import {
  auth,
  onAuthStateChanged,
  signOut,
  getDocs,
  collection,
  db,
  addDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  doc,
  getDoc,
} from "./firebaseConfig.js";
let activeUser = "";
let activeUserName = "";
var userName = document.querySelectorAll(".userName");
var postmessage1 = document.getElementById("postMessage");
var file = document.getElementById("file");
let onlineUserProfilePic ;

window.addEventListener("load", loadPosts);
async function loadPosts() {
  const querySnapshot = await getDocs(collection(db, "posts"));
  querySnapshot.forEach((doc) => {
    let userNames = doc.data().fullName;
    let userText = doc.data().text;
    let image = doc.data().postImageUrl
    let dp = doc.data().dp
    postFun(userNames, userText,image,dp);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    let profilePic = document.querySelectorAll(".profilePic")
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    let callBack = async () => {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data()
        document.body.style.display = "block";
        activeUserName = `${userData.firstName} ${userData.lastName}`;
        userName.forEach((ele) => {
          ele.innerHTML = `${activeUserName}`;
        });
        if(userData.profileImg !== undefined){
          profilePic.forEach((ele)=>{
            ele.src = userData.profileImg
        })
        onlineUserProfilePic = userData.profileImg
      }else{
        profilePic.forEach((ele)=>{
          ele.src = "./download.jpeg"
      })
      }
    
        postmessage1.placeholder = `What's on your mind ' ${userData.firstName}?`;
      } else {
        console.log("No such document!");
      }
    };
    callBack();

  } else {
    window.location.href = "./index.html";
  }
});

var log = document.getElementById("log");
var modal = document.querySelector(".modal");
var modalbox = document.querySelector(".modalBoxWraper");

var postBox = document.querySelector(".postBox");

/////////////////CHECK YOUR LOGIN OR NOT////////////////////////

log.addEventListener("click", logModal);
function logModal() {
  modal.classList.toggle("hide");
}

const Out = document.getElementById("logOut");
Out.addEventListener("click", logOut);
function logOut() {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      alert(error.message);
    });
}

const inputRobo = document.querySelector(".inputRobo");
inputRobo.addEventListener("click", modals);

const closeBtn = document.querySelectorAll(".closeBtn");
const overlay = document.querySelector(".overlay");

overlay.addEventListener("click", modals);
closeBtn.forEach((ele) => {
  ele.addEventListener("click", modals);
});

const post = document.querySelector(".post");
post.addEventListener("click", createPost);
let pendingImg = document.querySelector(".pendingImg");

async function createPost() {

  let pic = file.files[0]
 if(pic == undefined){
        try {
          const response = await addDoc(collection(db, "posts"), {
              fullName: `${activeUserName}`,
              text: `${postmessage1.value}`,
              dp:onlineUserProfilePic
          });
          postFun(activeUserName, postmessage1.value,onlineUserProfilePic);
      } catch (e) {
          alert(e.message);
      }
      return
 }
  
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };

// Create file metadata including the content type
const storageRef = ref(storage, 'images/' + pic.name);
// Upload the file and metadata
const uploadTask = uploadBytesResumable(storageRef, pic, metadata);



uploadTask.on('state_changed', 
(snapshot) => {
  // Observe state change events such as progress, pause, and resume
  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }
}, 
(error) => {
  alert(error.code)
}, 
() => {

  getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

      try {
          const response = await addDoc(collection(db, "posts"), {
              fullName: `${activeUserName}`,
              text: `${postmessage1.value}`,
              postImageUrl: downloadURL,
              dp:onlineUserProfilePic
          });
          postFun(activeUserName, postmessage1.value,downloadURL,onlineUserProfilePic);
      } catch (e) {
          alert(e.message);
      }
  });
}
);


 
}

async function postFun(name, text,image,dp) {
  //////////////////////////make crud operation/////////////////
 
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "post-box1");
    divElement.innerHTML = ` <div class="posting">
    <div class="pics"><img src="${dp || "./download.jpeg"}" alt=""></div>
    <div class="felxy2">
        <p>${name}</p>
        <span>9h..</span>
    </div>
</div>
<span>${text}</span>
  ${image ? `<div  class='postImg'><img src='${image}'></div>` : ""}
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
  

  postBox.prepend(divElement);
}


//////////////////////////////////////////////

///////////////////////////////////////////

file.addEventListener("change", postImage);
function postImage() {
  pendingImg.firstElementChild.src = URL.createObjectURL(file.files[0]);
  pendingImg.style.display = "block";
}

function modals(value) {
  const condiction = value.currentTarget;
  if (condiction.classList.contains("inputRobo")) {
    modalbox.classList.remove("hide");
    document.querySelector("html").style.overflowY = "hidden";
  } else if (
    condiction.classList.contains("closeBtn") &&
    condiction.classList.contains("closeImg")
  ) {
    condiction.parentNode.style.display = "none";
    pendingImg.firstElementChild.src = "";
    file.value = ""
  } else if (
    condiction.classList.contains("closeBtn") ||
    condiction.classList.contains("overlay")
  ) {
    modalbox.classList.add("hide");
    document.querySelector("html").style.overflowY = "auto";
  }
}
