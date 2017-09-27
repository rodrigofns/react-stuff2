/**
 * A global state manager for React.
 * @author Rodrigo Cesar de Freitas Dias <rcesar@gmail.com>
 * @license MIT
 * @see https://github.com/rodrigocfd/react-app-state
 */

import React from 'react';

/* INTERNAL STRUCTURE LOOKS LIKE THIS:
this._variables = [
	"variable": { // a variable being subscribed to
		components: [
			"componentId": { // a component which subscribed to this variable
				instances: [
					"instanceId": AppStateSubscriber // an instance that must receive props
				}
			]
		],
		value: { ... } // current value for this variable
	],
	"anotherVariable": { ... }
};
*/

export default class AppState {
	constructor() {
		this._nextComponentId = 0; // these are supposed to be private...
		this._variables = [];      // ...if you mess with them, you're looking for trouble
	}

	// Updates one or more values.
	// set({ myName:'foo', mySurname:'bar' }, () => alert('done!'));
	set(userVars, callback) {
		let componentsToGo = []; // components that subscribed to a variable that user is updating
		let statesToGo = []; // state values to send to each component in componentsToGo
		let instanceCount = 0; // how many instances are to be notified

		for (const userVar of Object.keys(userVars)) {
			let variable = this._variables[userVar]; // a subscribed variable

			if (!variable) {
				if (Object.keys(this._variables).length > 0) { // components have subscribed already?
					throw new Error('Updating a variable that no component has subscribed to: ' + userVar);
				}
			} else {
				variable.value = userVars[userVar]; // store new value for variable

				for (const componentId of Object.keys(variable.components)) { // components subscribed to this variable
					if (!componentsToGo[componentId]) { // not added to componentsToGo yet?
						componentsToGo[componentId] = variable.components[componentId];
						statesToGo[componentId] = []; // will be passed to setState()
						instanceCount += Object.keys(componentsToGo[componentId].instances).length;
					}
					statesToGo[componentId][userVar] = userVars[userVar]; // add the variable that will be sent to instance
				}
			}
		}

		let asyncDispatch = () => {
			if (callback && --instanceCount === 0) {
				callback(); // callback is fired after the last setState() return
			}
		};

		for (const componentId of Object.keys(componentsToGo)) {
			let compToGo = componentsToGo[componentId];
			let stateToGo = statesToGo[componentId];

			for (const instanceId of Object.keys(compToGo.instances)) {
				compToGo.instances[instanceId].setState(stateToGo, // notify instance with variables it subscribed to
					asyncDispatch); // callback asynchronous behavior just like setState()
			}
		}
	}

	// Retrieve one value imperatively.
	// get('myName');
	get(userVar) {
		return this._variables[userVar] ?
			this._variables[userVar].value : undefined;
	}

	// Subscribes a component to one or more variables, returns a HOC.
	// subscribe(MyComponent, 'myName', 'mySurname')
	subscribe(WrappedComponent, ...varNames) {
		let componentId = 'co' + (this._nextComponentId++);
		let component = {
			instances: [],
			nextInstanceId: 0
		};

		for (const varName of varNames) {
			if (!this._variables[varName]) { // no one subscribed to this variable yet?
				this._variables[varName] = { components: [] }; // create new entry on the "variables" object
			}
			this._variables[varName].components[componentId] = component; // store component using componentId as key
		}

		let componentVariables = this._variables;

		return class AppStateSubscriber extends React.Component {
			constructor(props) {
				super(props);
				this._instanceId = 'in' + (component.nextInstanceId++);
				component.instances[this._instanceId] = this; // store instance using instanceId as key
				let stateValues = { };

				for (const varName of varNames) {
					if (componentVariables[varName].value) { // a set() was already called on this variable?
						stateValues[varName] = componentVariables[varName].value; // instance receives saved value right away
					}
				}
				this.state = stateValues;
			}

			componentWillUnmount() {
				delete component.instances[this._instanceId]; // so set() won't dispatch to an inexistent object
			}

			render() {
				let allProps = { ...this.props, ...this.state }; // set() triggers this.state change, we add into wrapped's props
				return <div><WrappedComponent {...allProps}/></div>;
			}
		}
	}
}
