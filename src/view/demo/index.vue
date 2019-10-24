<template>

	 <div>
      <Header></Header>
      <div class="article_list">
       <ul>
         <li v-for="item in list" :key="item.id">
         	<time v-text="$formatDate.goodTime(item.create_at)"></time>
         	<router-link :to="'/content/' + item.id">
         		{{item.title}}
         	</router-link>
         </li>
       </ul>
     </div>
     <Footer></Footer>
   </div>
</template>
<script>
	import Header from '@/components/common/header'
	import Footer from '@/components/common/footer'
	
	export default {
		components: { Header, Footer },
		data () {
			return {
				list: []
			}
		},
		 created () {
		    this.getData()
		  },
		  methods: {
		    getData () {
		      this.$api.get('topics', null, r => {
		        this.list = r.data
		      })
		    }
		  }
	}
	
	
</script>

<style>
	.article_list {margin: auto;}
	.article_list li{text-align: left;}
	
</style>