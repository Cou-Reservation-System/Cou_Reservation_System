const reserveForm = document.getElementById("reserveForm");

function postItemToServer(data) {
  fetch("... 어딘가 데이터를 보낼 곳의 url을 넣어줄 것!", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

function addItemHandle(e) {
  e.preventDefault();
  // const name = addItemForm.querySelector("#name").value;
  // const password = addItemForm.querySelector("#password").value;
  // const carNumber = addItemForm.querySelector("#carNumber").value;
  // const tel = addItemForm.querySelector("#tel").value;
  // const pallete = addItemForm.querySelector("#pallete").value;
  // const carWeight = addItemForm.querySelector("#carWeight").value;
  // const date = addItemForm.querySelector("#date").value;

  const formData = new FormData(reserveForm);
  const data = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(data));
  // postItemToServer(data);
}

reserveForm.addEventListener("submit", addItemHandle);
