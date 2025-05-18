import HelpDesk from './components/HelpDesk/HelpDesk';
import TicketService from './TicketService';

export const baseUrl = 'http://localhost:3000/'
const root = document.getElementById('root');

const ticketService = new TicketService(baseUrl);
const app = new HelpDesk(root, ticketService);

app.init();
