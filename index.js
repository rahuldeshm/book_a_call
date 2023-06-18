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
  if (email.value == "" || nname.value == "" || phone == "") {
    error();
  } else {
    var myObj = {
      Email: email.value,
      nname: nname.value,
      tforcall: tforcall.value,
      phone: phone.value,
    };
    // localStorage.setItem(email.value,JSON.stringify(myObj));
    axios
      .post(
        "https://crudcrud.com/api/d9464c8bdff243cabd8c53bed521d529/appointdata",
        myObj
      )
      .then((response) => {
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
          "Email : " +
          response.data.Email +
          "<br>" +
          "Name: " +
          response.data.nname +
          "<br>" +
          "Time for call: " +
          response.data.tforcall +
          "<br>" +
          "Phone : " +
          response.data.phone +
          "<br>";
        ul.appendChild(ebtn);
        ul.appendChild(dbtn);
        ul.className = "items";
        bd.appendChild(ul);
        dbtn.onclick = () => {
          // localStorage.removeItem(myObj.Email)
          bd.removeChild(ul);
          deletefromserver(response.data._id);
        };
        ebtn.onclick = () => {
          email.value = myObj.Email;
          nname.value = myObj.nname;
          tforcall.value = myObj.tforcall;
          phone.value = myObj.phone;
          deletefromserver(response.data._id);
          bd.removeChild(ul);
          // patchinserver(response.data._id)
        };
      })
      .catch((err) => {
        console.log(err);
      });
    email.value = "";
    nname.value = "";
    tforcall.value = "";
    phone.value = "";
  }
}

var div = document.getElementById("err");
var form = document.getElementById("my-form");
var btn = document.getElementById("button");
var email = document.getElementById("memail");
var nname = document.getElementById("name");
var tforcall = document.getElementById("tforcall");
var phone = document.getElementById("phone");
// console.log(btn)
btn.addEventListener("click", submitform);

//COLLECTING DATA FROM LOCALSTORAGE//
var data;
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/d9464c8bdff243cabd8c53bed521d529/appointdata"
    )
    .then((response) => {
      // data=response;
      // console.log(data)

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
    // console.log(valu.Email)
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
      "Email : " +
      dat.Email +
      "<br>" +
      "Name: " +
      dat.nname +
      "<br>" +
      "Time for call: " +
      dat.tforcall +
      "<br>" +
      "Phone : " +
      dat.phone +
      "<br>";
    ul.appendChild(ebtn);
    ul.appendChild(dbtn);
    ul.className = "items";
    bd.appendChild(ul);
    dbtn.onclick = () => {
      // localStorage.removeItem(data.Email)
      bd.removeChild(ul);
      // console.log(valu._id)

      deletefromserver(dat._id);
    };
    //adding functionality to editbutton
    ebtn.onclick = () => {
      email.value = dat.Email;
      nname.value = dat.nname;
      tforcall.value = dat.tforcall;
      phone.value = dat.phone;
      deletefromserver(dat._id);
      bd.removeChild(ul);
      // patchinserver(valu._id)
    };
  }
}

function deletefromserver(id) {
  let lin = `https://crudcrud.com/api/d9464c8bdff243cabd8c53bed521d529/appointdata/${id}`;
  axios
    .delete(lin)
    .then((response) => {})
    .catch((err) => {
      console.log(err);
    });
}
// function patchinserver(id){
//     let lin=`https://crudcrud.com/api/d9464c8bdff243cabd8c53bed521d529/appointdata/${id}`
//     axios.put(lin)
//         .then((response)=>{
//             console.log(response)
//         })
//         .catch((err)=>{
//             console.log(err)
//         })
// }
