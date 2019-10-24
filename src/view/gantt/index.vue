<template>
	<div class="">
		<el-row>
			<el-col :span="18"><h1>这是一个甘特图</h1></el-col>
			<el-col :span="2"><el-button type="primary" @click="save">按钮</el-button></el-col>
			<el-col :span="2"><el-button type="primary" @click="exportPdf">导出pdf</el-button></el-col>
			<el-col :span="2"><el-button type="primary" @click="exportExcel">导出excel</el-button></el-col>
		</el-row>
		<div id="gantt_here" ></div>
		<el-dialog
			  title="提示"
			  :visible.sync="dialogVisible"
			  width="30%"
			  :before-close="handleClose"
			  >
			  <span>这是一段信息</span>
			  <span slot="footer" class="dialog-footer">
			    <el-button @click="dialogVisible = false">取 消</el-button>
			    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  </span>
	</el-dialog>
	</div>
</template>

<script>
	//import gantt from 'dhtmlx-gantt'
	//import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker.js'
	//import gantt from 'gantt'
	//import 'dhtmlx-gantt/codebase/dhtmlxgantt.css'
	
	import '@/view/gantt/dhtmlxGantt/dhtmlxgantt.css'
	import gantt from '@/view/gantt/dhtmlxGantt/dhtmlxgantt.js'
	import '@/view/gantt/dhtmlxGantt/locale_cn.js'
	
	
	export default {
		//components: { gantt },
		data () {
			return {
				projects_with_milestones: {
					"data":[
						{"id":11, "text":"Project #1", type:gantt.config.types.project, "progress": 0.6, "open": true},
				
						{"id":12, "text":"Task #1", "start_date":"2018-04-03", "duration":"5", "parent":"11", "progress": 1, "open": true},
						{"id":13, "text":"Task #2", "start_date":"2018-03-04", type:gantt.config.types.project, "parent":"11", "progress": 0.5, "open": true},
						{"id":14, "text":"Task #3", "start_date":"2018-02-04", "duration":"6", "parent":"11", "progress": 0.8, "open": true},
						{"id":15, "text":"Task #4", type:gantt.config.types.project, "parent":"11", "progress": 0.2, "open": true},
						{"id":16, "text":"Final milestone", "start_date":"2018-04-15", type:gantt.config.types.milestone, "parent":"11", "progress": 0, "open": true},
				
						{"id":17, "text":"Task #2.1", "start_date":"2018-03-04", "duration":"2", "parent":"13", "progress": 1, "open": true},
						{"id":18, "text":"Task #2.2", "start_date":"2018-10-11", "duration":"3", "parent":"13", "progress": 0.8, "open": true},
						{"id":19, "text":"Task #2.3", "start_date":"2018-09-18", "duration":"4", "parent":"13", "progress": 0.2, "open": true},
						{"id":20, "text":"Task #2.4", "start_date":"2018-05-12", "duration":"4", "parent":"13", "progress": 0, "open": true},
						{"id":21, "text":"Task #4.1", "start_date":"2018-03-21", "duration":"4", "parent":"15", "progress": 0.5, "open": true},
						{"id":22, "text":"Task #4.2", "start_date":"2018-06-17", "duration":"4", "parent":"15", "progress": 0.1, "open": true},
						{"id":23, "text":"Mediate milestone", "start_date":"2018-08-18", type:gantt.config.types.milestone, "parent":"15", "progress": 0, "open": true}
					],
					"links":[
						{"id":"10","source":"11","target":"12","type":"1"},
						{"id":"11","source":"11","target":"13","type":"1"},
						{"id":"12","source":"11","target":"14","type":"1"},
						{"id":"13","source":"11","target":"15","type":"1"},
						{"id":"14","source":"23","target":"16","type":"0"},
						{"id":"15","source":"13","target":"17","type":"1"},
						{"id":"16","source":"17","target":"18","type":"0"},
						{"id":"17","source":"18","target":"19","type":"0"},
						{"id":"18","source":"19","target":"20","type":"0"},
						{"id":"19","source":"15","target":"21","type":"2"},
						{"id":"20","source":"15","target":"22","type":"2"},
						{"id":"21","source":"15","target":"23","type":"0"}
					]
				},
				dialogVisible : false
			}
		},
		 created () {
		    let that = this;
			window.clickGridButton =function (id, action) {
				switch (action) {
					case "edit":
						gantt.showLightbox(id);
						break;
					case "add":
						//gantt.createTask(null, id);
						//that.dialogVisible = true;
						var taskId = gantt.addTask({
						    id:gantt.uid(),
						    text:"额问问问问",
						    start_date:"2013-03-21",
						    duration:28
						}, id);
						alert(JSON.stringify(taskId))
						break;
					case "delete":
						gantt.confirm({
							title: gantt.locale.labels.confirm_deleting_title,
							text: gantt.locale.labels.confirm_deleting,
							callback: function (res) {
								if (res)
									gantt.deleteTask(id);
							}
						});
						break;
				}
			}
			var colHeader = '<div class="gantt_grid_head_cell gantt_grid_head_add" onclick="gantt.createTask()"></div>',
				colContent = function (task) {
					return ('<i class="el-icon-edit" onclick="clickGridButton(' + task.id + ', \'edit\')"></i>' +
						'<i class="el-icon-circle-plus-outline" onclick="clickGridButton(' + task.parent + ', \'add\')"></i>' +
						'<i class="el-icon-delete" onclick="clickGridButton(' + task.id + ', \'delete\')"></i>');
				};
			gantt.config.columns = [
				{name: "text", tree: true, width: 200, resize: true},
				{name: "start_date", align: "center", resize: true},
				{name: "duration", align: "center"},
				{
					name: "buttons",
					label: colHeader,
					width: 75,
					template: colContent
				}
			];
			gantt.config.layout = {
					css: "gantt_container",
					rows: [
						{
							cols: [
								  {view: "grid", id: "grid",scrollY:"scrollVer"},
						          {resizer: true, width: 1},
						          {view: "timeline", id: "timeline", scrollX:"scrollHor", scrollY:"scrollVer"},
						          {view: "scrollbar", scroll: "y", id:"scrollVer"},
						          {view: "scrollbar", scroll: "x", id: "scrollHor", height: 20}
							]
			
						}
						
					]
				};
			gantt.config.scale_unit = "month";
			gantt.config.date_scale = "%F, %Y";
			gantt.config.scale_height = 50;
			gantt.config.subscales = [
				{unit: "day", step: 1, date: "%j, %D"}
			];
			gantt.config.date_grid = "%Y-%m-%d";
			gantt.config.date_format = "%Y-%m-%d";
			gantt.config.autosize = "xy";  
			
			gantt.config.sort = true;
			this.$nextTick(function (){
				gantt.init("gantt_here");
				gantt.parse(this.projects_with_milestones);
			})
		  },
		  methods: {
		  	handleClose(done) {
		        this.$confirm('确认关闭？')
		          .then(_ => {
		            done();
		          })
		          .catch(_ => {});
		      },
			  save(){
			  	alert(JSON.stringify(gantt.getTaskByTime()));
			  	console.log(JSON.stringify(gantt.getTaskByTime()))
			  },
			  exportPdf(){
			  	gantt.exportToPDF()
			  },
			  exportExcel(){
			  	gantt.exportToExcel({
					    name:"document.xlsx", 
					    columns:[
					        { id:"text",  header:"Title", width:150 },
					        { id:"start_date",  header:"Start date", width:250, type:"date" }
					    ],
					    server:"https://myapp.com/myexport/gantt",
					    visual:true,
					    cellColors:true
					});
			  }
		  }
	}
	
	
	
</script>

<style scoped="scoped">
	html, body {
			height: 100%;
			padding: 0px;
			margin: 0px;
			overflow: hidden;
		}


</style>