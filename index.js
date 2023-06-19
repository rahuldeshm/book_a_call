// collecting data from localstorage// remaining function??
function error() {
  var li = document.createElement("p");
  li.textContent = "Error: Please Fill All the field";
  div.appendChild(li);
  setTimeout(() => {
    div.removeChild(li);
  }, 3000);
}
function submitform(event) {
  event.preventDefault();
  if (email.value == "" || username.value == "" || phone == "") {
    error();
  } else {
    var myObj = {
      email: email.value,
      username: username.value,
      time: time.value,
      phone: phone.value,
    };
    // localStorage.setItem(email.value,JSON.stringify(myObj));
    axios
      .post("http://localhost:3000/bookcall/appointments", myObj)
      .then((response) => {
        console.log(response);
        const ebtn = document.createElement("button");
        ebtn.className = "ebtn";
        ebtn.innerText = "edit";

        const dbtn = document.createElement("button");
        dbtn.className = "dbtn";
        dbtn.innerText = "delete";

        const ul = document.createElement("div");
        const items = document.getElementById("items");
        const bd = items.parentElement;
        ul.innerHTML =
          "email : " +
          response.data.email +
          "<br>" +
          "Name: " +
          response.data.username +
          "<br>" +
          "Time for call: " +
          response.data.time +
          "<br>" +
          "Phone : " +
          response.data.phone +
          "<br>";
        ul.appendChild(ebtn);
        ul.appendChild(dbtn);
        ul.className = "items";
        bd.appendChild(ul);
        dbtn.onclick = () => {
          // localStorage.removeItem(myObj.email)
          bd.removeChild(ul);
          deletefromserver(response.data.id);
        };
        ebtn.onclick = () => {
          email.value = myObj.email;
          username.value = myObj.username;
          time.value = myObj.time;
          phone.value = myObj.phone;
          deletefromserver(response.data.id);
          bd.removeChild(ul);
          // patchinserver(response.data._id)
        };
        email.value = "";
        username.value = "";
        time.value = "";
        phone.value = "";
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

var div = document.getElementById("err");
var form = document.getElementById("my-form");
var btn = document.getElementById("button");
var email = document.getElementById("memail");
var username = document.getElementById("name");
var time = document.getElementById("time");
var phone = document.getElementById("phone");
// console.log(btn)
btn.addEventListener("click", submitform);

//COLLECTING DATA FROM LOCALSTORAGE//
var data;
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/bookcall/appointments")
    .then((response) => {
      // data=response;
      console.log(response.data);

      load(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
});
function load(data) {
  // console.log(data.length)
  for (var i = 0; i < data.length; i++) {
    // var key = localStorage.key(i);
    // var valu = JSON.parse(localStorage.getItem(key));
    let dat = data[i];
    // console.log("Key:", key, "Value:", valu);
    // console.log(valu.email)
    const ebtn = document.createElement("button");
    ebtn.className = "ebtn";
    ebtn.innerText = "edit";

    const dbtn = document.createElement("button");
    dbtn.className = "dbtn";
    dbtn.innerText = "delete";

    const ul = document.createElement("div");
    const items = document.getElementById("items");
    const bd = items.parentElement;

    ul.innerHTML =
      "email : " +
      dat.email +
      "<br>" +
      "Name: " +
      dat.username +
      "<br>" +
      "Time for call: " +
      dat.time +
      "<br>" +
      "Phone : " +
      dat.phone +
      "<br>";
    ul.appendChild(ebtn);
    ul.appendChild(dbtn);
    ul.className = "items";
    bd.appendChild(ul);
    dbtn.onclick = () => {
      // localStorage.removeItem(data.email)
      bd.removeChild(ul);
      // console.log(valu._id)

      deletefromserver(dat.id);
    };
    //adding functionality to editbutton
    ebtn.onclick = () => {
      email.value = dat.email;
      username.value = dat.username;
      time.value = dat.time;
      phone.value = dat.phone;
      deletefromserver(dat.id);
      bd.removeChild(ul);
      // patchinserver(valu._id)
    };
  }
}

function deletefromserver(id) {
  let lin = `http://localhost:3000/bookcall/appointments/${id}`;
  axios
    .delete(lin)
    .then((response) => {})
    .catch((err) => {
      console.log(err);
    });
}
// function patchinserver(id){
//     let lin=`https://crudcrud.com/api/aabb8976e96b40f793ac00423b6adf9e/appointdata/${id}`
//     axios.put(lin)
//         .then((response)=>{
//             console.log(response)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// }
