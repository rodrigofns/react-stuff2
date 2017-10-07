import {observable} from 'mobx';

class MenuStore {
	@observable aberto = false;
}

export default new MenuStore();
