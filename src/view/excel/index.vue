<template>
    <div class="atoname" :class="datas.cmpt_class || []" :style="datas.cmpt_style || {}">
        <vue-excel 
        :ref="attrDataConf.reportRef"
        :tableConfig="attrDataConf.table_config"
        :tableToolbarConf="attrDataConf.table_toolbar_data"
        :toolbarEvent="attrDataConf.toolbar_event"
        :inputTypeConfChange="inputTypeConfChange"
        :cellInputContentSet="cellInputContentSet"
        :treeProps="attrDataConf.inutTreeProps"
        :indrPprops="attrDataConf.indrPprops"
        :dimensionProp="attrDataConf.dimensionProp"
        :indicatorListProp="attrDataConf.indicatorListProp"
        :loadIndrNode="loadIndrNode"
        :indrSelectChange="indrSelectChange"
        :cellBindIndr="cellBindIndr"
        :dimensionData="dimensionData"
        :getIndrDatas="getIndrDatas"
        :treeLoadNode="treeLoadNode"
        :treeSelectedResChange="indrTreeSelectedResChange"
        :cellProps="attrDataConf.cellProps"
        :selectionRadioProp="attrDataConf.selectionRadioProp"
        :selectionCheckBoxProp="attrDataConf.selectionCheckBoxProp"
        :clearTreeSelected="clearTreeSelected"
        :confSelectionData="confSelectionData"
        :cellCalculationConfig="cellCalculationConfig"
        :confSelectionItemData="confSelectionItemData"
        @currentCellChange="currentCellChange" />
    </div>
