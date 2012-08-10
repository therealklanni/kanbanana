enyo.kind({
	name: 'Board',
	kind: 'FittableRows',
	classes: 'fittable-shadow',
	
	published: {
		project: {}
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
		
		if (self.$.stepList.getComponents().length > 0) self.$.stepList.destroyClientControls()
		
		enyo.forEach(inSender.steps, function(step) {
			self.$.stepList.createComponent({
				kind: 'StepSlide',
				name: self.name +'_stepList_'+ step.stepName.split(' ').join('_').toLowerCase(),
				stepName: step.stepName,
				stepId: step.id
			})
		})
	}
})