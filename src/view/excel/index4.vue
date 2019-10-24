<template>
    <div class="atoname" :class="datas.cmpt_class || []" :style="datas.cmpt_style || {}">
        <indr-calculation 
        @complete="completeCalculation"
        :getIndrDatas="getIndrDatas"
        :indrSelectChange="indrSelectChange"
        :dimensionData="dimensionData"
        :loadIndrNode="loadIndrNode"
        :symbolData="getSymbolData"
        :existFuns="getExistFuns"
        :calcIndrSelectChange="calcIndrSelectChange"
        :parseCalcBoardLabel="parseCalcBoardLabel"
        :dimensionProp="attrDataConf.dimensionProp"
        :dividerOption="attrDataConf.dividerOption"
        :indicatorListProp="attrDataConf.indicatorListProp"
        :calcSymbolProp="attrDataConf.calcSymbolProp"
        :existFunProp="attrDataConf.existFunProp"
        :prop="attrDataConf.indrProp" />
    </div>
</template>

<script>
export default {
    props:{
        datas:{
            type:Object,
            default(){
                return {
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
                    event_ele_conf:`{
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