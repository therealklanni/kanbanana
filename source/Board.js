enyo.kind({
	name: 'Board',
	kind: 'FittableRows',
	classes: 'fittable-shadow',
	
	published: {
		project: {}
	},
	
	components: [
		{ kind: 'onyx.Toolbar', components: [
			{ name: 'title' }
		]},
		{ kind: 'Panels', fit: true, arrangerKind: 'CarouselArranger', name: 'stepList', classes: 'panels-wide' },
		{ kind: 'onyx.Toolbar', components: [
			{ kind: 'onyx.Grabber' }
		]}
	],
	
	create: function() {
		this.inherited(arguments)
		this.projectChanged()
	},
	
	projectChanged: function() {
		var self = this
		
		self.$.title.setContent(this.project.title)
		
		while (self.$.stepList.children.length > 0) {
		enyo.forEach(self.$.stepList.children, function(e) {
			self.$.stepList.removeChild(e)
		})
		}
		
		self.render()
		
		enyo.forEach(this.project.steps, function(step) {
			self.$.stepList.addControl(new StepSlide({
				name: self.name +'_stepList_'+ step.stepName.split(' ').join('_').toLowerCase(),
				stepName: step.stepName,
				stepId: step.id
			}))
		})
	}
})