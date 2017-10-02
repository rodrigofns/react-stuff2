import AppState from 'react-app-state';

class TituloState extends AppState {
	constructor() {
		super({
			titulo: ''
		});
	}

	set titulo(texto) {
		super.set({
			titulo: texto
		});
	}

	get titulo() {
		return super.get('titulo') ?
			'SGU - ' + super.get('titulo') :
			'Sistema de Gestão de Unidades';
	}
}

export default new TituloState();
