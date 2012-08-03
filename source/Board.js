enyo.kind({
	name: 'Board',
	kind: 'FittableRows',
	classes: 'fittable-shadow',
	
	published: {
		project: {}
	},
	
	components: [
		{ kind: 'onyx.Toolbar', components: [
			{ tag: 'h5', name: 'title' }
		]},
		{ kind: 'FittableColumns', fit: true, components: [
			{ kind: 'Panels', fit: true, arrangerKind: 'CarouselArranger', name: 'stepList' },
		]},
		{ kind: 'onyx.Toolbar', components: [
			{ kind: 'onyx.Grabber' }
		]}
	],
	
	create: function() {
		this.inherited(arguments)
		this.projectChanged()
	},
	
	projectChanged: function() {
		this.$.title.setContent(this.project.title)
		var self = this
		console.debug('this',this)
		
		enyo.forEach(this.project.steps, function(step) {
			console.debug(step)
			self.$.stepList.addControl(new StepSlide({
				name: self.name +'_'+ step.stepName.split(' ').join('_').toLowerCase(),
				stepName: step.stepName
			}))
		})
		
		//this.render()
	}
})