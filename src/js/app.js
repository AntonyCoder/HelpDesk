import HelpDesk from './HelpDesk';
import TicketService from './TicketService';
import createRequest from './api/createRequest';

const root = document.getElementById('root');

const ticketService = new TicketService();
const app = new HelpDesk(root, ticketService);

app.init();


const response = createRequest({
    url: 'http://localhost:3000/?method=allTickets'
})

console.log(response);