import {observable} from 'mobx';

class GlobalMsgStore {
	@observable msgs = [];

	add(msg) {
		this.msgs.push(msg);
	}

	remove(i) {
		this.msgs.splice(i, 1);
	}

	clear() {
		this.msgs = [];
	}
}

export let globalMsgStore = new GlobalMsgStore();
