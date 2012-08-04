enyo.kind({
	name: 'Step',
	kind: 'Component',
	
	published: {
		stepName: '',
		queueName: '',
		wipName: '',
		allLimit: 0,
		wipLimit: 0
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
			{ kind: 'onyx.Toolbar', components: [
				{ kind: 'onyx.Grabber' },
				{ name: 'stepName' }
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
	}
})