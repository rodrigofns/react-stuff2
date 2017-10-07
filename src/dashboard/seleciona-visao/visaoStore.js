import {observable} from 'mobx';

class VisaoStore {
	@observable visaoAtual1 = 'INTERNAS';
	@observable visaoAtual2 = 'FEDERAL';
}

export default new VisaoStore();
