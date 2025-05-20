/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
import TicketService from '../../TicketService';
import { baseUrl } from '../../app';
import { UpdateModal } from '../UpdateModal/UpdateModal';
import './TicketView.css'

export default class TicketView {
  constructor(tickets, helpDeskInstance) {
    this.ticketService = new TicketService(baseUrl);
    this.tickets = tickets;
    this.helpDesk = helpDeskInstance;
    
    this.updateModal = new UpdateModal(this.helpDesk, this.ticketService);
    this.onDoneButton = this.onDoneButton.bind(this);
    this.onUpdateButton = this.onUpdateButton.bind(this);
    this.onDeleteButton = this.onDeleteButton.bind(this);
    this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    this.closeDeleteBlock = this.closeDeleteBlock.bind(this);
    this.onTicketClick = this.onTicketClick.bind(this);
  }

  //Отрисовка тикетов
  renderTicket(name, created, status, id) {
    const currentDate = new Date(created).toLocaleString();
    //Блок тикета
    const ticketWrapper = document.createElement('li');
    ticketWrapper.classList.add('ticket-wrapper');
    ticketWrapper.setAttribute('data-id', id);
    ticketWrapper.setAttribute('data-status', status);

    //Левый блок тикета
    const leftBlock = document.createElement('div');
    leftBlock.classList.add('left-block');

    //Правый блок тикета
    const rightBlock = document.createElement('div');
    rightBlock.classList.add('right-block');

    //Кнопка выполненого тикета
    const doneButton = document.createElement('a');
    doneButton.classList.add('done-button');

    if (status) {
      doneButton.textContent = 'V'
    }

    //Имя тикета
    const ticketName = document.createElement('p');
    ticketName.classList.add('ticket-name');
    ticketName.textContent = name;

    leftBlock.append(doneButton, ticketName)

    //Дата заведения тикета
    const ticketDate = document.createElement('p');
    ticketDate.classList.add('ticket-date');
    ticketDate.textContent = currentDate;

    //Кнопка для редактирования тикета
    const updateButton = document.createElement('a');
    updateButton.classList.add('update-button');
    updateButton.textContent = '✎';

    //Кнопка для удаления тикета
    const deleteButton = document.createElement('a');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X'

    rightBlock.append(ticketDate, updateButton, deleteButton)

    ticketWrapper.append(leftBlock, rightBlock);

    doneButton.addEventListener('click', this.onDoneButton);
    updateButton.addEventListener('click', this.onUpdateButton);
    deleteButton.addEventListener('click', this.onDeleteButton);
    ticketWrapper.addEventListener('click', this.onTicketClick);

    return ticketWrapper;
  }

  //Обработчик кнопки выполнения задачи
  async onDoneButton(e) {
    e.stopPropagation();
    const ticket = e.target.closest('.ticket-wrapper');

    const ticketId = ticket.getAttribute('data-id');
    const status = (ticket.getAttribute('data-status') === 'true');

    await this.ticketService.update(ticketId, { status: !status });
    await this.helpDesk.renderTicketList();
  }

  //Обработчки кнопки изменения задачи
  async onUpdateButton(e) {
    e.stopPropagation();
    if (document.querySelector('.form')) return;

    const ticketId = e.target.closest('.ticket-wrapper').getAttribute('data-id');
    const ticket = await this.ticketService.get(ticketId);
    
    const container = document.querySelector('.container');
    const form = this.updateModal.renderForm(ticket);

    container.appendChild(form);

  }

  //Обработчик кнопки удаления задачи
  onDeleteButton(e) {
    e.stopPropagation();
    const deleteBlock = document.querySelector('.delete-block');
    const container = document.querySelector('.container');
    if (deleteBlock) return;

    const ticket = e.target.closest('.ticket-wrapper');
    const ticketId = ticket.getAttribute('data-id');

    container.appendChild(this.renderDeleteModal(ticketId));
  }

  //Отрисовка модального окна удаления тикета
  renderDeleteModal(ticketId) {
    const deleteBlock = document.createElement('div');
    deleteBlock.classList.add('delete-block');
    deleteBlock.setAttribute('data-id', ticketId)

    const deleteBlockTitle = document.createElement('p');
    deleteBlockTitle.classList.add('delete-block-title');
    deleteBlockTitle.textContent = 'Удалить тикет';

    const deleteBlockText = document.createElement('p');
    deleteBlockText.classList.add('delete-block-text');
    deleteBlockText.textContent = 'Вы уверены, что хотите удалить тикет? Это действие необратимо.'

    //Блок с кнопками
    const buttonBlock = document.createElement('div');
    buttonBlock.classList.add('button-block');

    //Кнопка отмены
    const cancelBtn = document.createElement('a');
    cancelBtn.classList.add('cancel-button');
    cancelBtn.textContent = 'Отмена'

    //Кнопка подтверждения
    const approveBtn = document.createElement('a');
    approveBtn.classList.add('approve-button');
    approveBtn.textContent = 'Ок'

    buttonBlock.append(cancelBtn, approveBtn);

    deleteBlock.append(deleteBlockTitle, deleteBlockText, buttonBlock)

    cancelBtn.addEventListener('click', this.closeDeleteBlock);
    approveBtn.addEventListener('click', this.sendDeleteRequest)

    return deleteBlock
  }

  //Закрытие окна удаления тикета
  closeDeleteBlock() {
    const deleteBlock = document.querySelector('.delete-block');
    if (!deleteBlock) return;

    deleteBlock.remove();
  }

  //Отправка запроса на удаление тикета
  async sendDeleteRequest(e) {
    try {
      const ticketId = e.target.closest('.delete-block').getAttribute('data-id');

      await this.ticketService.delete(ticketId);
      await this.helpDesk.renderTicketList();

      this.closeDeleteBlock();
    } catch (error) {
      console.error('Что-то пошло не так при удалении тикета:', error.message);
    }
  }

  //Обработчик нажатия на тикет для раскрытия подробного описания
  async onTicketClick(e) {
    try {
      const ticket = e.target.closest('.ticket-wrapper');
      const openDescription = ticket.querySelector('.description');

      if(openDescription){
        openDescription.remove();
        return;
      }

      const ticketId = ticket.getAttribute('data-id');
      const response = await this.ticketService.get(ticketId);

      if(!response.description) return;
      
      const description = document.createElement('div');
      description.classList.add('description');
      description.textContent = response.description;

      ticket.appendChild(description);

    } catch (error) {
      console.error(error);
    }

  }

}
