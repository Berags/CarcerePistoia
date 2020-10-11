$(document).ready(function () {
  $("#table_id").DataTable({
    order: [[3, "asc"]],
    data: JSON.parse(localStorage.getItem("utenti")),
    columns: [
      { data: "id" },
      { data: "fascicolo.nome" },
      { data: "fascicolo.cognome" },
      { data: "ruolo" },
      { data: "fascicolo.nascita" },
      { data: "fascicolo.carcerazione" },
      { data: "fascicolo.scarcerazione" },
      { data: "fascicolo.crimine" },
      { data: "fascicolo.stato" },
      {
        data: "id",
        render: function (data) {
          return `<div class="text-center">
                        <button onclick="modificaDetenutoTabella(${data})" class='btn btn-success text-white' style='cursor:pointer; width:100px;'>
                            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                            Modifica
                        </button>
                        </div>`;
        },
      },
    ],
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Italian.json",
      emptyTable: "Nessun detenuto trovato",
    },
    width: "100%",
  });
});
