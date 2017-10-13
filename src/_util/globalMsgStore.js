import {observable} from 'mobx';

class GlobalMsgStore {
	@observable msgs = ['this','shit'];

	add(msg) {
		this.msgs.push(msg);
	}

	clear() {
		this.msgs = [];
	}
}

export let globalMsgStore = new GlobalMsgStore();
