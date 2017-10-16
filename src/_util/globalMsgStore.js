import {observable} from 'mobx';

class GlobalMsgStore {
	@observable msgs = [];

	add(msg) {
		this.msgs.push(msg);
	}

	clear() {
		this.msgs = [];
	}
}

export let globalMsgStore = new GlobalMsgStore();
