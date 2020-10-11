class Persona {
  constructor(
    id,
    ruolo,
    nome,
    cognome,
    nascita,
    carcerazione,
    scarcerazione,
    crimine,
    stato
  ) {
    this.id = id;
    this.ruolo = ruolo;
    this.password = "admin";
    this.fascicolo = new Fascicolo(
      nome,
      cognome,
      nascita,
      carcerazione,
      scarcerazione,
      crimine,
      stato
    );
  }
  login(pw) {
    return pw == this.password;
  }
}
