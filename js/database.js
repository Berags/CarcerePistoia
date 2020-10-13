var persone = [];
var isLogged = false;

function numeroDiGuardie() {
  persone = JSON.parse(localStorage.getItem("utenti"));
  let n = 0;
  try {
    persone.forEach((element) => {
      if (element.ruolo == "guardia") {
        n++;
      }
    });
  } catch (e) {
    console.log("Nessuna guardia");
  }
  document.getElementById("guardie").innerHTML = n;
}

function numeroDetenuti() {
  persone = JSON.parse(localStorage.getItem("utenti"));
  let n = 0;
  let deceduti = 0;
  let evasi = 0;
  let scarcerati = 0;
  try {
    persone.forEach((element) => {
      if (element.ruolo == "detenuto") {
        n++;
      }
      if (element.fascicolo.stato == "deceduto") {
        deceduti++;
      } else if (element.fascicolo.stato == "evaso") {
        evasi++;
      } else if (element.fascicolo.stato == "scarcerato") {
        scarcerati++;
      }
    });
  } catch (e) {
    console.log("Nessuna detenuto");
  }
  document.getElementById("detenuti").innerHTML = n;
  document.getElementById("detenutiDeceduti").innerHTML = deceduti;
  document.getElementById("detenutiEvasi").innerHTML = evasi;
  document.getElementById("detenutiScarcerati").innerHTML = scarcerati;
}

function creaDetenuto() {
  persone = JSON.parse(localStorage.getItem("utenti"));
  var nome = document.getElementById("Nome").value;
  var cognome = document.getElementById("Cognome").value;
  var nascita = document.getElementById("Nascita").value;
  var carcerazione = document.getElementById("Carcerazione").value;
  var scarcerazione = document.getElementById("Scarcerazione").value;
  var crimine = document.getElementById("Crimine").value;
  if (nome == "" || cognome == "") {
    alert("Inserire il nome o il cognome");
    return;
  }
  if (
    new Date(carcerazione) > new Date(scarcerazione) ||
    carcerazione == "" ||
    scarcerazione == ""
  ) {
    alert(
      "La data di carcerazione deve essere maggiore o uguale a quella di scarcerazione!"
    );
    return;
  }
  if (persone == null) {
    persone = [];
    var perso = new Persona(
      0,
      "detenuto",
      nome,
      cognome,
      nascita,
      carcerazione,
      scarcerazione,
      crimine,
      "detenuto"
    );
  } else {
    var perso = new Persona(
      persone.length,
      "detenuto",
      nome,
      cognome,
      nascita,
      carcerazione,
      scarcerazione,
      crimine,
      "detenuto"
    );
  }
  localStorage.setItem("creato", true);
  persone.push(perso);
  localStorage.removeItem("utenti");
  localStorage.setItem("utenti", JSON.stringify(persone));
  location.replace("index.html");
}

function creaGuardia() {
  persone = JSON.parse(localStorage.getItem("utenti"));
  var nome = document.getElementById("Nome").value;
  var cognome = document.getElementById("Cognome").value;
  var nascita = document.getElementById("Nascita").value;
  if (nome == "" || cognome == "") {
    alert("Inserire il nome o il cognome");
    return;
  }
  if (persone == null) {
    persone = [];
    var perso = new Persona(
      0,
      "guardia",
      nome,
      cognome,
      nascita,
      null,
      null,
      null,
      null
    );
  } else {
    var perso = new Persona(
      persone.length,
      "guardia",
      nome,
      cognome,
      nascita,
      null,
      null,
      null,
      null
    );
  }
  localStorage.setItem("creatoG", true);
  persone.push(perso);
  localStorage.removeItem("utenti");
  localStorage.setItem("utenti", JSON.stringify(persone));
  location.replace("index.html");
}

