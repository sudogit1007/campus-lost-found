function registerUser(){

let user={
name:document.getElementById("name").value,
email:document.getElementById("email").value,
department:document.getElementById("department").value,
password:document.getElementById("password").value
};

localStorage.setItem("user",JSON.stringify(user));
alert("Login Successful");
window.location.href="index.html";
}

function postItem(){

let file=document.getElementById("image").files[0];

let reader=new FileReader();

reader.onload=function(){

let item={
name:document.getElementById("itemName").value,
description:document.getElementById("description").value,
location:document.getElementById("location").value,
category:document.getElementById("category").value,
status:document.getElementById("status").value,
image:reader.result
};

let items=
JSON.parse(localStorage.getItem("items")) || [];

items.push(item);

localStorage.setItem(
"items",
JSON.stringify(items)
);

alert("Item posted successfully");
window.location.href="browse.html";
};

if(file){
reader.readAsDataURL(file);
}
}

function displayItems(){

let items=
JSON.parse(localStorage.getItem("items")) || [];

let container=
document.getElementById("itemsContainer");

container.innerHTML="";

items.forEach(item=>{

container.innerHTML+=`
<div class="card">
<img src="${item.image}" class="item-image">
<h3>${item.name}</h3>
<p>${item.description}</p>
<p><strong>Location:</strong>
${item.location}</p>
<p><strong>Category:</strong>
${item.category}</p>
<span class="badge ${item.status.toLowerCase()}">
${item.status}
</span>

<br><br>
<a href="claim.html">
<button class="btn">Claim</button>
</a>
</div>
`;
});
}

function searchItems(){

let value=
document.getElementById("search")
.value.toLowerCase();

let cards=
document.querySelectorAll(".card");

cards.forEach(card=>{
card.style.display=
card.innerText.toLowerCase().includes(value)
? "block"
: "none";
});
}

function claimItem(){
alert("Claim request submitted");
window.location.href="browse.html";
}

function loadAdmin(){

let items=
JSON.parse(localStorage.getItem("items")) || [];

let admin=
document.getElementById("adminItems");

items.forEach((item,index)=>{
admin.innerHTML+=`
<div class="card">
<h3>${item.name}</h3>
<p>${item.status}</p>
<button class="btn"
onclick="deleteItem(${index})">
Delete
</button>
</div>
`;
});
}

function deleteItem(index){

let items=
JSON.parse(localStorage.getItem("items"));

items.splice(index,1);

localStorage.setItem(
"items",
JSON.stringify(items)
);

location.reload();
}