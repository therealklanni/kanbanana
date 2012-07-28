enyo.kind({
	name: "App",
	kind: enyo.FittableRows,
	classes: 'onyx',
	fit: true,
	
	components:[
		{
			kind: 'onyx.Groupbox',
			components: [
				{
					kind: 'onyx.GroupboxHeader',
					content: 'your information'
				},
				{
					kind: 'onyx.InputDecorator',
					components: [
						{ kind: 'onyx.Input', name: 'email', placeHolder: 'e-mail' },
					]
				},
				{
					kind: 'onyx.InputDecorator',
					components: [
						{ kind: 'onyx.Input', name: 'key', placeHolder: 'api key' },
					]
				}
			]
		},
		{ kind: 'onyx.Button', content: 'Get your projects', ontap: "getYourProjects" },
		{
			kind: 'enyo.Scroller',
			fit: true,
			components: [
				{ tag: 'div', name: 'projects' }
			]
		}
	],
	
	getYourProjects: function(inPlace, inEvent) {
		xhr = new enyo.Ajax({ url: 'proxy.php' })
		
		xhr.response(enyo.bind(this, 'updateProjects'))
		
		xhr.go({
			path: 'projects.json',
			// These values are hardcoded for testing purposes only
			email: 'klanni@newanglemedia.com',
			key: 'e7a2a07906efc47f0c3dbd7017c3c49c184d1269'
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
	}
});
