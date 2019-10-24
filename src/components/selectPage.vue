<template>
    <div>
        <el-select v-model="checkedValue" filterable :filter-method="selectChange"
                   :loading="loading"
                   :placeholder="placeholder"
                   clearable
                   :size="size"
                   :multiple="multiple"
                   collapse-tags
                   :disabled="disabled">
            <el-option
                    v-for="item in options"
                    :key="item[keyFiled]"
                    :label="item[valueFiled]"
                    remote
                    :value="item[keyFiled]"
                    placeholder="请输入">
            </el-option>
            <div style="bottom: 0;width: 100%;background: #fff">
                <el-pagination
                        small
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="tableList.current"
                        :page-sizes="tableList.sizes"
                        :page-size="tableList.size"
                        layout="prev, pager,next,total"
                        :total="tableList.total">
                </el-pagination>

            </div>
        </el-select>
    </div>
</template>
<script>
    import * as api from '@/api/index'
    import axios from 'axios'

    export default {
        name: 'selectPage',
        props: {
            dataSource:{	//传过来的数据源
            	type: Array,
                default: []
            },	//数据源
            placeholder: { // 提示
                type: String,
                default: '请选择'
            },
            size: { //下拉框大小
                type: String,
                default: 'small'
            },
            disabled: { //是否禁用
                type: Boolean,
                default: false
            },
            multiple:{//是否多选
            	type: Boolean,
                default: false
            },
            defaultVals:{//默认值
            	//type: [Array,Object],
                default: ()=>{}
            },
            keyFiled:{//自定义key字段
            	type: String,
                default: 'id'
            },
            valueFiled:{//自定义value字段
            	type: String,
                default: 'name'
            }
        },
        data() {
            return {
                loading: false,
                tableList: {
                    current: 1,
                    total: 0,
                    size: 5,
                    sizes: [5, 10, 20, 30, 40, 50]
                }, // 分页的一些参数
                options: [], // 数据集
                checkedValue: [],  //选中的值
                inputVal:''		//输入的值
            }
        },
        created(){
        	this.options=this.dataSource;//最开始先让select遍历
        },
        watch: {
        	//监听数据源数据变化
        	dataSource(){
        		console.log('收到')
        		this.loading = true;
        		this.search()
        	},
        	//监听后来赋的默认值
        	defaultVals(val){
        		console.log('默认值变化：'+val);
        		let that = this;
        		this.$nextTick(()=>{
        			console.log('渲染完啦')
        			//that.search()
        			//that.checkedValue = val; 
        		})
        		
        		this.loading = true;
        		this.search();
        	},
            //监听选中的值的变化
            checkedValue(val) {
            	console.log('选种值变化：'+val)
                this.tableList.current = 1 // 此处是为了 防止 current 保持上一次选择的样子
                //单选
                if(!this.multiple){
                	if (this.options) {
	                    for (let option of this.dataSource) {
	                        if (this.checkedValue === option[this.keyFiled]) {
	                            this.$emit('selectInfo', option) //将值返回给父页面
	                            break;
	                        }
	                    }
	                }
                	if (!this.checkedValue) {
	                    this.$emit('selectInfo', '') //将值返回给父页面
	                    this.handleCurrentChange(1)
	              	}
	             //多选   
                }else{
                	if (this.options) {
                		let tempArray = [];
	                    for (let option of this.dataSource) {
	                        if (this.checkedValue.indexOf(option[this.keyFiled]) != -1) {
	                            tempArray.push(option);
	                        }
	                    }
	                    this.$emit('selectInfo', tempArray) //将值返回给父页面
	                }
                	if (this.checkedValue.length <1) {
	                    this.$emit('selectInfo', []) //将值返回给父页面
	                    this.handleCurrentChange(1)
	              }
                }
            }
        },
        mounted() {
        	//this.checkedValue = this.defaultVals; //应对直接赋值的情况
        	this.loading = true;
            let that = this;
        		this.$nextTick(()=>{
        			console.log('渲染完啦')
        			console.log(JSON.stringify(that.options))
        			that.checkedValue = this.defaultVals;
        			that.search()
        			
        			 
        		})
        },
        activated() {
            this.search()
        },
        methods: {
            selectChange(val) {
                var This = this
                This.inputVal = val;
                // 如果存在上一次请求，则取消上一次请求
                if (This.cancel) {
                    This.cancel()
                }
                if (This.timer) {
                    clearTimeout(This.timer)
                }
                this.loading = true
               this.search()
            },
            handleSizeChange(val) {
                this.tableList.size = val
                setTimeout(() => {
                    this.search()
                }, 10)
            },
            handleCurrentChange(val) {
                this.tableList.current = val
                setTimeout(() => {
                    this.search()
                }, 10)
            },
            search() {
                var This = this
                var val = This.inputVal;
                This.options = This.dataSource;
                This.checkedValue = This.defaultVals; 
                This.options = This.options.filter((item) => {
					     return item[This.valueFiled].indexOf(val) != -1;
					})
                this.loading = false;
	            This.tableList.total = This.options.length;
                This.options = This.options.slice((This.tableList.current-1)*This.tableList.size,This.tableList.current*This.tableList.size);
            },
        }
    }
</script>