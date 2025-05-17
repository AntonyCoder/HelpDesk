/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
import './TicketView.css'

export default class TicketView {

  //Отрисовка тикетов
  renderTicket(name, created, status){
    const currentDate = new Date(created).toLocaleString();
    //Блок тикета
    const ticketWrapper = document.createElement('li');
    ticketWrapper.classList.add('ticket-wrapper');

    //Левый блок тикета
    const leftBlock = document.createElement('div');
    leftBlock.classList.add('left-block');

    //Правый блок тикета
    const rightBlock = document.createElement('div');
    rightBlock.classList.add('right-block');

    //Кнопка выполненого тикета
    const doneButton = document.createElement('a');
    doneButton.classList.add('done-button');

    if(status){
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
    updateButton.textContent ='✎';

    //Кнопка для удаления тикета
    const deleteButton = document.createElement('a');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'X'

    rightBlock.append(ticketDate, updateButton, deleteButton)

    ticketWrapper.append(leftBlock, rightBlock);

    return ticketWrapper;

  }
}
