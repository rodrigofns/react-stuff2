import {action, observable} from 'mobx';

class GlobalMsgStore {
	@observable msgs = [];

	@action
	add(msg) {
		this.msgs.push(msg);
	}

	@action
	remove(i) {
		this.msgs.splice(i, 1);
	}

	@action
	clear() {
		this.msgs = [];
	}
}

export let globalMsgStore = new GlobalMsgStore();
