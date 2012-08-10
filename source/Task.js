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
				{ name: 'title'},
				{ name: 'assignee'}
			]}
		]}
	],
	
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
		this.$.projectList.reset()
	},
	
	projectTap: function(inSender, inEvent) {
		var task = this.tasks[inEvent.index]
		console.debug(task)
	},
	
	getTasks: function() {
		//var self = this,
		//project = enyo.$.kanbanana_board.project,
		//step = enyo.filter(enyo.$.kanbanana_board.project.steps, function(e) {
		//	return self.parent.parent.stepId === e.id
		//})[0]
		//
		//var xhr = new enyo.Ajax({ url: 'proxy.php' })
		//
		//xhr.response(enyo.bind(self, 'updateTaskList', self))
		//
		//xhr.go({
		//	path: 'projects/'+project.slug+'/steps/'+step.id+'/tasks.json',
		//	email: project.acctEmail,
		//	key: project.acctKey
		//})
	},
	
	updateTaskList: function(taskList, inRequest, inResponse) {
		//console.debug(arguments)
		//var self = this
		//
		//if (inResponse instanceof Array) {
		//	enyo.forEach(enyo.map(inResponse, function(e) {
		//		return {
		//			title: e.title,
		//			assignee: e.assigned_to,
		//			note: e.note,
		//			wip: e.wip,
		//			urgent: e.urgent
		//		}
		//	}), function(task) {
		//		taskList.tasks.push(new Task(task))
		//	})
		//	
		//	taskList.$.taskList.setCount(taskList.tasks.length)
		//}
		//
		//if (this.pulled) {
		//	taskList.$.taskList.completePull()
		//} else {
		//	taskList.$.taskList.reset()
		//}
	},
	
	setupItem: function(inSender, inEvent) {
		//var i = inEvent.index
		//var task = this.tasks[i]
		//
		//this.$.title.setContent(task.title)
		//this.$.assignee.setContent(task.assignee)
	},
})