function modificaDetenuto() {
  var nome = document.getElementById("Nome").value;
  var cognome = document.getElementById("Cognome").value;
  var nascita = document.getElementById("Nascita").value;
  var carcerazione = document.getElementById("Carcerazione").value;
  var scarcerazione = document.getElementById("Scarcerazione").value;
  var crimine = document.getElementById("Crimine").value;
  var stato = document.getElementById("Stato").value;
  var select = document.getElementById("detenutiList");
  if (nome == "" || cognome == "") {
    alert("Inserire il nome o il cognome");
    return;
  }
  if (
    new Date(carcerazione) > new Date(scarcerazione) ||
    carcerazione == "" ||
    scarcerazione == ""
  ) {
    alert(
      "La data di carcerazione deve essere maggiore o uguale a quella di scarcerazione!"
    );
    return;
  }
  for (let i = 0; i < persone.length; i++) {
    if (persone[i].id == select.value) {
      persone[i].fascicolo.nome = nome;
      persone[i].fascicolo.cognome = cognome;
      persone[i].fascicolo.nascita = nascita;
      persone[i].fascicolo.carcerazione = carcerazione;
      persone[i].fascicolo.scarcerazione = scarcerazione;
      persone[i].fascicolo.crimine = crimine;
      persone[i].fascicolo.stato = stato;
      localStorage.removeItem("utenti");
      localStorage.setItem("utenti", JSON.stringify(persone));
      select.innerHTML =
        "<option value='defalut' selected>--- Seleziona detenuto ---</option>";
      creaSelect();
      select.value = persone[i].id;
      Command: toastr["success"](
        "Detenuto " + nome + " " + cognome + " modificato correttamente!",
        "Successo"
      );

      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      return;
    }
  }
  Command: toastr["error"]("E' stato riscontrato un errore!", "Errore");

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
}

function modificaDetenutoTabella(id) {
  localStorage.setItem("id", id);
  location.replace("index.html");
}

function modificaGuardia() {
  var nome = document.getElementById("NomeGuardia").value;
  var cognome = document.getElementById("CognomeGuardia").value;
  var nascita = document.getElementById("NascitaGuardia").value;
  var titolo = document.getElementById("titoloGuardia");
  var select = document.getElementById("guardieList");
  if (nome == "" || cognome == "") {
    alert("Inserire il nome o il cognome");
    return;
  }
  for (let i = 0; i < persone.length; i++) {
    if (persone[i].id == select.value) {
      titolo.innerHTML =
        "Guardia: " +
        persone[i].fascicolo.nome +
        " " +
        persone[i].fascicolo.cognome;
      persone[i].fascicolo.nome = nome;
      persone[i].fascicolo.cognome = cognome;
      persone[i].fascicolo.nascita = nascita;
      localStorage.removeItem("utenti");
      localStorage.setItem("utenti", JSON.stringify(persone));
      select.innerHTML =
        "<option value='defalut' selected>--- Seleziona guardia ---</option>";
      creaSelectGuardie();
      select.value = persone[i].id;
      Command: toastr["success"](
        "Guardia " + nome + " " + cognome + " modificata correttamente!",
        "Successo"
      );

      toastr.options = {
        closeButton: true,
        debug: false,
        newestOnTop: false,
        progressBar: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      return;
    }
  }
  Command: toastr["error"]("E' stato riscontrato un errore!", "Errore");

  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: true,
    positionClass: "toast-bottom-right",
    preventDuplicates: true,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "5000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
}

function eliminaDetenuto() {
  var select = document.getElementById("detenutiList");
  for (let i = 0; i < persone.length; i++) {
    if (persone[i].id == select.value) {
      persone.splice(i, 1);
      localStorage.removeItem("utenti");
      localStorage.setItem("utenti", JSON.stringify(persone));
      select.innerHTML =
        "<option value='defalut' selected>--- Seleziona detenuto ---</option>";
      creaSelect();
      localStorage.setItem("eliminato", true);
      location.reload();
      return;
    }
  }
  alert("Errore!");
}

function eliminaGuardia() {
  var select = document.getElementById("guardieList");
  for (let i = 0; i < persone.length; i++) {
    if (persone[i].id == select.value) {
      persone.splice(i, 1);
      localStorage.removeItem("utenti");
      localStorage.setItem("utenti", JSON.stringify(persone));
      select.innerHTML =
        "<option value='defalut' selected>--- Seleziona guardia ---</option>";
      creaSelectGuardie();
      localStorage.setItem("eliminatoG", true);
      location.reload();
      return;
    }
  }
  alert("Errore!");
}

function creaSelect() {
  var select = document.getElementById("detenutiList");
  persone = JSON.parse(localStorage.getItem("utenti"));
  try {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].ruolo == "detenuto") {
        var opt =
          persone[i].fascicolo.nome + " " + persone[i].fascicolo.cognome;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = persone[i].id;
        select.appendChild(el);
      }
    }
  } catch (e) {
    console.log("Nessun detenuto presente nel carcere");
  }
}

