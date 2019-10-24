<template>
	 <select-page @selectInfo="selectInfo" :otherParams="{filter_EQS_status:0}"
                  :paramsName="'filter_LIKES_name_OR_supplierLinkmanPhone'" :params="providerNameAndPhone2" ref="selectPage"
                  :data="'supplierList'" :labelName1="'name'">
	 </select-page>
	
</template>

<script>
	import selectPage from '@/components/selectPage'
	
	export default {
		components: { selectPage },
		data () {
			return {
				list: []
			}
		},
		 created () {
		    
		  },
		  methods: {
		    
		  }
	}
	
</script>

<style>
</style>