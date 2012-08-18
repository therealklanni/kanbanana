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
		{ kind: 'onyx.Toolbar', classes: 'onyx-menu-toolbar', components: [
			{ name: 'title', content: 'Steps' },
			{ kind: 'onyx.TooltipDecorator', style: 'float: right', components: [
				{ kind: 'onyx.Button', content: '>', style: 'float: right', ontap: 'nextSlide' },
				{ kind: 'onyx.Button', content: '<', style: 'float: right', ontap: 'prevSlide' },
				{ kind: 'onyx.Tooltip', content: 'tap to navigate steps' }
			]}
		]},
		{ kind: 'Panels', fit: true, arrangerKind: 'CarouselArranger', name: 'stepList', classes: 'panels-wide' },
		{ kind: 'onyx.Toolbar', components: [
			{ kind: 'onyx.Grabber' }
		]}
	],
	
	create: function() {
		this.inherited(arguments)
	},

	nextSlide: function() {
		this.$.stepList.next()
	},

	prevSlide: function() {
		this.$.stepList.previous()
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