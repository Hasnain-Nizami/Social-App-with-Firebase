import {onAuthStateChanged,auth,doc,db,getDoc,getDownloadURL,uploadBytesResumable,ref,signOut,storage,updateDoc} from "./firebaseConfig.js";

let uid;
window.addEventListener("load",()=>{

  let username = document.getElementById("username")
  let profileimg = document.querySelectorAll('.profileimg')
  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
      const docRef = doc(db, "users", uid);
      let callBack = async () => {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data()
          console.log(userData);
          document.body.style.display = "block";
          username.innerHTML= `${userData.firstName} ${userData.lastName}`;
          if(userData.profileImg !== undefined){
            profileimg.forEach((ele)=>{
              ele.src = userData.profileImg
          })
          }else{
            profileimg.forEach((ele)=>{
              ele.src = "./download.jpeg"
          })
          }
         
          
        } else {
          console.log("No such document!");
        }
      };
      callBack();
    } else {
      window.location.href = "./index.html";
    }
  });

})


var log = document.getElementById("log");
var modal = document.querySelector(".customModal");

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
  let title = document.getElementById("title")
  let profileImgUpload = document.getElementById("profileImgUpload")
  profileImgUpload.addEventListener('click',foo)

function foo(ele){

  let profileimg = document.querySelectorAll('.profileimg')
  let file = title.files[0]
  let closeBtn = document.getElementById("closeBtn")
  if(!file){
    alert("select img")
    return
  }
  let id = uid 
  /** @type {any} */
  const metadata = {
    contentType: 'image/jpeg',
  };

// Create file metadata including the content type
const storageRef = ref(storage, 'profileimg/' + file.name);
// Upload the file and metadata
const uploadTask = uploadBytesResumable(storageRef, file, metadata);



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
        const washingtonRef = doc(db, "users", id);
        await updateDoc(washingtonRef, {
          profileImg: downloadURL
        });

        profileimg.forEach((ele)=>{
            ele.src = downloadURL
        })
        closeBtn.click()
      } catch (e) {
          // alert(e.message);
          console.log(e.message);
      }
  });
}
);

}