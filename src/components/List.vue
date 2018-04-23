<template>
    <div style="height: 100%">
        <div style="height: 0.88rem;">
            <transition name="fade" mode='out-in'>
                <div class="search_wapper" @click="showInput" v-if="show">
                    <div class="searchBox" id="showSearchBox"><span>搜索</span></div>
                </div>
                <div class="search_wapper" v-else>
                    <div class="input_area">
                        <input placeholder="请输入关键字" type="search" v-model="keyword" @keyup.13="search"/>
                    </div>
                    <span class="cancle" @click="hideInput">取消</span>
                </div>
            </transition>
        </div>
        <div class="scroll">
            <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleTopChange" ref="loadmore" :auto-fill='false'>
                <ul>
                    <li v-for="item in list">
                    	<router-link :to="{ path: '/listInfo', query: {id: item.id , title: item.linkName}}">
                    	<div class="title_box">
	                        <div class="img"></div>
	                        <div class="title">
	                            <div class="text">{{ item.title }}</div>
	                            <div class="label">
	                                <label class="time">{{ item.publishDate }}</label>
	                                <label class="good">{{ item.sortNo }}</label>
	                                <label class="view">{{ item.readCount }}</label>
	                            </div>
	                        </div>
	                    </div>
	                    <div class="introduce">{{ item.zhaiyao }}</div>
	                    </router-link>
        			</li>
        		</ul>
		        <div slot="bottom" class="mint-loadmore-bottom">
		            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }">↑</span>
		            <span v-show="bottomStatus === 'loading'"><div class="mint-spinner-snake" style="border-top-color: rgb(204, 204, 204); border-left-color: rgb(204, 204, 204); border-bottom-color: rgb(204, 204, 204); height: 28px; width: 28px;"></div></span>
		        </div>
        </mt-loadmore>
        <!-- 		    <div class="sm_noneTic" style="display:none;" id="none_data">
		        <img src="" alt="无数据" />
		        <strong>本查询支持模糊查找。请输入职位名称全部或部分名称，点击搜索按键即可查知相关信息</strong>
		    </div>
		    <div class="load_more" id="more_orders" style="display:none;">
		        <img class="pullUpIcon" src=""></img>
		        <span class="pullUpLabel">加载更多...</span>
		    </div> -->
    </div>
    </div>
</template>
<script type="text/javascript">
import router from '@/router/index.js'
import formatDate from '@/common/formatDate.js'

export default {
    name: "List",
    data() {
        return {
            show: true,
            list: [],
            allLoaded: false,
            bottomStatus: '',
            keyword:'',
            id: this.$route.query.id,
            linkName: this.$route.query.linkName
        }
    },
    mounted: function() {
    	this.$ajax()
            },
    methods: {
        showInput: function() {
            this.show = false
        },
        hideInput: function() {
            this.show = true
        },
        $ajax: function() {
        	setTimeout(() => {
                this.axios.get('/api/microPolicyApi/getListData', {
                	params: {'weixinmoduleId': this.id}
                }).then(
		            m => {
		            	if(m.data.success){
		            		var data = m.data.data
		            		data.forEach((item,index) => {
		            			if(item.zhaiyao == ''){
		            				item.zhaiyao =item.title
		            			}
		            			this.list.push({
		            				title: item.title,
		            				id: item.id,
		            				linkName: item.linkName,
		            				publishDate: formatDate.formatDate.format(new Date(item.publishDate)),
		            				sortNo: item.sortNo,
		            				readCount: item.readCount,
		            				zhaiyao: item.zhaiyao
		            			})
		            		})
		            	}
		            	console.log(m.data)
		        })
                this.$refs.loadmore.onBottomLoaded();
            }, 800);
        },
        loadBottom: function() {
            this.$ajax()
        },
        handleTopChange(status) {
            this.bottomStatus = status;
            console.log(status)
        },
        search: function() {
            console.log(this.keyword);
            this.list = this.list.filter(function (item) {
            	if(item.title.search(this.keyword) != -1){
                    return item
            	}
            }.bind(this))
            console.log(this.list);
        }
    }
}
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .2s ease;
}

.fade-enter,
.fade-leave-to
/* .fade-leave-active below version 2.1.8 */

{
    opacity: 0;
}
.mint-loadmore-bottom span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
    font-size: 0.32rem;
}
.rotate {
	transform: rotate(180deg);
}
.active {
    display: none
}

.scroll {
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    height: calc(100% - 0.88rem);
    padding-top: 0.2rem;
}

.apptit {
    float: left;
    font-size: 0.28rem;
    line-height: 0.58rem;
    color: #fff;
}

.cancle {
    float: right;
    font-size: 0.32rem;
    line-height: 0.6rem;
    color: #9A9DA0;
    width: 15%;
    text-align: center;
}

.search_wapper {
    width: 100%;
    height: 0.88rem;
    padding: 0.14rem 0.3rem;
    overflow: hidden;
    border-bottom: 0.02rem solid #E2E2E2;
}

.search_wapper .input_area {
    width: 85%;
    padding: 0.12rem;
    height: 0.6rem;
    background: #fff;
    /* margin-left: 0.2rem; */
    border-radius: 2rem;
    float: left;
}

.search_wapper .input_area input {
    font-size: 0.28rem;
    display: block;
    width: 80%;
    padding-left: 0.85rem;
    height: 0.36rem;
    line-height: 0.36rem;
    background: url(../assets/search.png) no-repeat center;
    background-size: 0.36rem 0.36rem;
    border: none;
    background-position: 0.3rem;
}

.search_wapper .input_area input::-webkit-input-placeholder {
    color: #9A9DA0;
}

.searchBox {
    width: 100%;
    font-size: 0;
    height: 0.6rem;
    background: #fff;
    /* margin-left: 0.2rem; */
    border-radius: 2rem;
    text-align: center;
    line-height: 0.6rem;
}

.searchBox span {
    color: #9A9DA0;
    padding-left: 0.45rem;
    background: url(../assets/search.png) no-repeat left;
    background-size: 0.36rem 0.36rem;
    font-size: 0.28rem;
}
.scroll li{
	background: #fff;
	margin-bottom: 0.2rem;
	padding:0 0.2rem;
}

.item_box {
    height: 2.52rem;
    background: #fff;
    padding: 0 0.3rem;
    margin-bottom: 0.2rem;
}

.title_box {
    height: 1.36rem;
    padding: 0.3rem 0;
    border-bottom: 0.02rem solid #F1F3F4;
}

.img {
    width: 0.96rem;
    height: 0.96rem;
    background: url(../assets/news.png) no-repeat left;
    background-size: 0.96rem;
    margin-right: 0.2rem;
    float: left;
}

.text {
    color: #292A2C;
    font-size: 0.32rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
}

.label {
    height: 0.3rem;
    line-height: 0.3rem;
    margin-top: 0.2rem;
}

.label label {
    color: #9A9DA0;
    font-size: 0.26rem;
}

.time {
    float: left;
}

.view {
    background: url(../assets/view.png) no-repeat left;
    background-size: 0.28rem 0.2rem;
    padding-left: 0.36rem;
    margin-right: 0.24rem;
    float: right;
}

.good {
    background: url(../assets/good.png) no-repeat left;
    background-size: 0.28rem 0.24rem;
    padding-left: 0.36rem;
    float: right;
}

.introduce {
    margin-top: 0.3rem;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #76777A;
    font-size: 0.26rem;
    line-height: 0.3rem;
    height: 0.7rem;
}
</style>