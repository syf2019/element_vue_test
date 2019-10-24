<template>
     <div class="" :key="menuKey">
     	<el-row>
     		<el-col :span="6">
     			<select-page  :dataSource="ppData" :defaultVals="defalut1" ref="selectPage1" @selectInfo="sysVal1" :multiple="false" >
	 			</select-page>
     		</el-col>
     		<el-col :span="6">单选选中的值：<span>{{ad}}</span></el-col>
     		<el-col :span="6">
     			<!--<select-page  :dataSource="dataSource" :defaultVals="defalut2" ref="selectPage2" @selectInfo="sysVal2" :multiple="true" >
	 			</select-page>-->
     		</el-col>
     		<el-col :span="6">多选选中的值：<span>{{cd}}</span></el-col>
     	</el-row>
     	 
	 	
                    <el-table
                            :data="rowList"
                            style="width: 100%"
                            border
                            :span-method="cellMerge"
                           
                    >
                        <el-table-column label="所属单位"  prop="departmentName" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="场所" prop="stationName" :key="Math.random()"></el-table-column>
                        <el-table-column label="区域类型" prop="categoryName" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="区域名称" prop="locationName" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="区域面积（㎡）" prop="dimension" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="器材类型"  prop="eqTypeName" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="规格名称" prop="eqSpecName" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="配置数量" prop="number" :key="Math.random()">
                        </el-table-column>
                        <el-table-column label="消防通道数量" prop="fireEscapeNum" :key="Math.random()"></el-table-column>
                        <el-table-column label="摄像头数量" prop="cameraNum" :key="Math.random()"></el-table-column>
                        <el-table-column label="保安数量" prop="securityGuardNum" :key="Math.random()"></el-table-column>
                    </el-table>
                </div>
      </template>

