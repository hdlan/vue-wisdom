<template>
	<div>
        <div class="title_box"> 
            <div class="title">{{ obj.title }}</div>
            <div class="label">
                <label class="time">{{ obj.date }}</label><label class="good">{{ obj.sortNo }}</label><label class="views">{{ obj.readCount }}</label>
            </div>
        </div>
		<div v-html="html"></div>
	</div>
</template>
<script type="text/javascript">
import formatDate from '@/common/formatDate.js'

export default {
	name: 'listInfo',
	data () {
		return {
			id:this.$route.query.id,
			title:this.$route.query.title,
			html:'',
			obj: {}
		}
	},
	mounted: function () {
			this.$ajax()
	},
	methods: {
		$ajax: function() {
			console.log(this.id);
			setTimeout(() => {
                this.axios.get('/api/microPolicyApi/getHtmlData', {
                	params: { 'id': this.id }
                }).then(
		            m => {
		            	console.log(m.data);
		            	if(m.data.success){
		            		var data = m.data.data[0]
		            		this.obj = Object.assign({}, this.obj, {
		            		  title: data.title,
							  data: formatDate.formatDate.format(new Date(data.publishDate)),
							  sortNo: data.sortNo,
							  readCount: data.readCount
							})
		            	    this.html = data.content
		            	}
		        })
            }, 800);
		}
	}
}   
</script>
<style scoped>
.title_box{
    margin-bottom: 15px;
}
.title{
    color:#292A2C;
    font-size: 15px;
}
.label{
    height: 15px;
    line-height: 15px;
    padding:0 15px;
}
.label label{
    color:#9A9DA0;
    font-size: 13px;
}
.time{
    float: left;
}
.views{
    background:url(../assets/view.png) no-repeat left;
    background-size: 14px 10px;
    padding-left: 18px;
    margin-right: 12px;
    float:right;
}
.good{
    background:url(../assets/good.png) no-repeat left;
    background-size: 14px 12px;
    padding-left: 18px;
    float:right;
}
p{
    margin:5px 10px !important;
}
</style>