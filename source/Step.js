enyo.kind({
	name: 'Step',
	kind: 'Component',
	
	published: {
		stepId: '',
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
	
	components: [
		{ kind: 'FittableRows', fit: true, components: [
			{ kind: 'onyx.Toolbar', components: [
				{ tag: 'h5', name: 'stepName' }
			]},
			{ fit: true }
		]}
	]
})