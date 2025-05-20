
export class UpdateModal {
    constructor(helpDeskInstance, ticketService) {
        this.helpDesk = helpDeskInstance;
        this.ticketService = ticketService;

        this.deleteForm = this.deleteForm.bind(this);
        this.sendForm = this.sendForm.bind(this);
    }

    //Отрисовка формы создания тикета
    renderForm(ticket) {
        const form = document.createElement('form');
        form.classList.add('form');
        form.setAttribute('data-id', ticket.id);

        //Название формы
        const title = document.createElement('p');
        title.classList.add('title');
        title.textContent = 'Изменить тикет';

        //Label поля короткого описания
        const shortDescriptionLabel = document.createElement('label');
        shortDescriptionLabel.classList.add('short-description-label');
        shortDescriptionLabel.textContent = 'Короткое описание';

        //Поле короткого описания
        const shortDescriptionInput = document.createElement('input');
        shortDescriptionInput.classList.add('short-description-input');
        shortDescriptionInput.type = 'text';
        shortDescriptionInput.value = ticket.name

        //Label поля подробного описания
        const longDescriptionLabel = document.createElement('label');
        longDescriptionLabel.classList.add('long-description-label');
        longDescriptionLabel.textContent = 'Подробное описание';

        //Поле подробного описания
        const longDescriptionInput = document.createElement('input');
        longDescriptionInput.classList.add('long-description-input');
        longDescriptionInput.type = 'text';
        longDescriptionInput.value = ticket.description

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
        approveBtn.addEventListener('click', this.sendForm);

        return form;
    }

    //Удаление формы добавления нового тикета
    deleteForm() {
        const form = document.querySelector('.form');
        if (!form) return;

        form.remove();
    }

    //Отправка формы на добавление нового тикета
    async sendForm() {
        const shortDescriptionInput = document.querySelector('.short-description-input');
        const name = shortDescriptionInput.value;

        const longDescriptionInput = document.querySelector('.long-description-input');
        const description = longDescriptionInput.value;

        const ticketId = document.querySelector('.form').getAttribute('data-id');

        try {
            if (!name) return
            await this.ticketService.update(ticketId, { name: name, description: description });

            this.deleteForm();

            await this.helpDesk.renderTicketList();
        } catch (error) {
            console.error('Что-то пошло не так при создании тикета:', error.message);
        }
    }
}