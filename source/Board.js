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
		{ fit: true },
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
	}
})