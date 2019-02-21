var images = JSON.parse(localStorage.getItem("images", images));
var count = 0;
function openPage(pageName,element,color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  document.getElementById(pageName).style.display = "block";
  element.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function openGalleryAdminPage(){
  window.location="gallery-admin.html"
}

function storeImage(){
  var images = {
    "imageDetails": [
              {
                  "src": "https://tinyurl.com/y968wz7h",
                  "name": "image1",
                  "information": "wallpaper",
                  "uploadedDate": "2019-01-25"
              },
              {
                "src": "https://tinyurl.com/y9g4vnth",
                "name": "image2",
                "information": "wallpaper",
                "uploadedDate": "2019-01-25"
              },
              {
                "src": "https://tinyurl.com/yaorovnm",
                "name": "image3",
                "information": "wallpaper",
                "uploadedDate": "2019-01-25"
              },
              {
                  "src": "https://tinyurl.com/ycrbd8dd",
                  "name": "image4",
                  "information": "wallpaper",
                  "uploadedDate": "2019-01-25"
              },
              {
                "src": "https://tinyurl.com/yalx8lod",
                "name": "image5",
                "information": "wallpaper",
                "uploadedDate": "2019-01-25"
              },
              {
                "src": "https://tinyurl.com/y9ooo33a",
                "name": "image6",
                "information": "wallpaper",
                "uploadedDate": "2019-01-25"
              },
              {
                  "src": "https://tinyurl.com/ydh7lt73",
                  "name": "image7",
                  "information": "wallpaper",
                  "uploadedDate": "2019-01-25"
              }
          ]
  }
  var imageString = JSON.stringify(images);
  localStorage.setItem("images",imageString);
}

function displayEditForm() {
  document.getElementById("imageEditForm").style.display = 'block';
  document.getElementById("imageRemoveForm").style.display = 'none';
  document.getElementById("imageForm").style.display = 'none';
}

function displayImageForm(){
  console.log("in displayImages");
  document.getElementById("imageForm").style.display = 'block';
  document.getElementById("imageRemoveForm").style.display= 'none';
  document.getElementById("imageEditForm").style.display = 'none';
}

function displayRemoveForm(){
  document.getElementById("imageForm").style.display = 'none';
  document.getElementById("imageRemoveForm").style.display = 'block';
  document.getElementById("imageEditForm").style.display = 'none';
}

function editImage(){
  console.log("in editImage");
  var src = document.getElementById("editSrc").value;
  var name = document.getElementById("editName").value;
  //var images = JSON.parse(localStorage.getItem("images",images));
  var information = document.getElementById("editInformation").value;
  var uploadedDate =  document.getElementById("editDate").value;
  if( src == "" && name == "" && information == "" || src == "" && information == "" && uploadedDate == "" || src == "" && name == "" && uploadedDate == "" || uploadedDate == "" && name == "" && information == "")
  alert("enter data in atleast two fields");
  for(i in images.imageDetails)
  {
    if(images.imageDetails[i].name == name)
    {
      images.imageDetails[i].src = src;
      var isEdited = true;
      if( information!= ""){
        images.imageDetails[i].information = information;
      }
      if( uploadedDate!= ""){
        images.imageDetails[i].uploadedDate = uploadedDate;
      }
   }
  }
  images = JSON.stringify(images);
  localStorage.setItem("images",images);
  if(isEdited)
  alert("Update successful");
}
function displayImages(){
  var galleryId = document.getElementById("newImage");
  if(count == 0){
    for(i in images.imageDetails){
      console.log("count == 0");
      galleryId.innerHTML+= '<img src="'+images.imageDetails[i].src+'" />'
    }
    count++;
  }
  else{
    console.log("doing nothiing");
  }
}

function addImage(){
 console.log("in addImage");
 document.getElementById("imageForm").style.display= 'block';
 //var images = JSON.parse(localStorage.getItem("images",images));
 var src = document.getElementById("newSrc").value;
 var name = document.getElementById("newName").value;
 var information = document.getElementById("newInformation").value;
 var uploadedDate = new Date();
 images['imageDetails'].push({"src":src,"name":name,"information":information,"uploadedDate":uploadedDate});
 images = JSON.stringify(images);
 localStorage.setItem("images",images);
 alert("Image added successfully");
}

function addImageToJSON(){
  var galleryId = document.getElementById("newImage");
  let length = images.imageDetails["length"];
  galleryId.innerHTML+= '<img src="'+images.imageDetails[length-1].src+'" />'
}

function removeImage(){
  var src = document.getElementById("removeSrc").value;
  var name = document.getElementById("removeName").value;
  for(i in images.imageDetails){
    if(images.imageDetails[i].src == src || images.imageDetails[i].name == name){
      console.log("found");
      delete images.imageDetails[i];
    }
  }
  images = images.stringify(images);
  localStorage.setItem("images", images);
  alert("image removed");
}

function validateImageForm(){
  var name = document.forms["imageAddForm"]["name"].value;
  if (name == "") {
    alert("Name field cannot be empty");
    return false;
  }
  var src = document.forms["imageAddForm"]["src"].value;
  if(src == "") {
    alert("URL cannot be empty");
    return false;
  }
  var currentDate = new Date().toJSON().slice(0,10);
  var uploadedDate = document.forms["imageAddForm"]["uploadedDate"].value;
  if(uploadedDate > currentDate){
    alert("upload date cannot be in future");
    return false;
  }
  addImage();
}

function openGalleryAdminPage(){
  window.location = "gallery-admin.html"
}

function openHomePage(){
  window.location="index.html"
}
