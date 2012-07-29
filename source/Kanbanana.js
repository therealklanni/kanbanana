enyo.kind({
	name: "Kanbanana",
	kind: 'FittableRows',
	classes: 'onyx enyo-fit',
	fit: true,
	
	acctEmail: localStorage.getItem('acctEmail'),
	acctKey: localStorage.getItem('acctKey'),
	
	components:[
		{ kind: 'Panels', fit: true, classes: 'panels-sliding-panels', arrangerKind: 'CollapsingArranger', wrap: false, components: [
			{ kind: "FittableRows", components: [
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
				]},
				{ kind: "onyx.Toolbar", components: [
					{ kind: "onyx.Button", content: "1" }
				]}
			]},
			{ kind: "FittableRows", fit: true, classes: "fittable-shadow", components: [
				{ kind: 'enyo.Scroller', fit: true, classes: "fittable-fitting-color", components: [
					{ tag: 'div', name: 'projects', fit: true }
				]},
				{ kind: "onyx.Toolbar", components: [
					{ kind: 'onyx.Button', content: 'Refresh', ontap: "getProjects" },
					{ kind: "onyx.Button", content: "2" }
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
			list = new enyo.Control
			projects = this.$.projects
			
			enyo.forEach(inResponse, function(e,i,a) {
				list.createComponent({
					kind: Project,
					container: projects,
					
					title: e.name,
					slug: e.slug,
					orgId: e.organization_id,
					wipLimit: e.wip_limit,
					privacy: e.privacy,
					created: e.created,
					updated: e.updated
				})
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
