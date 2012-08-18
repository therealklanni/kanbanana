enyo.kind({
	name: 'Step',
	kind: 'Component',
	
	published: {
		stepName: '',
		queueName: '',
		wipName: '',
		allLimit: 0,
		wipLimit: 0,
		tasks: []
	}
})

enyo.kind({
	name: 'StepSlide',
	kind: 'FittableRows',
	
	published: {
		stepName: '',
		queueName: '',
		wipName: '',
		allLimit: 0,
		wipLimit: 0
	},
	
	components: [
		{ kind: 'FittableRows', fit: true, components: [
			{ kind: 'onyx.Toolbar', classes: 'onyx-menu-toolbar', components: [
				{ kind: 'onyx.Grabber' },
				{ name: 'stepName' },
				{ kind: 'onyx.MenuDecorator', style: 'float: right', components: [
					{ content: '...' },
					{ kind: 'onyx.Menu', components: [
						{ content: 'new task' },
						{ classes: 'onyx-menu-divider' },
						{ content: 'refresh', ontap: 'refreshList' }
					]}
				]}
			]},
			{ kind: 'TaskList' },
		]}
	],
	
	create: function() {
		this.inherited(arguments)
		this.stepNameChanged()
	},
	
	stepNameChanged: function() {
		this.$.stepName.setContent(this.stepName)
	},

	refreshList: function() {
		this.waterfall('onRefreshList')
	}
})