function creaSelectGuardie() {
  var select = document.getElementById("guardieList");
  persone = JSON.parse(localStorage.getItem("utenti"));
  try {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].ruolo == "guardia") {
        var opt =
          persone[i].fascicolo.nome + " " + persone[i].fascicolo.cognome;
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = persone[i].id;
        select.appendChild(el);
      }
    }
  } catch (ex) {
    console.log("Nessuna guardia presente nel carcere");
  }
}

function visualizzaDetenuto() {
  var select = document.getElementById("detenutiList");
  persone = JSON.parse(localStorage.getItem("utenti"));
  var nome = document.getElementById("Nome");
  var cognome = document.getElementById("Cognome");
  var nascita = document.getElementById("Nascita");
  var carcerazione = document.getElementById("Carcerazione");
  var scarcerazione = document.getElementById("Scarcerazione");
  var crimine = document.getElementById("Crimine");
  var stato = document.getElementById("Stato");
  var titolo = document.getElementById("titoloDetenuto");
  var select = document.getElementById("detenutiList");
  var id = localStorage.getItem("id");
  if (id !== null) {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].id == id && persone[i].ruolo == "detenuto") {
        if (titolo !== null) {
          titolo.innerHTML =
            "Detenuto: " +
            persone[i].fascicolo.nome +
            " " +
            persone[i].fascicolo.cognome;
        }
        nome.value = persone[i].fascicolo.nome;
        cognome.value = persone[i].fascicolo.cognome;
        nascita.value = persone[i].fascicolo.nascita;
        carcerazione.value = persone[i].fascicolo.carcerazione;
        scarcerazione.value = persone[i].fascicolo.scarcerazione;
        crimine.value = persone[i].fascicolo.crimine;
        stato.value = persone[i].fascicolo.stato;
        select.value = id;
        localStorage.removeItem("id");
        return;
      }
    }
  }
  try {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].id == select.value) {
        titolo.innerHTML =
          "Detenuto: " +
          persone[i].fascicolo.nome +
          " " +
          persone[i].fascicolo.cognome;
        nome.value = persone[i].fascicolo.nome;
        cognome.value = persone[i].fascicolo.cognome;
        nascita.value = persone[i].fascicolo.nascita;
        carcerazione.value = persone[i].fascicolo.carcerazione;
        scarcerazione.value = persone[i].fascicolo.scarcerazione;
        crimine.value = persone[i].fascicolo.crimine;
        stato.value = persone[i].fascicolo.stato;
        return;
      }
    }
    titolo.innerHTML = "";
  } catch (e) {
    console.log("Nessun detenuto selezionato");
  }
  nome.value = "";
  cognome.value = "";
  nascita.value = "";
  carcerazione.value = "";
  scarcerazione.value = "";
  crimine.value = "";
  stato.value = "";
}

