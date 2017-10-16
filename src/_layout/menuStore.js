import {action, observable} from 'mobx';

class MenuStore {
	@observable aberto = false;

	@action
	abreMenu(abre) {
		this.aberto = abre;
	}
}

export default new MenuStore();
