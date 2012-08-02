enyo.kind({
	name: 'ProjectList',
	kind: 'FittableRows',
	
	acctEmail: localStorage.getItem('acctEmail'),
	acctKey: localStorage.getItem('acctKey'),
	
	projects: [],
	
	components: [
		{ kind: 'PulldownList', name: 'projectList', fit: true, classes: 'list-pulldown-list', onSetupItem: 'setupItem', onPullRelease: 'pullRelease', onPullComplete: 'pullComplete', components: [
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
		boardName = 'board_'+ this.projects[inEvent.index].getTitle().split(' ').join('_').toLowerCase()
		
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
				title: this.projects[inEvent.index].getTitle(),
				container: panels
			})
		}
		
		panels.render()
		
		// Make 'Your Projects' the active panel
		panels.setIndex(1)
	},
	
	getProjects: function(inPlace, inEvent) {
		xhr = new enyo.Ajax({ url: 'proxy.php' })
		
		xhr.response(enyo.bind(this, 'updateProjectList'))
		
		xhr.go({
			path: 'projects.json',
			email: this.acctEmail,
			key: this.acctKey
		})
	},
	
	updateProjectList: function(inRequest, inResponse) {
		var self = this
		
		if (inResponse instanceof Array) {
			enyo.forEach(inResponse.sort(function(a,b) {
				return b.updated_at - a.updated_at
			}).map(function(e) {
				return {
					title: e.name,
					slug: e.slug,
					orgId: e.organization_id,
					wipLimit: e.wip_limit,
					privacy: e.privacy,
					created: new Date(e.created_at),
					updated: new Date(e.updated_at),
					
					acctEmail: self.acctEmail,
					acctKey: self.acctKey
				}
			}), function(project) {
				var slugs = self.projects.map(function(e) {
					return e.slug
				})
				
				if (slugs.indexOf(project.slug) === -1) {
					self.projects.push(new Project(project))
				} else {
					// Update existing objects
				}
			})
			
			this.$.projectList.setCount(this.projects.length)
		}
		
		if (this.pulled) {
			this.$.projectList.completePull()
		} else {
			this.$.projectList.reset()
		}
	},
	
	setupItem: function(inSender, inEvent) {
		var i = inEvent.index
		var project = this.projects[i]
		
		this.$.title.setContent(project.title)
		this.$.wipLimit.setContent(project.wipLimit)
		this.$.privacy.setContent(project.privacy ? 'private' : '')
		this.$.updated.setContent(project.updated.toUTCString())
	},
})

enyo.kind({
	name: 'Project',
	kind: 'Component',
	
	steps: [],
	
	slug: '',
	orgId: '',
	created: new Date(),
	
	published: {
		title: '',
		wipLimit: 0,
		privacy: false,
		updated: new Date()
	},
	
	create: function() {
		this.inherited(arguments)
		
		this.getSteps()
	},
	
	getProject: function() {
		xhr = new enyo.Ajax({ url: 'proxy.php' })
		
		xhr.response(enyo.bind(this, 'updateProject'))
		
		xhr.go({
			path: 'projects/'+this.slug+'.json',
			email: this.acctEmail,
			key: this.acctKey
		})
	},
	
	getSteps: function() {
		xhr = new enyo.Ajax({ url: 'proxy.php' })
		
		xhr.response(enyo.bind(this, 'updateSteps'))
		
		xhr.go({
			path: 'projects/'+this.slug+'/steps.json',
			email: this.acctEmail,
			key: this.acctKey
		})
	},
	
	updateProject: function(inRequest, inResponse) {
		this.slug = inResponse.slug,
		this.orgId = inResponse.organization_id,
		this.created = new Date(inResponse.created_at)
		
		this.setTitle(inResponse.name)
		this.setWipLimit(inResponse.wip_limit)
		this.setPrivacy(inResponse.privacy)
		this.update(new Date(inResponse.updated_at))
	},
	
	updateSteps: function(inRequest, inResponse) {
		var self = this
		
		enyo.forEach(inResponse, function(step) {
			self.steps.push(new Step(step))
		})
	}
})