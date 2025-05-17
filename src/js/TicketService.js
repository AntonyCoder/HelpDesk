import createRequest from "./api/createRequest"

/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
export default class TicketService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

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

  get(id, callback) { }

  create(data, callback) { }

  update(id, data, callback) { }

  delete(id, callback) { }
}
