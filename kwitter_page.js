var firebaseConfig = {
    apiKey: "AIzaSyBIft-J_5qqTT3Wb9yJPrZhJqndSc6GWQA",
    authDomain: "kwitter-f8703.firebaseapp.com",
    databaseURL: "https://kwitter-f8703-default-rtdb.firebaseio.com",
    projectId: "kwitter-f8703",
    storageBucket: "kwitter-f8703.appspot.com",
    messagingSenderId: "667948512856",
    appId: "1:667948512856:web:5d3cc3d0cc6dcbe57a3c2d"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name")


function send(){
    msg=document.getElementById("msg").value;
    firebase.database().ref(room_name).push({
        name:user_name,
        message:msg,
        like:0
    })
}
function logout(){
    localStorage.removeItem("user_name")
    localStorage.removeItem("room_name")
    window.location="index.html"
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
    firebase_message_id = childKey;
    message_data = childData;
//Start code
    console.log(firebase_message_id);
      console.log(message_data);
    name=message_data['name'];
    message=message_data['message'];
    like=message_data['like'];
    message_tag="<h4 class='message_h4'>"+message+"</h4>"
    name_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>"
    like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"
    span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>like: "+like+"</span></button><hr>"
   row = name_tag + message_tag +like_button + span_with_tag;       
   document.getElementById("output").innerHTML += row;
//End code
 } });  }); }
getData();

function updateLike(message_id){
    button_id=message_id
    likes=document.getElementById(button_id).value;
    updated_like=Number(likes)+1
    firebase.database().ref(room_name).child(message_id).update({
        like:updated_like
    });
}
