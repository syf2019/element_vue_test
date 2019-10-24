<template>
    <div class="atoname" :class="datas.cmpt_class || []" :style="datas.cmpt_style || {}">
        <edit-table 
        ref="fillReport"
        :tableConfig="attrDataConf.table_config"
        :treeLoadNode="fillTreeLoadNode"
        :cellValidate="cellValidate"
        :treeProps="attrDataConf.inutTreeProps"
        :treeSelectedResChange="fillTreeSelectedResChange"
        :clearTreeSelected="clearFillTeeSelected"
        :cellProps="attrDataConf.cellProps"
        @save="saveTable"
        @reset="resetTable">
            <div class="reportTitle" slot="title" v-html="attrDataConf.table_title"></div>
        </edit-table>
    </div>
</template>

<script>
export default {
    name:'FillReport',
    props:{
        datas:{
            type:Object,
            default(){
                return {
                    attr_data_conf:{
                        table_config:{
                            rowCount:5,//行数
                            colCount:5,//列数
                            // height:300,//设置高度，垂直方向滚动
                            // width:'1500px',//设置宽度水平方向滚动
                            fixedHeaderCount:0,//头部固定行数
                            fixedLeftCount:0,//左边列固定列数 需要设置width
                            fixedRightCount:0,//右边列固定列数 需要设置width
                            tableData:[[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-row-header","cell_id":"78afc06cc2b244b58a1f4e008ae5cd0e","cell_style":{"width":"60px","background":"#fff"}},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-header","cell_id":"bb02cbbc901c4242b6b71aa62a81e3c6","cell_style":{"width":"200px"}},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-header","cell_id":"08e9cbb3240345ec9765fab138d0d878","cell_style":{"width":"200px"}},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-header","cell_id":"fc851e751bfe444f98197aa96949ea58","cell_style":{"width":"200px"}},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-header","cell_id":"7404782ce4eb476eaf59bca92c12f318","cell_style":{"width":"200px"}},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-col-header","cell_id":"69f9871054654c238e1a321918fad5db","cell_style":{"width":"200px"}}],[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-row-header","cell_id":"d8ccf6771aa149a49cee3cc808f78b34","cell_style":{"width":"60px"}},{"cell_value":"姓名","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"685edbf7963149519bc6bb19b82c7149","cell_style":{"width":"200px","backgroundColor":"#5A5A5A","textAlign":"center","fontWeight":"bold","color":"rgba(0, 255, 238, 1)"},"row_index":1,"col_index":1,"area_type":"readOnly"},{"cell_value":"性别","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"d06ec70129f9494f88a0cc2cd36df9ed","cell_style":{"width":"200px","backgroundColor":"#5A5A5A","textAlign":"center","fontWeight":"bold","color":"rgba(0, 255, 238, 1)"},"area_type":"readOnly","row_index":1,"col_index":2},{"cell_value":"年龄","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"07773687e40e4e418d91f1f29ec43185","cell_style":{"width":"200px","backgroundColor":"#5A5A5A","textAlign":"center","fontWeight":"bold","color":"rgba(0, 255, 238, 1)"},"area_type":"readOnly","row_index":1,"col_index":3},{"cell_value":"籍贯","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"048e5fcdf8e64ef48004b798d918845b","cell_style":{"width":"200px","backgroundColor":"#5A5A5A","textAlign":"center","fontWeight":"bold","color":"rgba(0, 255, 238, 1)"},"area_type":"readOnly","row_index":1,"col_index":4},{"cell_value":"学历","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"d8789a6a321a4c76aaf44f4caec8999d","cell_style":{"width":"200px","backgroundColor":"#5A5A5A","textAlign":"center","fontWeight":"bold","color":"rgba(0, 255, 238, 1)"},"area_type":"readOnly","row_index":1,"col_index":5}],[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-row-header","cell_id":"8a1f766540a84a8f8075f7a3d251a705","cell_style":{"width":"60px"}},{"cell_value":"固定值","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"fixed","cell_type":"cell","cell_id":"419a305e7b7f4e49b6e687483209f1f5","cell_style":{"width":"200px"},"row_index":2,"col_index":1},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"radio","cell_type":"cell","cell_id":"2c56456d8c404d98a6ce0f91090c9631","cell_style":{"width":"200px"},"row_index":2,"col_index":2,"cell_options":[{"id":"011","name":"男性"},{"id":"012","name":"女性"}]},{"cell_value":"18","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"d500740a069e462ba60e5d9279debd06","cell_style":{"width":"200px"},"row_index":2,"col_index":3},{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"tree","cell_type":"cell","cell_id":"a3c09872b6994763a2829b8f352285ad","cell_style":{"width":"200px"},"row_index":2,"col_index":4,"cell_options":{"id":"001","name":"全国"}},{"cell_value":[],"cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"checkbox","cell_type":"cell","cell_id":"fcc3d8ababa3454a903e998dc200dd50","cell_style":{"width":"200px"},"row_index":2,"col_index":5,"cell_options":[{"id":"021","name":"一班"},{"id":"022","name":"二班"},{"id":"023","name":"三班"}]}],[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-row-header","cell_id":"6312a5c6620246b7a0b5eb252f47130a","cell_style":{"width":"60px","height":"44px"}},{"cell_value":"粗体","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"36edd7de109944eeb3a6d8f2235469ff","cell_style":{"width":"200px","backgroundColor":"rgba(32, 154, 241, 1)","fontWeight":"bold","height":"44px"},"row_index":3,"col_index":1},{"cell_value":"斜体","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"7ffb518d586748738a5174b5f0e69798","cell_style":{"width":"200px","backgroundColor":"rgba(32, 154, 241, 1)","fontStyle":"italic"},"row_index":3,"col_index":2},{"cell_value":"下划线","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"9a8c54a2b06a47b4836ddf5d236958e4","cell_style":{"width":"200px","backgroundColor":"rgba(32, 154, 241, 1)","textDecoration":"underline"},"row_index":3,"col_index":3},{"cell_value":"字体大小","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"d87f99473ab54e05acf7fb429046a9f1","cell_style":{"width":"200px","backgroundColor":"rgba(32, 154, 241, 1)","fontSize":"22px"},"row_index":3,"col_index":4},{"cell_value":"字体颜色","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"ebefc4d268d940858798adae20d14249","cell_style":{"width":"200px","backgroundColor":"rgba(32, 154, 241, 1)","color":"rgba(195, 0, 255, 1)","height":"44px"},"row_index":3,"col_index":5}],[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-row-header","cell_id":"a38a0a356ae344c79b96cb513529f3c0","cell_style":{"width":"60px","height":"50px"}},{"cell_value":"左上对齐","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"c82a83b06c734d37a568bd8b514493db","cell_style":{"width":"200px","height":"50px"},"row_index":4,"col_index":1},{"cell_value":"左中对齐","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"06f8697866484ec4af69fa9ed7336f77","cell_style":{"width":"200px"},"row_index":4,"col_index":2},{"cell_value":"左下对齐","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"7080821b1d21498a81c8368477e0b50b","cell_style":{"width":"200px","verticalAlign":"bottom"},"row_index":4,"col_index":3},{"cell_value":"居中","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"c1027c8bd272496296ba2c1566f577ed","cell_style":{"width":"200px","textAlign":"center"},"row_index":4,"col_index":4},{"cell_value":"右对齐","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"e8f58cc8fd694724b25bcb3603678dee","cell_style":{"width":"200px","height":"50px","textAlign":"right"},"row_index":4,"col_index":5}],[{"cell_value":"","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell-row-header","cell_id":"d7efa541bbba4d0b886a91008c21ca7f","cell_style":{"width":"60px","height":"52px"}},{"cell_value":"呼啦啦","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"9bed587d6f794bdf9664860ea3b97ff6","cell_style":{"width":"200px","backgroundColor":"#DBE5F1","height":"52px"},"row_index":5,"col_index":1,"area_type":"quote"},{"cell_value":"哇哈哈","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"1dd2dae5891f4e72bd286e0f70617d44","cell_style":{"width":"200px","backgroundColor":"#DBE5F1"},"row_index":5,"col_index":2,"area_type":"quote"},{"cell_value":"哎呀呀","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"5061937a862341f7b10c1be92b0143bc","cell_style":{"width":"200px","backgroundColor":"#DBE5F1"},"area_type":"quote","row_index":5,"col_index":3},{"cell_value":"咔嚓嚓","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"8849ebc198b349d8aa75d7f975cdea8e","cell_style":{"width":"200px","backgroundColor":"#DBE5F1"},"row_index":5,"col_index":4,"area_type":"quote"},{"cell_value":"过家家","cell_rowspan":1,"cell_colspan":1,"cell_area_type":"inputArea","cell_render_type":"text","cell_type":"cell","cell_id":"47e1a6cfe8fe4dd7b2e441313c9475ab","cell_style":{"width":"200px","backgroundColor":"#DBE5F1","height":"52px"},"area_type":"quote","row_index":5,"col_index":5}]]
                        },
                        table_title:'<div style="padding:15px 0;font-weight:bold;">填报测试表格1</div>',
                        inutTreeProps: {//输入方式为树形结构的单元格树的数据prop
                            label: (data,node)=>{
                                return data.name
                            },
                            children: 'zones',
                            isLeaf: (data,node)=>{
                                return node.level > 3
                            }
                        },
                        cellProps:{//单元格prop
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
                        fillTreeLoadNode:function(node,resolve){//树形结构load方法
                            if(node.level == 0){
                                resolve([{id:'001',name:'全国'}])
                            }else{
                                window.setTimeout(()=>{
                                    resolve([{id:node.data.id + '01',name:'aaaa'},{id:node.data.id + '02',name:'bbb'}])
                                },500);
                            }
                        },
                        fillTreeSelectedResChange:function(treeVm,cellId){//树形结构选中结果回调
                            let selKeys = treeVm.getCheckedKeys();
                            let selDatas = treeVm.getCheckedNodes();
                            let cellValue = [];
                            selDatas.forEach(item => {
                                cellValue.push(item[this.attrDataConf.cellProps.tree.value])
                            });
                            let currentCell = this.$refs.fillReport.getCurrentActiveCell();
                            let tableData = this.$refs.fillReport.getTableData();
                            tableData[currentCell.row_index][currentCell.col_index].cell_value = cellValue.join(',');
                            this.$set(this.editTableDataConf,'tableData',tableData);
                        },
                        clearFillTeeSelected:function(treeVm,cellId){//树形结构清除选中结果回调
                            let tableData = this.$refs.fillReport.getTableData();
                            let currentCell = this.$refs.fillReport.getCurrentActiveCell();
                            tableData[currentCell.row_index][currentCell.col_index].cell_value = '';
                            this.$set(this.editTableDataConf,'tableData',tableData);
                        },
                        saveTable:function(data){//保存
                            console.log(JSON.stringify(data));
                            console.log('保存');
                        },
                        resetTable:function(data){//重置已填写单元格内容
                            console.log(data)
                        },
                        cellValidate:function(resolve,cellData){
                            //单元格数据校验处理
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
        return {attrDataConf:{}}
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