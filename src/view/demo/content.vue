<template>
  <div>
    <myHeader></myHeader>
    <h2 v-text="dat.title"></h2>
    <p v-if="dat.author">作者：{{dat.author.loginname}}发表于：{{$formatDate.goodTime(dat.create_at)}}</p>
    <hr>
    <article v-html="dat.content"></article>
    <h3>网友回复：</h3>
    <ul>
      <li v-for="i in dat.replies">
        <p>评论者：{{i.author.loginname}}评论于：{{$formatDate.goodTime(i.create_at)}}</p>
        <article v-html="i.content"></article>
      </li>
    </ul>
    <myFooter></myFooter>
  </div>
</template>
<script>
import myHeader from "@/components/common/header.vue";
import myFooter from "@/components/common/footer.vue";
export default {
  components: { myHeader, myFooter },
  data() {
    return {
      id: this.$route.params.id,
      dat: {}
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.get("topic/" + this.id, null, r => {
        this.dat = r.data;
      });
    }
  }
};
</script>
<style>
	 li{text-align: left;}
</style>