<template>
<div class="wapper">
    <div class="column" id="column">       
	        <div class="item" v-for="item in list" v-if="item.linkName == '人才服务'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
	            <img src="../assets/personAbility.png"/>
	            <div class="text">{{ item.linkName }}</div>
                </router-link>
	        </div>
            <div class="item" v-else-if="item.linkName == '热点解读'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
                <img src="../assets/hotspot.png"/>
                <div class="text">{{ item.linkName }}</div>
                </router-link>
            </div>
            <div class="item" v-else-if="item.linkName == '就业创业'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
                <img src="../assets/helpJob.png"/>
                <div class="text">{{ item.linkName }}</div>
                </router-link>
            </div>
            <div class="item" v-else-if="item.linkName == '人事管理'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
                <img src="../assets/personAffairs.png"/>
                <div class="text">{{ item.linkName }}</div>
                </router-link>
            </div>
            <div class="item" v-else-if="item.linkName == '社会保险'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
                <img src="../assets/secure.png"/>
                <div class="text">{{ item.linkName }}</div>
                </router-link>
            </div>
            <div class="item" v-else-if="item.linkName == '劳动关系'">
                <router-link :to="{path: './List', query: {id: item.id, linkName: item.linkName}}">
                <img src="../assets/work.png"/>
                <div class="text">{{ item.linkName }}</div>
                </router-link>
            </div>
    </div>
</div>
</template>
<script>

	export default {
    	name: "Index",
        data () {
            return {
                list:[]
            }
        },
        mounted: function  () {
            this.axios.get("/api/posts",{}).then(m =>{
                console.log(m.data)
                console.log(m.data.success)
                if(m.data.success){
                    const data = m.data.data
                    console.log(data)
                    data.forEach((item, index) => {
                        this.list.push({
                            id: item.id,
                            linkName: item.linkName
                        })
                    })
                }
            })
        }
	}
</script>
<style scoped>
	.wapper{
    background: url(../assets/indexBar.png) no-repeat top;
    background-size: 100%;
    height: 100%;
    padding-top: 4rem;
}
.column{
    display: flex;
    flex-flow: row wrap;
    align-content: space-around;
    margin: 0 0.3rem 0.6rem 0.3rem;
    justify-content: space-between;
    height: 7rem;
}
.column .item{
    height:2.2rem;
    width: 3.36rem;
    background: #fff;
    border-radius: 0.08rem;
    box-shadow: 0 0.04rem 0.08rem #00000024;
    padding:0.5rem 0;
}
.column .item img{
    height: 0.84rem;
    width: 0.72rem;
    margin: 0 auto;
    display: block;

}
.column .text{
    font-size: 0.28rem;
    color: #353738;
    margin-top: 0.2rem;
    text-align: center;
}
</style>