<template>
 <div>
  TreeTable
  <el-table :data="list" :row-style="tableRowStyle" border>
   <el-table-column type="selection" width="55"></el-table-column>
   <el-table-column prop="id" label="ID" width="180">
    <template slot-scope="scope">
     <span class="collapse"
        :class="collapseClass(scope.row)"
        :style="tableRowPaddingStyle(scope.row)"
        @click="handleCollapseClick(scope.row)">
     </span>
     <span>{{ scope.row.id }}</span>
    </template>
   </el-table-column>
   <el-table-column prop="name" label="NAME"></el-table-column>
  </el-table>
 </div>
</template>

<script>
	import {Component, Vue} from 'vue-property-decorator'
	
	// 引入两个封装好的工具方法
 // import { arrayToTree } from '@/utils/array.js'
  //import { ergodicTree } from '@/utils/tree.js'
	

export default {
	//components: { Component, Vue },
	data () {
		return {
			list: [],
			tree: []
		}
	},
    created() {
      // 准备一组含有父子级关系的一维数组方便示例测试
      // 在实际项目应用中，理应通过后端接口返回
      let _list = [
        {
          id: 'a',
          pid: '',
          name: '部门a',
          children: []
        },
        {
          id: 'a1',
          pid: 'a',
          name: '子部门a1',
          children: []
        },
        {
          id: 'a2',
          pid: 'a',
          name: '子部门a2',
          children: []
        },
        {
          id: 'a2-1',
          pid: 'a2',
          name: '子部门a2-1',
          children: []
        },
        {
          id: 'a2-2',
          pid: 'a2',
          name: '子部门a2-2',
          children: []
        },
        {
          id: 'a3',
          pid: 'a',
          name: '子部门a3',
          children: []
        },
        {
          id: 'a3-1',
          pid: 'a3',
          name: '子部门a3-1',
          children: []
        },
        {
          id: 'b',
          pid: '',
          name: '部门b',
          children: []
        },
        {
          id: 'b1',
          pid: 'b',
          name: '子部门b1',
          children: []
        },
        {
          id: 'c',
          pid: '',
          name: '部门c',
          children: []
        },
      ];
      
      /*// 将一维数组转成树形结构并存储于tree变量
      this.tree = arrayToTree(_list);
      
      // 考虑到实际应用过程中接口返回的数据是无序的，所以我们对tree进行先序遍历将节点一一插入到list变量
      this.list = [];
      ergodicTree(this.tree, (node: any) => {
        this.list.push(node);
        
        // 遍历过程中并对每个节点挂载open和show属性
        // open：控制节点的打开和关闭
        // show：控制节点的显示和隐藏
        this.$set(node, 'open', true);
        this.$set(node, 'show', true)
      })*/
    }

    /*// 控制行的显示和隐藏
    tableRowStyle(scope: any) {
      return {
        'display': scope.row.show ? '' : 'none'
      }
    }

    // 通过每个节点的深度，设置行的缩进实现视觉上的层级效果
    tableRowPaddingStyle(row: any) {
      return {
        'margin-left': `${(row._depth - 1) * 24}px`
      }
    }

    // 控制展开按钮的展开和关闭状态
    collapseClass(row: any) {
      return {
        'collapse--open': row.open == false && row.children && row.children.length > 0,
        'collapse--close': row.open == true && row.children && row.children.length > 0
      }
    }

    // 处理展开按钮的点击事件
    handleCollapseClick(row: any) {
      const _open = row.open;
      // 通过节点访问路径控制节点的显示隐藏，由于内存指针的关系list和tree的节点操作都会相互影响
      ergodicTree(this.tree, (node: any) => {
        node._idPath.forEach((pathId: any) => {
          if (pathId == row.id) {
            this.$set(node, 'show', !_open);
            this.$set(node, 'open', !_open)
          }
        })
      });
      row.show = true;
      row.open = !_open;
    }*/
  }
	
	
	
</script>

<style>
	.collapse {
  display: inline-block;
  width: 8px;
  cursor: pointer;
  margin-right: 8px;
 }

 .collapse--open:before {
  content: '+';
 }

 .collapse--close:before {
  content: '-';
 }
</style>