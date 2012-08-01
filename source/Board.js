enyo.kind({
	name: 'Board',
	kind: 'FittableRows',
	classes: 'fittable-shadow',
	
	published: {
		projectName: null,
	},
	
	components: [
		{ kind: 'onyx.Toolbar', components: [
			{ tag: 'h5', name: 'projectName' }
		]}
	],
	
	//constructor: function() {
	//	this.instanceArray = []
	//	this.inherited(arguments)
	//	this.components = [
	//		{ kind: 'onyx.Toolbar', components: [
	//			{ tag: 'h5', name: 'projectName' }
	//		]}
	//	]
	//	
	//	console.debug(this)
	//},
	
	create: function() {
		this.inherited(arguments)
		this.projectNameChanged()
	},
	
	projectNameChanged: function() {
		this.$.projectName.setContent(this.projectName)
	}
})