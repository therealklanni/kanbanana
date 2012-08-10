enyo.kind({
	name: 'Board',
	kind: 'FittableRows',
	classes: 'fittable-shadow',
	
	published: {
		project: {},
		title: ''
	},
	
	components: [
		{ kind: 'Signals', onBoardUpdate: 'updateBoard' },
		{ kind: 'onyx.Toolbar', components: [
			{ name: 'title', content: 'Steps' }
		]},
		{ kind: 'Panels', fit: true, arrangerKind: 'CarouselArranger', name: 'stepList', classes: 'panels-wide' },
		{ kind: 'onyx.Toolbar', components: [
			{ kind: 'onyx.Grabber' }
		]}
	],
	
	create: function() {
		this.inherited(arguments)
		//this.projectChanged()
	},
	
	updateBoard: function(inEvent, inSender) {
		var self = this
		
		self.setTitle(inSender.title)
		
		if (self.$.stepList.getComponents().length > 0) {
			self.$.stepList.destroyClientControls()
		}
		
		enyo.forEach(inSender.steps, function(step) {
			self.$.stepList.createComponent({
				kind: 'StepSlide',
				name: step.stepName.split(' ').join('_').toLowerCase(),
				stepName: step.stepName,
				stepId: step.id,
				slug: inSender.slug
			})
		})
	},
	
	titleChanged: function() {
		this.$.title.setContent(this.title)
	}
})