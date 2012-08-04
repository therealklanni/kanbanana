enyo.kind({
	name: 'Kanbanana',
	kind: 'FittableRows',
	classes: 'onyx enyo-fit',
	
	components:[
		{ kind: 'Panels', fit: true, classes: 'panels-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, components: [
			{ kind: 'FittableRows', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ content: 'Kanbanana', classes: 'kanbanana title' }
				]},
				{ fit: true, components: [
					{ kind: 'onyx.Groupbox', components: [
						{ kind: 'onyx.GroupboxHeader', content: 'account information' },
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctEmail', classes: 'stretch-input', placeholder: 'e-mail', oninput: 'updateAcctEmail', value: localStorage.getItem('acctEmail') },
						]},
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctKey', classes: 'stretch-input', placeholder: 'api key', oninput: 'updateAcctKey', value: localStorage.getItem('acctKey') },
						]}
					]}
				]},
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Button', content: '1' }
				]}
			]},
			{ kind: 'FittableRows', classes: 'fittable-shadow', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ content: 'Your Projects' }
				]},
				{ kind: 'ProjectList', fit: true },
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Grabber' },
					{ kind: 'onyx.Button', content: '2' }
				]}
			]}
		]}
	],
	
	create: function() {
		this.inherited(arguments)
	},
	
	updateAcctEmail: function(inRequest) {
		localStorage.setItem('acctEmail', this.acctEmail = inRequest.eventNode.value)
	},
	
	updateAcctKey: function(inRequest) {
		localStorage.setItem('acctKey', this.acctKey = inRequest.eventNode.value)
	}
});
