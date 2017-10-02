import Home from './home/Home';
import HierarquiaTipos    from './hierarquia-tipos/HierarquiaTipos';
import HierarquiaUnidades from './hierarquia-unidades/HierarquiaUnidades';
import Dashboard from './dashboard/Dashboard';

const rotas = [
	{ nome: 'Home',                   caminho: '/home',               componente: Home },
	{ nome: 'Hierarquia de Tipos',    caminho: '/hierarquiaTipos',    componente: HierarquiaTipos },
	{ nome: 'Hierarquia de Unidades', caminho: '/hierarquiaUnidades', componente: HierarquiaUnidades },
	{ nome: 'Dashboard',              caminho: '/dashboard',          componente: Dashboard }
];

export default rotas;
