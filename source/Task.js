enyo.kind({
	name: 'Task',
	kind: 'Component',
	
	published: {
		title: '',
		assignee: '',
		note: '',
		wip: false,
		urgent: false,
	}
})

enyo.kind({
	name: 'TaskList',
	kind: 'FittableRows',
	
	tasks: [],
	
	published: {
		title: '',
		assignee: '',
		note: '',
		wip: false,
		urgent: false
	},
	
	components: [
		{ kind: 'PulldownList', name: 'taskList', fit: true, classes: 'list-pulldown-list', onSetupItem: 'setupItem', onPullRelease: 'pullRelease', onPullComplete: 'pullComplete', components: [
			{ ontap: 'taskTap', classes: 'list-pulldown-item enyo-border-box', components: [
				{ name: 'title' },
				{ name: 'assignee' }
			]}
		]}
	],

	handlers: {
		'onRefreshList': 'refreshList'
	},
	
	create: function() {
		this.inherited(arguments)
		this.getTasks()
	},
	
	rendered: function() {
		this.inherited(arguments)
	},
	
	pullRelease: function() {
		this.pulled = true
		this.getTasks()
	},
	
	pullComplete: function () {
		this.pulled = false
		this.$.taskList.reset()
	},
	
	taskTap: function(inSender, inEvent) {
		var task = this.tasks[inEvent.index]
		console.debug(task)
	},

	refreshList: function() {
		this.pullRelease()
	},
	
	getTasks: function() {
		var step = this.parent.parent
		
		new enyo.Ajax({ url: 'tasks.json' }).response(enyo.bind(this, 'updateTaskList', this)).go()
	},
	
	updateTaskList: function(taskList, inRequest, inResponse) {
		var self = this
		taskList.tasks = []
		
		if (enyo.isArray(inResponse)) {
			enyo.forEach(enyo.map(inResponse, function(e) {
				return {
					title: e.title,
					assignee: e.assigned_to,
					note: e.note,
					wip: e.wip,
					urgent: e.urgent
				}
			}), function(task) {
				taskList.tasks.push(new Task(task))
			})
			
			taskList.$.taskList.setCount(taskList.tasks.length)
		}
		
		if (this.pulled) {
			taskList.$.taskList.completePull()
		} else {
			taskList.$.taskList.reset()
		}
	},
	
	setupItem: function(inSender, inEvent) {
		var task = this.tasks[inEvent.index]
		
		this.$.title.setContent(task.title)
		this.$.assignee.setContent(task.assignee)
	},
})