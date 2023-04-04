function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/login");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Login bem-sucedido");
    } else {
      alert("Falha no login");
    }
  };
  xhr.send(JSON.stringify({ email: email, password: password }));
}

function cadastrar() {
  const form = document.getElementById("form-cadastro");
  const formData = new FormData(form);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "/cadastrar");
  xhr.onload = function () {
    if (xhr.status === 200) {
      alert("Cadastro bem-sucedido");
    } else {
      alert("Falha no cadastro");
    }
  };
  xhr.send(formData);
}

function exportar() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/exportar");
  xhr.responseType = "blob";
  xhr.onload = function () {
    const blob = new Blob([xhr.response], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "clientes.csv";
    link.click();
  };
  xhr.send();
}