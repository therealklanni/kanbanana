enyo.kind({
	name: 'Kanbanana',
	kind: 'FittableRows',
	classes: 'onyx enyo-fit',
	fit: true,
	
	acctEmail: localStorage.getItem('acctEmail'),
	acctKey: localStorage.getItem('acctKey'),
	
	projects: null,
	
	components:[
		{ kind: 'Panels', fit: true, classes: 'panels-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, components: [
			{ kind: 'FittableRows', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ tag: 'h5', content: 'Kanbanana' }
				]},
				{ fit: true, components: [
					{ kind: 'onyx.Groupbox', components: [
						{ kind: 'onyx.GroupboxHeader', content: 'account information' },
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctEmail', classes: 'stretch-input', placeHolder: 'e-mail', oninput: 'updateAcctEmail', value: localStorage.getItem('acctEmail') },
						]},
						{ kind: 'onyx.InputDecorator', components: [
							{ kind: 'onyx.Input', name: 'acctKey', classes: 'stretch-input', placeHolder: 'api key', oninput: 'updateAcctKey', value: localStorage.getItem('acctKey') },
						]}
					]}
				], rendered: function() { enyo.$.kanbanana.getProjects() }},
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Button', content: '1' }
				]}
			]},
			{ kind: 'FittableRows', fit: true, classes: 'fittable-shadow', components: [
				{ kind: 'onyx.Toolbar', components: [
					{ tag: 'h5', content: 'Your Projects' }
				]},
				{ kind: 'enyo.Scroller', fit: true, classes: 'fittable-fitting-color', components: [
					{ tag: 'div', name: 'projects', fit: true }
				]},
				{ kind: 'onyx.Toolbar', components: [
					{ kind: 'onyx.Grabber' },
					{ kind: 'onyx.Button', content: 'Refresh', ontap: 'getProjects' },
					{ kind: 'onyx.Button', content: '2' }
				]}
			]}
		]}
	],
	
	getProjects: function(inPlace, inEvent) {
		xhr = new enyo.Ajax({ url: 'proxy.php' })
		
		xhr.response(enyo.bind(this, 'updateProjects'))
		
		xhr.go({
			path: 'projects.json',
			// These values are hardcoded for testing purposes only
			email: this.acctEmail,
			key: this.acctKey
		})
	},
	
	updateProjects: function(inRequest, inResponse) {
		console.debug('response',inResponse)
		if (inResponse instanceof Array) {
			var list = new enyo.Control
			projects = this.$.projects
			
			this.projects = inResponse.map(function(e,i,a) {
				e.created_at = new Date(e.created_at)
				e.updated_at = new Date(e.updated_at)
				
				return e;
			})
			.sort(function(a,b) {
				return b.updated_at.valueOf() - a.updated_at.valueOf()
			})
			
			enyo.forEach(this.projects, function(e) {
				// Check if this Project control was already generated
				if (!!enyo.$['control_project_'+e.slug]) {
					p = enyo.$['control_project_'+e.slug]
					p.setTitle(e.name)
					p.setSlug(e.slug)
					p.setOrgId(e.organization_id)
					p.setWipLimit(e.wip_limit)
					p.setPrivacy(e.privacy)
					p.setCreated(e.created_at.toUTCString())
					p.setUpdated(e.updated_at.toUTCString())
				} else {
					list.createComponent({
						kind: Project,
						container: projects,
						name: 'project_'+e.slug,
						
						title: e.name,
						slug: e.slug,
						orgId: e.organization_id,
						wipLimit: e.wip_limit,
						privacy: e.privacy,
						created: e.created_at.toUTCString(),
						updated: e.updated_at.toUTCString()
					})
				}
			})
			
			projects.render()
		}
	},
	
	updateAcctEmail: function(inRequest) {
		localStorage.setItem('acctEmail', this.acctEmail = inRequest.eventNode.value)
	},
	
	updateAcctKey: function(inRequest) {
		localStorage.setItem('acctKey', this.acctKey = inRequest.eventNode.value)
	}
});
