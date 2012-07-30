enyo.kind({
	name: 'Kanbanana',
	kind: 'FittableRows',
	classes: 'onyx enyo-fit',
	fit: true,
	
	components:[
		{ kind: 'Panels', fit: true, classes: 'panels-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, components: [
			{ kind: 'FittableRows', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ tag: 'h5', content: 'Kanbanana' }
				]},
				{ fit: true, components: [
					{ kind: 'onyx.Groupbox', components: [
						{ kind: 'onyx.GroupboxHeader', content: 'account information' },
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctEmail', classes: 'stretch-input', placeHolder: 'e-mail', oninput: 'updateAcctEmail', value: localStorage.getItem('acctEmail') },
						]},
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctKey', classes: 'stretch-input', placeHolder: 'api key', oninput: 'updateAcctKey', value: localStorage.getItem('acctKey') },
						]}
					]}
				]/*, rendered: function() { enyo.$.kanbanana.getProjects() }*/},
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Button', content: '1' }
				]}
			]},
			{ kind: 'FittableRows', fit: true, classes: 'fittable-shadow', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ tag: 'h5', content: 'Your Projects' }
				]},
				{ kind: 'ProjectList' },
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Grabber' },
					{ kind: 'onyx.Button', content: 'Refresh', ontap: 'getProjects' },
					{ kind: 'onyx.Button', content: '2' }
				]}
			]}
		]}
	],
	
	updateAcctEmail: function(inRequest) {
		localStorage.setItem('acctEmail', this.acctEmail = inRequest.eventNode.value)
	},
	
	updateAcctKey: function(inRequest) {
		localStorage.setItem('acctKey', this.acctKey = inRequest.eventNode.value)
	}
});
