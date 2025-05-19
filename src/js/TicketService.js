import createRequest from "./api/createRequest"

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  //Получение всех тикетов
  async list() {
    try {
      const response = await createRequest({
        url: `${this.baseUrl}?method=allTickets`
      })

      return response;
    } catch (error) {
      console.error(error);
    }
  }

  //Получение подробного описания тикета
  async get(id) {
    try {
      const response = await createRequest({
        url: `${this.baseUrl}?method=ticketById&id=${id}`,
      })

      return response
    } catch (error) {
      console.error(error)
      throw error;
    }
  }


  //Создание нового тикета
  async create(data) {
    try {
      const response = await createRequest({
        url: `${this.baseUrl}?method=createTicket`,
        method: 'POST',
        body: data,
      })

      return response;
    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  //Обновление тикета
  async update(id, data) {
    try {
      await createRequest({
        url: `${this.baseUrl}?method=updateById&id=${id}`,
        method: 'POST',
        body: data,
      });

    } catch (error) {
      console.error(error)
      throw error;
    }
  }

  //Удаление тикета
  async delete(id) {
    try {
      await createRequest({
        url: `${this.baseUrl}?method=deleteById&id=${id}`,
      })

    } catch (error) {
      console.error(error)
      throw error;
    }
  }
}
