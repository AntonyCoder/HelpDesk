import Ticket from "../../Ticket";
import TicketForm from "../ticketForm/TicketForm";
import TicketView from "../ticketView/TicketView";
import './HelpDesk.css'

/**
 *  Основной класс приложения
 * */
export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('This is not HTML element!');
    }
    this.tickets = [];
    this.container = container;
    this.ticketService = ticketService;

    this.ticketForm = new TicketForm(this);

    this.onAddTicketBtn = this.onAddTicketBtn.bind(this);
  }

  //Инициализация приложения
  init() {
    this.renderApp();
    this.renderTicketList();
  }

  //Отрисовка приложения
  renderApp() {
    //Обертка для приложения
    const app = document.createElement('div');
    app.classList.add('container');

    //Кнопка 'добавить тикет'
    const addTicketBtn = document.createElement('a');
    addTicketBtn.classList.add('add-ticket-button');
    addTicketBtn.textContent = 'Добавить тикет';

    //Список тикетов
    const ticketsList = document.createElement('ul');
    ticketsList.classList.add('tickets-list');

    this.container.appendChild(app);
    app.append(addTicketBtn, ticketsList);

    addTicketBtn.addEventListener('click', this.onAddTicketBtn)
  }

  //Отрисовка всех тикетов 
  async renderTicketList() {
    const ticketsList = document.querySelector('.tickets-list');
    ticketsList.textContent = '';

    const dataFromServer = await this.ticketService.list();
    const tickets = dataFromServer.map(item => new Ticket(item));
    this.tickets = tickets

    const ticketView = new TicketView(this.tickets, this);
    tickets.forEach(item => {
      const ticket = ticketView.renderTicket(item.name, item.created, item.status, item.id);
      ticketsList.appendChild(ticket);
    })
  }


  //Обработчик события клика по кнопке Добавить тикет
  onAddTicketBtn() {
    if (document.querySelector('.form')) return;
    const form = this.ticketForm.renderForm();

    this.container.appendChild(form);
  }

}