function visualizzaGuardia() {
  var select = document.getElementById("guardieList");
  persone = JSON.parse(localStorage.getItem("utenti"));
  var nome = document.getElementById("NomeGuardia");
  var cognome = document.getElementById("CognomeGuardia");
  var nascita = document.getElementById("NascitaGuardia");
  var titolo = document.getElementById("titoloGuardia");
  var select = document.getElementById("guardieList");
  var id = localStorage.getItem("id");
  if (id !== null) {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].id == id && persone[i].ruolo == "guardia") {
        titolo.innerHTML =
          "Guardia: " +
          persone[i].fascicolo.nome +
          " " +
          persone[i].fascicolo.cognome;
        nome.value = persone[i].fascicolo.nome;
        cognome.value = persone[i].fascicolo.cognome;
        nascita.value = persone[i].fascicolo.nascita;
        select.value = id;
        localStorage.removeItem("id");
        return;
      }
    }
  }
  try {
    for (let i = 0; i < persone.length; i++) {
      if (persone[i].id == select.value) {
        titolo.innerHTML =
          "Guardia: " +
          persone[i].fascicolo.nome +
          " " +
          persone[i].fascicolo.cognome;
        nome.value = persone[i].fascicolo.nome;
        cognome.value = persone[i].fascicolo.cognome;
        nascita.value = persone[i].fascicolo.nascita;
        return;
      }
    }
  } catch (ex) {
    console.log("Nessuna guardia selezionata");
  }
  titolo.innerHTML = "";
  nome.value = "";
  cognome.value = "";
  nascita.value = "";
}

function news() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  for (let i = 0; i < JSON.parse(localStorage.getItem("utenti")).length; i++) {
    if (
      JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.scarcerazione ==
      date
    ) {
      document.getElementById("news").innerHTML =
        document.getElementById("news").innerHTML +
        "<br>- Il detenuto <strong class='text-uppercase'>" +
        JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.nome +
        " " +
        JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.cognome +
        "</strong> verrà scarcerato oggi.";
    }
    if (
      JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.nascita.slice(
        5
      ) == date.slice(5)
    ) {
      document.getElementById("news").innerHTML =
        document.getElementById("news").innerHTML +
        "<br>- Oggi è il compleanno di <strong class='text-uppercase'>" +
        JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.nome +
        " " +
        JSON.parse(localStorage.getItem("utenti"))[i].fascicolo.cognome +
        "</strong>!";
    }
  }
}

function controlloLogin() {
  var username = document.getElementById("inputUsername").value;
  var pw = document.getElementById("inputPassword").value;
  if (username === "admin") {
    if (pw === "admin") {
      window.localStorage.setItem("username", "admin");
      toastr["info"]("Benvenuto, admin!", "Benvenuto");

      toastr.options = {
        closeButton: false,
        debug: false,
        newestOnTop: false,
        progressBar: false,
        positionClass: "toast-bottom-right",
        preventDuplicates: true,
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut",
      };
      isLogged = true;
      return;
    }
  } else {
    Command: toastr["error"]("Username o Password errato/a!", "Errore");

    toastr.options = {
      closeButton: true,
      debug: true,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
}

function afterCreato() {
  var isCreato = localStorage.getItem("creato");
  if (isCreato == "true") {
    toastr["success"]("Detenuto creato correttamente!", "Successo");

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  localStorage.setItem("creato", false);
}

function afterCreatoGuardia() {
  var isCreato = localStorage.getItem("creatoG");
  if (isCreato == "true") {
    toastr["success"]("Guardia creata correttamente!", "Successo");

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-top-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  localStorage.setItem("creatoG", false);
}

function afterEliminato() {
  var isCreato = localStorage.getItem("eliminato");
  if (isCreato == "true") {
    Command: toastr["success"](
      "Detenuto eliminato correttamente!",
      "Eliminato"
    );

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  localStorage.setItem("eliminato", false);
}

function afterEliminatoGuardia() {
  var isCreato = localStorage.getItem("eliminatoG");
  if (isCreato == "true") {
    Command: toastr["success"]("Guardia eliminata correttamente!", "Eliminato");

    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: true,
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
  }
  localStorage.setItem("eliminatoG", false);
}

function login(luogo) {
  var session = localStorage.getItem("username");
  if (luogo == "index") {
    if (session !== null) {
      document.getElementById("benvenuto").innerHTML =
        "Benvenuto, " + session + "!";
    }
  } else if (luogo == "amministrazione") {
    if (session != "admin") {
      alert("Devi aver effettuato il login!");
      window.location.replace("../login/index.html");
    }
  }
}
