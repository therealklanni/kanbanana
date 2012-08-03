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
				{ tag: 'h5', name: 'stepName' }
			]},
			{ fit: true },
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