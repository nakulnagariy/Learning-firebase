// Project Console: https://console.firebase.google.com/project/project-90e65/overview
// Hosting URL: https://project-90e65.web.app
// firebase deploy
var DB_URL = "https://project-90e65.firebaseio.com/login.json";
var records = [];
function login() {
  var useremail = document.getElementById("email").value;
  var userpassword = document.getElementById("password").value;

  fetch(DB_URL, {
    method: "POST",
    body: JSON.stringify({ useremail, userpassword }),
    header: { "content-Type": "application/json" },
  }).then(function (res) {
    console.log("First response", res.json());
  });
}

function read() {
  fetch(DB_URL)
    .then(function (res) {
      return res.json();
    })
    .then(function (resposeData) {
      records = [];
      for (const key in resposeData) {
        records.push({
          id: key,
          useremail: resposeData[key].useremail,
          userpassword: resposeData[key].userpassword,
        });
      }
      disPlayRecords();
    });
}

function disPlayRecords() {
  const tableBody = document.querySelector("#tableBody");
  tableBody.innerHTML = "";

  for (var i = 0; i < records.length; i++) {
    tableBody.innerHTML += `<tr>
    <td>${i + 1}</td>
    <td><input class='form-control input' id='${records[i].id}mail' value='${
      records[i].useremail
    }' /></td>
    <td><input class='form-control input' id='${records[i].id}pass' value='${
      records[i].userpassword
    }' /></td>
    <td><button onclick="editRecord('${
      records[i].id
    }')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg></button>
    </tr>`;
  }
}

function editRecord(id) {
  var useremail = document.querySelector(`#${id}mail`).value;
  var userpassword = document.querySelector(`#${id}pass`).value;
  database.ref("login/" + id).set({
    useremail: useremail,
    userpassword: userpassword,
  });
}
