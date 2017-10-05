import Home from './home/Home';
import HierarquiaTipos from './hierarquia-tipos/HierarquiaTipos';
import HierarquiaUnidades from './hierarquia-unidades/HierarquiaUnidades';
import Dashboard from './dashboard/Dashboard';

const rotas = [ {
		nome: 'Home',
		icone: 'home',
		caminho: '/home',
		componente: Home
	}, {
		nome: 'Hierarquia de Tipos',
		icone: 'pagelines',
		caminho: '/hierarquiaTipos',
		componente: HierarquiaTipos
	}, {
		nome: 'Hierarquia de Unidades',
		icone: 'sitemap',
		caminho: '/hierarquiaUnidades',
		componente: HierarquiaUnidades
	}, {
		nome: 'Dashboard',
		icone: 'bar-chart-o',
		caminho: '/dashboard',
		componente: Dashboard
	}
];

export default rotas;
