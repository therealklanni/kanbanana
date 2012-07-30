enyo.kind({
	name: 'Project',
	kind: 'Control',
	tag: 'div',
	
	published: {
		title: null,
		slug: null,
		orgId: null,
		wipLimit: null,
		privacy: null,
		created: null,
		updated: null
	},
	
	components: [
		{ tag: 'div', name: 'title' },
		{ tag: 'div', name: 'slug' },
		{ tag: 'div', name: 'orgId' },
		{ tag: 'div', name: 'wipLimit' },
		{ tag: 'div', name: 'privacy' },
		{ tag: 'div', name: 'created' },
		{ tag: 'div', name: 'updated' }
	],
	
	create: function() {
		this.inherited(arguments)
		this.titleChanged()
		this.slugChanged()
		this.orgIdChanged()
		this.wipLimitChanged()
		this.privacyChanged()
		this.createdChanged()
		this.updatedChanged()
	},
	
	titleChanged: function() {
		this.$.title.setContent(this.title)
	},
	
	slugChanged: function() {
		this.$.slug.setContent(this.slug)
	},
	
	orgIdChanged: function() {
		this.$.orgId.setContent(this.orgId)
	},
	
	wipLimitChanged: function() {
		this.$.wipLimit.setContent(this.wipLimit)
	},
	
	privacyChanged: function() {
		this.$.privacy.setContent(this.privacy)
	},
	
	createdChanged: function() {
		this.$.created.setContent(this.created)
	},
	
	updatedChanged: function() {
		this.$.updated.setContent(this.updated)
	}
})