</template>
<script>
export default {
    name:'designReport',
    props:{
        datas:{
            type:Object,
            default(){
                return {
                    attr_data_conf:{
                        reportRef:'myReport',
                        table_config:{
                            rowCount:5,//行数
                            colCount:5,//列数
                            // height:300,//设置高度，垂直方向滚动
                            // width:'1500px',//设置宽度水平方向滚动
                            fixedHeaderCount:0,//头部固定行数
                            fixedLeftCount:0,//左边列固定列数 需要设置width
                            fixedRightCount:0,//右边列固定列数 需要设置width
                            tableData:null,//初始化数据
                        },
                        table_toolbar_data:["tableSet","readOnly","tableHeader","inputArea","calcArea","quote","split","bold","italic","underLine","fontSize","split","color","backgroundColor","textLeft","textCenter","textRight","setHeight","setWidth","textTop","vercicalMiddle","textBottom","split","locked","unlock","tablesetting","upload","splitMiddle","preview","tableValidate","save","share"],
                        toolbar_event:{
                            locked(tableData){
                                console.log('锁定');
                                console.log(tableData)
                            },
                            unlock(tableData){
                                console.log('解锁');
                                console.log(tableData)
                            },
                            upload(tableData){
                                console.log('上传');
                                console.log(tableData)
                            },
                            save(tableData){
                                debugger
                                console.log(JSON.stringify(tableData));
                                console.log('保存');
                                console.log(tableData);
                            },
                            preview(tableData){
                                console.log('预览');
                                console.log(JSON.stringify(tableData));
                            },
                            share(tableData){
                                console.log('分享');
                                console.log(tableData)
                            },
                            tablesetting(tableData){
                                console.log('表格设置');
                                console.log(tableData)
                            },
                            tableValidate(tableData){
                                console.log('表格校验');
                                console.log(tableData)
                            }
                        },
                        inutTreeProps: {//输入方式为树形结构的单元格树的数据prop
                            label: (data,node)=>{
                                return data.name
                            },
                            children: 'zones',
                            isLeaf: (data,node)=>{
                                return node.level > 3
                            }
                        },
                        //维度数据显示label prop
                        dimensionProp:{label:'value'},
                        //指标列表 label prop
                        indicatorListProp:{label:'value'},
                        indrPprops:{//指标树prop
                            // label:'name',//label 支持 string 和 function
                            label:(data, node)=>{
                                return data.name
                            },
                            // children: 'zones',
                            disabled:(data,node)=>{
                                if(node.level > 3)return false;
                                else return true;
                            },
                            isLeaf: (data,node)=>{
                                if(node.level > 3)return true;
                                else return data.leaf;
                            }
                        },
                        selectionRadioProp:function(data){
                            return data.name
                        },
                        selectionCheckBoxProp:function(data){
                            return data.name
                        },
                        cellProps:{
                            radio:{
                                label:'name',
                                value:'id'
                            },
                            checkbox:{
                                label:'name',
                                value:'name'
                            },
                            tree:{
                                label:'name',
                                value:'name'
                            }
                        }
                    },
                    event_ele_conf:`{
                        created:function(){

                        },
                        mounted:function(){

                        },
                        inputTypeConfChange:function(cell,data){//输入方式改变时触发
                            if(!cell)return false;
                            let tableData = this.$refs.designReport.getTableData();
                            tableData[cell.row_index][cell.col_index].cell_render_type = data.type.label;
                            if(data.options)tableData[cell.row_index][cell.col_index].cell_options = data.options;
                            this.$refs.designReport.setTableData(tableData);
                            console.log(tableData[cell.row_index][cell.col_index],data);
                        },
                        cellInputContentSet:function(cell,data){//单元格输入内容类型改变时触发
                            if(!cell)return false;
                            let tableData = this.$refs.designReport.getTableData();
                            tableData[cell.row_index][cell.col_index].cell_content_type = data.type.label
                            this.$refs.designReport.setTableData(tableData);
                            console.log(tableData[cell.row_index][cell.col_index],data);
                        },
                        cellBindIndr:function(cell,data){//单元格绑定指标
                            if(!cell)return false;
                            let tableData = this.$refs.designReport.getTableData();
                            tableData[cell.row_index][cell.col_index].cell_indr = data;
                            console.log(tableData[cell.row_index][cell.col_index],data);
                        },
                        loadIndrNode:function(node,resolve){//指标树load方法
                            if (node.level === 0) {
                                return resolve([{id:Math.ceil(Math.random()*100000) + new Date().getTime(), name: 'region' }]);
                            }
                            if (node.level >= 1) setTimeout(() => {
                                const data = [{
                                    id:Math.ceil(Math.random()*100000) + new Date().getTime(),
                                    name: 'leaf123',
                                    leaf: true
                                }, {
                                    id:Math.ceil(Math.random()*100000) + new Date().getTime(),
                                    name: 'zone123'
                                }];
                                return resolve(data);
                            }, 500);
                        },
                        dimensionData(resolve,reject,data,node,vm){//维度数据
                            let datas =  [
                                {id:'001',value:'维度指标1'},
                                {id:'002',value:'维度指标2'},
                                {id:'003',value:'维度指标3'},
                                {id:'004',value:'维度指标4'},
                                {id:'005',value:'维度指标5'},
                                {id:'006',value:'维度指标6'},
                            ]
                            resolve(datas);
                        },
                        getIndrDatas(resolve,reject,data,vm){//获取指标数据
                            let datas =  [
                                {id:'001',value:'普通本科生因其他休退学数1'},
                                {id:'002',value:'普通本科生因其他休退学数2'},
                                {id:'003',value:'普通本科生因其他休退学数3'},
                                {id:'004',value:'普通本科生因其他休退学数4'},
                                {id:'005',value:'普通本科生因其他休退学数5'},
                                {id:'006',value:'普通本科生因其他休退学数6'},
                                {id:'007',value:'普通本科生因其他休退学数7'},
                                {id:'008',value:'普通本科生因其他休退学数8'},
                                {id:'009',value:'普通本科生因其他休退学数9'},
                                {id:'010',value:'普通本科生因其他休退学数10'},
                                {id:'011',value:'普通本科生因其他休退学数11'}
                            ]
                            resolve(datas);
                        },
                        indrSelectChange:function(data,node,refTree,self){//指标树选择改变时触发
                            //用promise是为了如果此处需要拉接口处理数据，在子组件内需要等接口数据处理完成后才能处理
                            return new Promise((resolve,reject)=>{
                                //实现单选
                                refTree.setCheckedNodes([]);
                                refTree.setCheckedNodes([data]);
                                resolve(data);
                            });
                        },
                        treeLoadNode:function(node,resolve){//输入方式为树形结构时，树的load方法
                            let cruuentCell = this.$refs.designReport.getCurrentActiveCell()
                            if(node.level == 0){
                                resolve([cruuentCell.cell_options])
                            }else{
                                window.setTimeout(()=>{
                                resolve([{id:node.data.id + '01',name:'aaaab'},{id:node.data.id + '02',name:'bbbc'}])
                                },500);
                            }
                        },
                        indrTreeSelectedResChange:function(treeVm,cellId){//树形数据结构输入方式的单元格树选中结果改变时触发
                            let selKeys = treeVm.getCheckedKeys();
                            let selDatas = treeVm.getCheckedNodes();
                            let cellValue = [];
                            selDatas.forEach(item => {
                                cellValue.push(item[this.attrDataConf.cellProps.tree.value])
                            });
                            let currentCell = this.$refs.designReport.getCurrentActiveCell();
                            let tableData = this.$refs.designReport.getTableData();
                            tableData[currentCell.row_index][currentCell.col_index].cell_value = cellValue
                            this.$set(this.$refs.designReport,'tableData',tableData);
                        },
                        clearTreeSelected:function(treeVm,cellId){//清空树形结构所选的数据
                            let tableData = this.$refs.designReport.getTableData();
                            let currentCell = this.$refs.designReport.getCurrentActiveCell();
                            tableData[currentCell.row_index][currentCell.col_index].cell_value = '';
                            this.$refs.designReport.setTableData(tableData);
                        },
                        currentCellChange:function(cell){//当前单元格变更时触发
                            console.log(cell);
                        },
                        confSelectionData:function(resolve){//输入方式选项配置
                            let data = [
                                {
                                    id:'01',
                                    name:'性别1',
                                    data:[
                                        {
                                            id:'011',
                                            name:'男性'
                                        },
                                        {
                                            id:'012',
                                            name:'女性'
                                        }
                                    ]
                                },
                                {
                                    id:'02',
                                    name:'班级',
                                    data:[
                                        {
                                            id:'021',
                                            name:'一班'
                                        },
                                        {
                                            id:'022',
                                            name:'二班'
                                        },
                                        {
                                            id:'023',
                                            name:'三班'
                                        }
                                    ]
                                }
                            ]
                            resolve(data);
                        },
                        confSelectionItemData:function(resolve,val){//输入方式为单选或多选时 根据选项类别获取选项数据
                            resolve(val.data);
                        },
                        cellCalculationConfig:function(){
                            return {
                                //与公式设计插件的attr_data_conf event_ele_conf配置一致
                                attr_data_conf:{
                                    indrProp:{
                                        // label:'name',//label 支持 string 和 function
                                        label:(data, node)=>{
                                            return data.name
                                        },
                                        // children: 'zones',
                                        disabled:(data,node)=>{
                                            if(node.level > 3)return false;
                                            else return true;
                                        },
                                        isLeaf: (data,node)=>{
                                            if(node.level > 3)return true;
                                            else return data.leaf;
                                        }
                                    },
                                    dividerOption:['筛选指标','维度选择','可选指标','已选中指标'],
                                    //维度数据显示label prop
                                    // dimensionProp:{label:'value'},
                                    dimensionProp:(data)=>{
                                        return data.value;
                                    },
                                    //指标列表 label propv  可以是function
                                    indicatorListProp:{label:'value'},
                                    //计算符号 prop  可以是function
                                    calcSymbolProp:{label:'value'},
                                    //函数 prop  可以是function
                                    existFunProp:{label:'name'}
                                },
                                event_ele_conf:{
                                    created:function(){

                                    },
                                    mounted:function(){

                                    },
                                    getSymbolData:function(resolve){//获取计算符号数据
                                        let data = [
                                            {
                                                id:'001',
                                                type:'symbol',
                                                value:"+"
                                            },
                                            {
                                                id:'002',
                                                type:'symbol',
                                                value:"-"
                                            },
                                            {
                                                id:'003',
                                                type:'symbol',
                                                value:"*"
                                            },
                                            {
                                                id:'004',
                                                type:'symbol',
                                                value:"/"
                                            },
                                            {
                                                id:'005',
                                                type:'symbol',
                                                value:"="
                                            },
                                            {
                                                id:'006',
                                                type:'symbol',
                                                value:">"
                                            },
                                            {
                                                id:'007',
                                                type:'symbol',
                                                value:">="
                                            },
                                            {
                                                id:'008',
                                                type:'symbol',
                                                value:"<"
                                            },
                                            {
                                                id:'009',
                                                type:'symbol',
                                                value:"<="
                                            },
                                            {
                                                id:'010',
                                                type:'symbol',
                                                value:"=="
                                            },
                                            {
                                                id:'011',
                                                type:'symbol',
                                                value:"!="
                                            },
                                            {
                                                id:'012',
                                                type:'symbol',
                                                value:"("
                                            },
                                            {
                                                id:'013',
                                                type:'symbol',
                                                value:")"
                                            },
                                            {
                                                id:'014',
                                                type:'symbol',
                                                value:"["
                                            },
                                            {
                                                id:'015',
                                                type:'symbol',
                                                value:"]"
                                            },
                                            {
                                                id:'016',
                                                type:'symbol',
                                                value:"in"
                                            },
                                            {
                                                id:'017',
                                                type:'symbol',
                                                value:"not in"
                                            },
                                            {
                                                id:'018',
                                                type:'symbol',
                                                value:"if"
                                            },
                                            {
                                                id:'019',
                                                type:'symbol',
                                                value:"else"
                                            },
                                            {
                                                id:'020',
                                                type:'symbol',
                                                value:"and"
                                            },
                                            {
                                                id:'021',
                                                type:'symbol',
                                                value:"or"
                                            },
                                            {
                                                id:'022',
                                                type:'symbol',
                                                value:","
                                            },
                                            {
                                                id:'023',
                                                type:'symbol',
                                                value:"delete"
                                            }
                                        ];
                                        resolve(data);
                                    },
                                    getExistFuns:function(resolve){//获取函数数据
                                        let data = [
                                            {
                                                id:'001',
                                                name:'求和',
                                                value:'COUNT'
                                            },
                                            {
                                                id:'002',
                                                name:'平均值',
                                                value:'AVERAGE'
                                            },
                                            {
                                                id:'003',
                                                name:'最大值',
                                                value:'MAX'
                                            },
                                            {
                                                id:'004',
                                                name:'最小值',
                                                value:'MIN'
                                            }
                                        ];
                                        resolve(data);
                                    },
                                    calcIndrSelectChange:function(resolve,newData,oldData){
                                        resolve(newData);
                                    },
                                    parseCalcBoardLabel:function(item){//解析当前项要在计算面板中显示的值
                                        return item.value;
                                    },
                                    completeCalculation:function(data){
                                        console.log(data);
                                        let res = '';
                                        data.forEach(item=>{
                                            item.type == 'indr' ? res += item.id : res += item.value;
                                        });
                                        console.log('your calculations is : ' + res);
                                    },
                                    loadIndrNode:function(node, resolve){
                                        if (node.level === 0) {
                                            return resolve([{id:Math.ceil(Math.random()*100000) + new Date().getTime(), name: 'region' }]);
                                        }
                                        if (node.level >= 1) setTimeout(() => {
                                            const data = [{
                                                id:Math.ceil(Math.random()*100000) + new Date().getTime(),
                                                name: 'leaf',
                                                leaf: true
                                            }, {
                                                id:Math.ceil(Math.random()*100000) + new Date().getTime(),
                                                name: 'zone'
                                            }];
                                            return resolve(data);
                                        }, 500);
                                    },
                                    indrSelectChange:function(data,node,refTree,self){//指标树选择改变时触发
                                        //用promise是为了如果此处需要拉接口处理数据，在子组件内需要等接口数据处理完成后才能处理
                                        return new Promise((resolve,reject)=>{
                                            //实现单选
                                            refTree.setCheckedNodes([]);
                                            refTree.setCheckedNodes([data]);
                                            resolve(data);
                                        });
                                    },
                                    dimensionData(resolve,reject,data,node,vm){//维度数据
                                        let datas =  [
                                            {id:'001',value:'维度指标1'},
                                            {id:'002',value:'维度指标2'},
                                            {id:'003',value:'维度指标3'},
                                            {id:'004',value:'维度指标4'},
                                            {id:'005',value:'维度指标5'},
                                            {id:'006',value:'维度指标6'},
                                        ]
                                        resolve(datas);
                                    },
                                    getIndrDatas(resolve,reject,data,vm){//获取指标数据
                                        let datas =  [
                                            {id:'001',value:'普通本科生因其他休退学数1'},
                                            {id:'002',value:'普通本科生因其他休退学数2'},
                                            {id:'003',value:'普通本科生因其他休退学数3'},
                                            {id:'004',value:'普通本科生因其他休退学数4'},
                                            {id:'005',value:'普通本科生因其他休退学数5'},
                                            {id:'006',value:'普通本科生因其他休退学数6'},
                                            {id:'007',value:'普通本科生因其他休退学数7'},
                                            {id:'008',value:'普通本科生因其他休退学数8'},
                                            {id:'009',value:'普通本科生因其他休退学数9'},
                                            {id:'010',value:'普通本科生因其他休退学数10'},
                                            {id:'011',value:'普通本科生因其他休退学数11'}
                                        ]
                                        resolve(datas);
                                    },
                                    destroyed:function(){

                                    }
                                }
                            }
                        },
                        destroyed:function(){

                        }
                    }`,
                    cmpt_class:[],
                    cmpt_style:{},
                    intf_eName_conf:[
                    ],
                    intf:{
                        
                    },
                    cross_parameter_name: '',
                }
            }
        }
    },
    data(){
        return {
            attrDataConf:{}
        }
    },
    created(){
        if(typeof(this.datas.attr_data_conf) == 'string'){
            this.attrDataConf = new Function(`return ${this.datas.attr_data_conf}`)()
        }else{
            this.attrDataConf = this.datas.attr_data_conf
        }
        let extraMethods = new Function(`return ${this.datas.event_ele_conf}`)();
        let defaultEvts = ["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed",];
        Object.keys(extraMethods).forEach(key => {
            if(!defaultEvts.includes(key)){
                this[key] = extraMethods[key].bind(this);
            }
        });
        if(extraMethods.created){
            extraMethods.created.bind(this)();
        }
    },
    mounted(){
        let extraMethods = new Function(`return ${this.datas.event_ele_conf}`)();
        if(extraMethods.mounted){
            extraMethods.mounted.bind(this)();
        }
    },
    destroyed(){
        let extraMethods = new Function(`return ${this.datas.event_ele_conf}`)();
        if(extraMethods.destroyed){
            extraMethods.destroyed.bind(this)();
        }
    }
}
</script>


<style>
</style>