enyo.kind({
	name: 'ProjectList',
	kind: 'FittableRows',
	
	acctEmail: localStorage.getItem('acctEmail'),
	acctKey: localStorage.getItem('acctKey'),
	
	projects: null,
	
	components: [
		{ kind: 'PulldownList', name: 'projectList', fit: true, classes: 'list-pulldown-list', onSetupItem: 'setupProject', onPullRelease: 'pullRelease', onPullComplete: 'pullComplete', components: [
			{ ontap: 'projectTap', classes: 'list-pulldown-item enyo-border-box', components: [
				{ name: 'privacy', classes: 'project privacy' },
				{ name: 'title', classes: 'project title' },
				{ name: 'wipLimit', classes: 'project wipLimit' },
				{ name: 'updated', classes: 'project updated' }
			]}
		]}
	],
	
	create: function() {
		this.inherited(arguments)
	},
	
	rendered: function() {
		this.inherited(arguments)
		this.getProjects()
	},
	
	pullRelease: function() {
		this.pulled = true
		this.getProjects()
	},
	
	pullComplete: function () {
		this.pulled = false
		this.$.projectList.reset()
	},
	
	projectTap: function(inSender, inEvent) {
		var panels = enyo.$.kanbanana_panels,
		boardName = 'board_'+ this.projects[inEvent.index].name.split(' ').join('_').toLowerCase()
		
		// Hide all but requested board
		enyo.forEach(panels.getPanels().filter(function(panel) {
			return panels.getPanels().indexOf(panel) > 1
		}), function(panel) {
			panel.setShowing(panel.name === boardName)
			// Need to figure out how to make the shown panel size properly
		})
		
		// If requested board doesn't exist, create it
		if (!enyo.$[boardName]) {
			new Board({
				name: boardName,
				projectName: this.projects[inEvent.index].name,
				container: panels
			})
		}
		
		panels.render()
		
		// Make 'Your Projects' the active panel
		panels.setIndex(1)
	},
	
	getProjects: function(inPlace, inEvent) {
		xhr = new enyo.Ajax({ url: 'projects.json' })
		
		xhr.response(enyo.bind(this, 'updateProjects'))
		
		xhr.go()
	},
	
	updateProjects: function(inRequest, inResponse) {
		console.debug('response',inResponse)
		if (inResponse instanceof Array) {
			this.projects = inResponse.map(function(e,i,a) {
				e.created_at = new Date(e.created_at)
				e.updated_at = new Date(e.updated_at)
				
				return e;
			}).sort(function(a,b) {
				return b.updated_at.valueOf() - a.updated_at.valueOf()
			})
			
			this.$.projectList.setCount(this.projects.length)
		}
		
		if (this.pulled) {
			this.$.projectList.completePull()
		} else {
			this.$.projectList.reset()
		}
	},
	
	setupProject: function(inSender, inEvent) {
		var i = inEvent.index
		var project = this.projects[i]
		
		this.$.title.setContent(project.name)
		this.$.wipLimit.setContent(project.wip_limit)
		this.$.privacy.setContent(project.privacy ? 'private' : '')
		this.$.updated.setContent(project.updated_at.toUTCString())
	},
})