<script>
	import selectPage from '@/components/selectPage';
	export default {
		components: { selectPage },
		data () {
			return {
				rowList: [],
				ad : '',
				cd:'',
				defalut1:'',
				defalut2:['84','14'],
				ppData:[],
				dataSource: [
					{id:'1',name:'jkj'},
					{id:'2',name:'awqrw'},
					{id:'3',name:'jk阿萨法j'},
					{id:'4',name:'爱的色'},
					{id:'5',name:'何必当初'},
					{id:'6',name:'钉钉'},
					{id:'7',name:'十点多'},
					{id:'8',name:'上的人'},
					{id:'9',name:'四个认同'},
					{id:'11',name:'山东人同意'},
					{id:'12',name:'色温热'},
					{id:'13',name:'阿达'},
					{id:'14',name:'对方一个'},
					{id:'15',name:'色聚'},
					{id:'21',name:'爱上单位额问问'},
					{id:'32',name:'阿萨德'},
					{id:'42',name:'十大儿童'},
					{id:'52',name:'可研报告'},
					{id:'63',name:'大是大非'},
					{id:'71',name:'其二医院'},
					{id:'84',name:'团年饭'},
					{id:'97',name:'欧阳一道'}
				
				
				],
                menuKey:Math.random(),
                mergeCols: [
								{'cols':'concatOne','mergeCount':'spanOneArr','filed':'departmentName','index':1},
								{'cols':'concatTwo','mergeCount':'spanTwoArr','filed':'stationName','index':2},
								{'cols':'concatThree','mergeCount':'spanThreeArr','filed':'categoryName','index':3},
								{'cols':'concatFour','mergeCount':'spanFourArr','filed':'locationName','index':4},
								{'cols':'concatFive','mergeCount':'spanFiveArr','filed':'dimension','index':5},
								{'cols':'concatSix','mergeCount':'spanSixArr','filed':'eqTypeName','index':6},
							]
                
			}
		},
		 created () {
		     let data = {"pageNum":1,"pageSize":10,"published":true,"records":[{"cameraNum":0,"categoryId":"c94576043751a0583591a40cfd3cef80","categoryName":"其他","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":75.0,"eqSpecName":"悬挂式干粉自动灭火器6KG","eqTypeName":"灭火器","fireEscapeNum":0,"locationId":"09c61e318e7a11e99d80fa163e66dc10","locationName":"办公区","number":1,"securityGuardNum":0,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"},{"cameraNum":0,"categoryId":"c94576043751a0583591a40cfd3cef80","categoryName":"其他","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":75.0,"eqSpecName":"手提式干粉灭火器4KG","eqTypeName":"灭火器","fireEscapeNum":0,"locationId":"09c61e318e7a11e99d80fa163e66dc10","locationName":"办公区","number":2,"securityGuardNum":0,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"},{"cameraNum":1,"categoryId":"18f2ac7cf3393cb68dc0323732ee6b2d","categoryName":"充电站","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":20.0,"eqSpecName":"消防栓（不带柜体）","eqTypeName":"消防栓","fireEscapeNum":1,"locationId":"0acb63ad00d44460b0a92e29ba0f0f88","locationName":"测试","number":200,"securityGuardNum":1,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"},{"cameraNum":1,"categoryId":"18f2ac7cf3393cb68dc0323732ee6b2d","categoryName":"充电站","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":20.0,"eqSpecName":"消防栓（带柜体）","eqTypeName":"消防栓","fireEscapeNum":1,"locationId":"0acb63ad00d44460b0a92e29ba0f0f88","locationName":"测试","number":200,"securityGuardNum":1,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"},{"cameraNum":1,"categoryId":"18f2ac7cf3393cb68dc0323732ee6b2d","categoryName":"充电站","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":20.0,"eqSpecName":"悬挂式干粉自动灭火器6KG","eqTypeName":"灭火器","fireEscapeNum":1,"locationId":"0acb63ad00d44460b0a92e29ba0f0f88","locationName":"测试","number":1,"securityGuardNum":1,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"},{"cameraNum":1,"categoryId":"18f2ac7cf3393cb68dc0323732ee6b2d","categoryName":"充电站","chargeEmpCode":"002360","chargeEmpName":"臧传森","departmentId":"06edcd0f5dba3f857aaec85c010de67b","departmentName":"梅林车队","dimension":20.0,"eqSpecName":"推车式干粉灭火器30KG","eqTypeName":"灭火器","fireEscapeNum":1,"locationId":"0acb63ad00d44460b0a92e29ba0f0f88","locationName":"测试","number":199,"securityGuardNum":1,"stationId":"ec6ed4e08e7611e99d80fa163e66dc10","stationName":"下梅林总站"}],"total":6,"totalPageNum":1};
			 this.rowList = data.records;
			 this.getSpanArr();
			 
		  },
		 watch:{
		 	//强制刷新table
            rowList(){
                ++this.menuKey
            }
        },
        mounted(){
        	let that = this;
        	
        		console.log(111)
        		setTimeout(()=>{
        			that.ppData = that.dataSource;
        			that.defalut1 = '14';
        		},5000);
			 	
			 	
			 	//console.log(JSON.stringify(that.ppData))
			
        },
		  methods: {
		  	sysVal1(val){
		  		this.ad = '';
		  		this.ad = JSON.stringify(val);
		  	},
		  	sysVal2(val){
		  		this.cd = '';
		  		this.cd = JSON.stringify(val);
		  	},
		  	initMergeCols(){
		  		this.mergeCols.forEach((item)=>{
                	this[item.cols] = 0;
                	this[item.mergeCount] = [];
                });
		  	},
		    getSpanArr() {
		    			let tableData = this.rowList;
		         		this.initMergeCols();
		                tableData.forEach((item,index)=>{
		                    if(index === 0){
		                        //直接先给数组push进一个1，表示自己先占一行
		                        this.mergeCols.forEach((mItem)=>{
		                        	this[mItem.mergeCount].push(1);
		                        });
		                    }else{
		                        //需合并相同内容的判断条件
		                        this.mergeCols.forEach((mItem)=>{
		                        	if(item[mItem.filed] === tableData[index - 1][mItem.filed]){ 
			                            this[mItem.mergeCount][this[mItem.cols]] += 1;
			                            this[mItem.mergeCount].push(0);
			                        }else{
			                            this[mItem.mergeCount].push(1);
			                            this[mItem.cols] = index;
			                        };
		                        });
		                    }
		                });
		            },
		            cellMerge({ row, column, rowIndex, columnIndex }) {
		            	let _row = 0;
		            	let _col = 0;
		            	
		            	
		            	
		            	/*this.mergeCols.forEach((mItem)=>{
	                        if(columnIndex === mItem.index ) {
			                     _row = this[mItem.mergeCount][rowIndex];
			                     _col = _row > 0 ? 1 : 0;
			                    break;
			                }
		                 });*/
		            	
		            	
		            	
		            	
		                if(columnIndex === 0 ) {
		                    const _row = this.spanOneArr[rowIndex];
		                    const _col = _row > 0 ? 1 : 0;
		                    return {
		                        rowspan: _row,
		                        colspan: _col
		                    };
		                }
		                if(columnIndex === 1) {
		                    const _row = this.spanTwoArr[rowIndex];
		                    const _col = _row > 0 ? 1 : 0;
		                    return {
		                        rowspan: _row,
		                        colspan: _col
		                    };
		                }
		                if(columnIndex === 2) {
		                    const _row = this.spanThreeArr[rowIndex];
		                    const _col = _row > 0 ? 1 : 0;
		                    return {
		                        rowspan: _row,
		                        colspan: _col
		                    };
		                }
		                if(columnIndex === 3) {
		                    const _row = this.spanFourArr[rowIndex];
		                    const _col = _row > 0 ? 1 : 0;
		                    return {
		                        rowspan: _row,
		                        colspan: _col
		                    };
		                }
		                if(columnIndex === 4) {
		                    const _row = this.spanFiveArr[rowIndex];
		                    const _col = _row > 0 ? 1 : 0;
		                    return {
		                        rowspan: _row,
		                        colspan: _col
		                    };
		                }
		                 if(columnIndex === 5) {
		                   const _row = this.spanSixArr[rowIndex];
		                   const _col = _row > 0 ? 1 : 0;
		                   return {
		                       rowspan: _row,
		                       colspan: _col
		                   };
		               }
		            }
		  }
	}
</script>
<style>
</style>