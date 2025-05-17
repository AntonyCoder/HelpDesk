/**
 *  Класс для создания формы создания нового тикета
 * */
export default class TicketForm {
  constructor() {
    this.deleteForm = this.deleteForm.bind(this);
  }

  //Отрисовка формы создания тикета
  renderForm(){
    const form = document.createElement('form');
    form.classList.add('form');
    
    //Название формы
    const title = document.createElement('p');
    title.classList.add('title');
    title.textContent = 'Добавить тикет';

    //Label поля короткого описания
    const shortDescriptionLabel = document.createElement('label');
    shortDescriptionLabel.classList.add('short-description-label');
    shortDescriptionLabel.textContent = 'Короткое описание';

    //Поле короткого описания
    const shortDescriptionInput = document.createElement('input');
    shortDescriptionInput.classList.add('short-description-input');
    shortDescriptionInput.type = 'text';

    //Label поля подробного описания
    const longDescriptionLabel = document.createElement('label');
    longDescriptionLabel.classList.add('long-description-label');
    longDescriptionLabel.textContent = 'Подробное описание';

    //Поле подробного описания
    const longDescriptionInput = document.createElement('input');
    longDescriptionInput.classList.add('long-description-input');
    longDescriptionInput.type = 'text';

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

    buttonBlock.append(cancelBtn, approveBtn)

    form.append(title, shortDescriptionLabel, shortDescriptionInput, longDescriptionLabel, longDescriptionInput, buttonBlock);

    cancelBtn.addEventListener('click', this.deleteForm);

    return form;
  }

  deleteForm(){
    const form = document.querySelector('.form');
    if(!form) return;

    form.remove();
  }
}
