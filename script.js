let submitBtn = document.querySelector("#submitBtn");

function setLocalStorage() {
  if (localStorage.getItem("userData")) {
    let showDiv = document.querySelector("#show");
    showDiv.innerHTML = "";
    let arr = JSON.parse(localStorage.getItem("userData"));
    arr.forEach((user, id) => {
      let newDiv = document.createElement("div");
      newDiv.setAttribute("class", "newData");
      let htmldata = `    <b>   Username :- <span>${user.name} </span>
                           <p style="text-align: right">
                           <button onClick = 'onDelete(${id})'>Delete</button></p>
                           <b>  Password :- <span>${user.password} </span>
                           <p style="text-align: right">
                           <button id ="btnEdit" onClick = 'onEdit(${id})'>Edit</button></p></b>
                          `;
      newDiv.insertAdjacentHTML("afterbegin", htmldata);
      showDiv.insertAdjacentElement("afterbegin", newDiv);
    });
  } else {
    let arr = [];
    let arrData = {
      name: "",
      password: "",
    };
    arr.push(arrData);
    localStorage.setItem("userData", JSON.stringify(arr));
  }
}

setTimeout(() => {
  setLocalStorage();
}, 2);

// crud operation add submit/add function
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let arr = JSON.parse(localStorage.getItem("userData"));
  let name = document.querySelector("#name").value;
  let password = document.querySelector("#password").value;

  if (name.length <= 0 && password.length <= 0) {
    alert(" Please, Enter Details ! ");
  } else if (name.length > 0 && password.length > 0) {
    let arrData = {
      name: name,
      password: password,
    };

    arr.push(arrData); // used parse as push
    localStorage.setItem("userData", JSON.stringify(arr));
    setLocalStorage(); // function call.
  } else {
    alert(" Please, Enter Details ! ");
  }
});

// delete function

function onDelete(id) {
  let arr = JSON.parse(localStorage.getItem("userData"));
  let deleteArr = [...arr];
  deleteArr.splice(id, 1);
  arr = [...deleteArr];
  localStorage.setItem("userData", JSON.stringify(arr));
  setLocalStorage();
}

// edit function

function onEdit(id) {
  let arr = JSON.parse(localStorage.getItem("userData"));
  let name = (document.querySelector("#name").value = arr[id].name);
  let password = (document.querySelector("#password").value = arr[id].password);

  submitBtn.setAttribute("disabled", true);

  let editBtn = document.createElement("button");
  let form = document.querySelector("#form");
  let btnEdit = document.querySelectorAll("#btnEdit");
  editBtn.innerHTML = "Update";

  btnEdit.forEach((elements) => {
    elements.setAttribute("disabled", true);
  });

  form.insertAdjacentElement("beforeend", editBtn);

  editBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let newname = document.querySelector("#name");
    let newpassword = document.querySelector("#password");
    arr.splice(id, 1, { name: newname.value, password: newpassword.value });
    localStorage.setItem("userData", JSON.stringify(arr));
    setLocalStorage();
    newname.value = "";
    newpassword.value = "";
    form.removeChild(form.lastElementChild);
    submitBtn.removeAttribute("disabled");
  });
}
