export default class Ticket {
  constructor({ id, name, description, status, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;
  }
  
  //Проверка на закрытый тикет
  isClosed() {
    this.status === true;
  }
}
