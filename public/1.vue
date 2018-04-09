<template>
	<div id="store">
		<div class="sale">
			<div class="header">
				<img :src="prolists.logo + prolists.img + '.jpg'" alt="">
				<!-- title -->
				 <div class="title-txt clearfix">
					<p class="title">{{prolists.name}}<i class="al"></i>{{prolists.addr}}</p>
					<div class="express" v-if="prolists.selfSend">						
						<div v-if="Number(prolists.time)>16">
							<span>达达专送</span>
							<i class="line"></i>
							<span class="time">明日9点起送</span>
						</div>
						<div v-else>
							<span>达达专送</span>
							<i class="line"></i>
							<span class="time">{{prolists.minute}}分钟</span>
						</div>
					</div>
					<div class="selfsend" v-else>
						<span>商家自送</span>
						<i class="line"></i>
						<span  class="time">{{prolists.minute}}分钟</span>
		            </div>		               
		      	    <div class="distance text">
		              	<span v-if="Number(prolists.time)>5">{{prolists.free}}</span> 
		              	<span v-else>夜间基础运费7元</span>
		            </div>
				</div>
				<!-- 爱心收藏 -->
				 <div class="love">
					<i class="icon collect"></i>
				</div>
        <div class="shopinfo" @click="showSale">
          店铺信息
        </div>
        <div class="active shopinfo" v-if="Fullreduce>0">
          {{Fullreduce}}<span>个活动</span>
        </div>
			</div>

             <div class="menu">               
                <div class="sa" v-if="prolists.selfSend">
                    <i class="red">领券</i>
                    <span>{{prolists.salecoupon | obj}}</span>
                </div>
                <div class="sa" v-if="prolists.menushow">
                    <i class="red">首单</i>
                    <span>立减{{prolists.first}}</span>
                </div>
                <div class="sa" v-if="prolists.paid">
                    <i class="blue">运费</i>
                    <span>{{prolists.freight}}</span>
                </div>
                <div class="sa" v-if="prolists.rest" v-for="(off,index) in prolists.MoneyOff" :key="'off'+index">
                    <i>满减</i>
                    <span>{{off}}</span>                    
                </div>  
                <i class="buss-arrow"></i>
            </div> 
            <div class="notice">
            	<i>公告</i>
            	<p class="notice-txt">亲！感谢各位一直以来的支持，我家价格只低不高，相信老品牌，我们为您提供优质的服务，以及优质的商品，希望大家一如既往的继续支持，如有发漏或质量问题请及时联系15251708271</p>
            </div>                      

		<div class="wrap1" v-if="prolists.selfSend">
			<div class="coupon">
				<h2>店铺优惠券</h2>
			</div>
			<ul class="pics">
				<li v-if="sale!==''"  >
					<p class="colo1">{{sale}}</p>
					<div class="midd">
						<p class="colo2">满{{prolists.small}}~{{prolists.big}}元享受折扣</p>
						<p class="colo3">领取后当日有效</p>
					</div>
					<div class="middimg"></div>	
					<div class="sale-right">
						<span>领券</span>
					</div>	
				</li>
				<li class="pic1" v-for="(item,index) in newsale" :key="'item' + index">			
					<p class="colo1">{{item.reduce}}元</p>
					<div class="midd">
						<p class="colo2">{{item.big}}可用</p>
					</div>
					<div class="middimg"></div>	
					<div class="sale-right">
						<span>领券</span>
					</div>	
				</li>
			</ul>
		</div>
		<div class="wrap1 wrap2">
			<div class="coupon">
				<h2>店铺评价</h2>
			</div>
			<div class="evaluate">
				<div class="num">
					<h3>{{prolists.float}}</h3>
					<h4>综合评分</h4>
				</div>
				<div class="num leftbor">
					<h3>{{prolists.num}}</h3>
					<h4>评论数</h4>
				</div>
				<div class="username">
					<div class="icon"></div>
					<div class="name">
						<p>{{prolists.uname}}**子</p>
						<p class="start">{{prolists.start}}</p>
					</div>
					<div class="time">2017-2-19 09:34:30</div>
				</div>
				<div class="look">
					查看用户的全部评价 >
				</div>
			</div>
		</div>	
		<div class="wrap1 wrap2">
			<div class="coupon">
				<h2>店铺信息</h2>
			</div>
			<div class="evaluate shop">
				<ul>
					<li>
						<span>商品数量：</span>
						<span>{{prolists.minute}}件</span>
					</li>
					<li>
						<span>月销总量：</span>
						<span>{{prolists.big}}单</span>
					</li>
					<li>
						<span>关注人数：</span>
						<span>{{prolists.small}}人</span>
					</li>
					<li>
						<span>营业时间：</span>
						<span>09：:3-20:00</span>
					</li>
					<li>
						<span>门店地址:</span>
						<span>{{prolists.addr2}}</span>
					</li>
					<li>
						<span>门店号码:</span>
						<span class="tel">025-33562537</span>
					</li>
					<li class="apti">
						<span>商家资质</span>
						<i class="left">></i>
					</li>
					<li class="repot">
						<span>举报商家得红包</span>
						<i class="left">最高奖100元 ></i>
					</li>
				</ul>
			</div>
		</div>
  	</div>
		<!-- 详情 -->
		<div class="content">
			<div class="search">
				<div class="searchbox">
					<span>搜索店内商品</span>
				</div>
			</div>
			<Stroeinfo v-bind:prolists="prolists" v-bind:vals="vals" :shopId="shopId"></Stroeinfo>
      
		</div>
		<footer>
      <div class="hide totop">
        	<span class="toparrow" @click="goToshoping"></span>
			    <h4>点击继续购物</h4>
      </div>
      <div class="bot-cart ">
          <a href="javascript:void(0)" class="cart">购物车是空的</a>
          <a href="javascript:void(0)" class="go">去结算</a>
      </div>
		</footer>	
    	
	</div>
	
</template>

<script>
	import $ from 'jquery'
  import Vue from 'vue'
  import Stroeinfo from './Stroeinfo'

	export default{
		data(){
			return {
				prolists:[],
				shopId:'',
				big:'',//优惠券满减里面的大头
				reduce:'',//优惠券满减里面的减多少
				sale:'',//优惠券打折的数据
				newsale:[],//存放获取的新的展示方式券信息
        Fullreduce:0,//活动个数
        num:[],
        vals:[],
        
			}
    },
    components:{
        Stroeinfo
    },
		created(){
			$.get(this.apiUrl+ '/Buss',(res)=>{
				var allData = res.data;//全部商家信息
				this.shopId = this.$route.query.id
				var currentData = allData.map((item,index)=>{//当前的店家信息
					for(var i in item){					
						if(item.id==this.shopId){
							// console.log(item.id)
							// console.log(item)
							this.prolists = item
							return item
						}
					}
				})

       // 活动个数
        if(this.prolists.selfSend==true){
          this.num.push(this.prolists.selfSend)
        } 
        if(this.prolists.menushow==true){
          this.num.push(this.prolists.menushow)
        }
         if(this.prolists.paid==true){
          this.num.push(this.prolists.paid)
        }
        if(this.prolists.rest==true){
          this.vals = $.map( this.prolists.MoneyOff, function(val,i) {
              return val 
          });//对象转成数组，好用他的长度属性，Object.keys(this.prolists.MoneyOff).length,也可以，不过只兼容ie9以上
          // console.log(vals.length)//把对象MoneyOff转化为数组，方便用他的长度
           this.Fullreduce = this.num.length + this.vals.length
          
        }

				var salecoupon = this.prolists.salecoupon
				for(var i in salecoupon){
					// console.log(salecoupon[i])
					var start = salecoupon[i].indexOf('满')
					var end = salecoupon[i].indexOf('减')
					var sale = salecoupon[i].indexOf('折')
					if(start > -1 && end>-1){
						this.big = salecoupon[i].slice(start,end);
						this.reduce = salecoupon[i].slice(end+1);
						var obj = {big:this.big,reduce:this.reduce}
						this.newsale.push(obj)
					}else if(sale>0){
						this.sale = salecoupon[i];
					}
				}	
				// console.log(this.newsale)//重新装换的优惠券信息格式，方便页面展示
      })
      

		},
		methods:{
			goToshoping:function(){
        $('.content').css('transform','translate3d(0,0,0)')
        $('footer .totop').addClass('hide')
        $('footer .bot-cart').removeClass('hide')
        $('#store .sale').css('position','fixed')
        $('.shopinfo').removeClass('hide')
			},
      showSale:function(){
          $('.content').css('transform','translate3d(0,140%,0)')
          $('footer .totop').removeClass('hide')
          $('footer .bot-cart').addClass('hide')
          $('#store .sale').css('position','relative')
          $('.shopinfo').addClass('hide')
      }
		},
	}


</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
body,
html {
  height: 100%;
  width: 100%;
  font-family: "Microsoft YaHei", Verdana, Arial, Helvetica, sans-serif;
  overflow-y: auto;
}
i {
  font-style: normal;
}
a {
  color: #ccc;
  text-decoration: none;
}
.al {
  display: inline-block;
  width: 6px;
  height: 0;
  padding-top: 5px;
  margin: 0 2px;
  border-top: 1px solid #fff;
}
#store {
  width: 100%;
  /* height: 100%; */
  min-height: 649px;
  background: url("../../../static/img/store_industry_1.jpg") no-repeat 0 0;
}
.sale {
  padding: 12px 10px 10px;
  width: 100%;
  position: fixed;
  box-sizing: border-box;
}
.menu span {
  color: #fff;
  font-size: 10px;
}
.header img {
  height: 52px;
  width: 52px;
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  float: left;
}
.header .title-txt {
  padding-left: 10px;
  padding-right: 58px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title-txt .title {
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
}
.title-txt span {
  font-size: 10px;
  color: #fff;
  line-height: 15px;
  font-weight: 400;
}

.title-txt .line {
  height: 8px;
  width: 1px;
  background: url("../../../static/img/icon_line_split.jpg");
  display: inline-block;
  margin: 0 5px;
}
.express,
.selfsend,
.distance {
  line-height: 13px;
}
.title-txt .time {
  display: inline-block;
  height: 12px;
  line-height: 12px;
  padding: 1px 2.5px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 2px;
}
.icons {
  position: fixed;
  top: 0;
  left: 0;
  height: 30px;
  width: 100%;
  line-height: 30px;
  padding-top: 10px;
}
.icon {
  width: 100%;
  height: 100%;
}
.love {
  position: absolute;
  top: 10px;
  right: 0px;
  height: 30px;
  width: 30px;
}
.shopinfo {
  width: 54px;
  height: 16px;
  background: rgba(70, 70, 70, 0.5);
  color: #fff;
  font-size: 10px;
  border-radius: 4px;
  line-height: 14px;
  position: absolute;
  right: 10px;
  top: 55px;
  text-align: center;
  padding-right: 6px;
}
.shopinfo:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 12px;
  height: 15px;
  background: url("../../../static/img/store_sprites_4.6.png") no-repeat;
  background-size: 220px auto;
  background-position: -150px -146px;
}
.active {
  top:85px;
  background:transparent;
}
.collect {
  background: url("../../../static/img/focus.png");
  background-size: 64px 64px;
  background-position: 0 -2px;
  position: absolute;
  right: 0px;
  top: 12px;
}
.sale a {
  color: #999;
  font-size: 10px;
  display: inline-block;
  width: 86%;
}
.sa {
  font-size: 10px;
  color: #999;
  margin-top: 11px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.menu {
  margin-top: 15px;
}
.sa i,
.notice i {
  display: inline-block;
  padding: 0 2px;
  font-size: 10px;
  border-radius: 2px;
  margin-right: 4px;
  color: #fff;
  background: #5fbc65;
}
.sa i.red {
  background: #ff6c57;
}
.sa i.blue {
  background: #5ca7ff;
}
/*侧面小箭头，点击出现更多优惠*/
.buss-arrow {
  position: absolute;
  top: 12px;
  right: 10px;
  display: inline-block;
  width: 18px;
  height: 10px;
  background: url("../../../static/img/index.png") no-repeat;
  background-position: 2px -183px;
  background-size: 20px 200px;
  display: none;
}
.notice i {
  color: #333;
  background: #fff;
  float: left;
  margin-top: 2px;
}
.notice-txt {
  font-size: 10px;
  color: #fff;
  padding: 0 20px 0 30px;
  margin-top: 20px;
  line-height: 16px;
}
.notice:after {
  content: "";
  clear: both;
  display: block;
  height: 0;
  font-size: 0;
  visibility: hidden;
}
/*店铺优惠券*/
.wrap {
  width: 100%;
}
.coupon {
  width: 100%;
  color: #fff;
  position: relative;
  padding: 10px 10px;
  box-sizing: border-box;
  margin-top: 10px;
}
.coupon:before,
.coupon:after {
  content: "";
  position: absolute;
  top: 9px;
  right: 64%;
  left: 10px;
  height: 0;
  border-top: 1px solid rgba(255, 255, 255, 0.4);
}
.coupon:after {
  right: 10px;
  left: 64%;
}
.coupon h2 {
  width: 32%;
  font-size: 15px;
  margin-top: -10px;
  line-height: 18px;
  text-align: center;
  margin: -10px auto;
  font-weight: 400;
}
li {
  list-style: none;
}
.pics li {
  margin: 10px auto;
  height: 70px;
  border-radius: 3px;
  /* border-left: 3px solid #ff5757; */
  box-sizing: border-box;
  position: relative;
  white-space: nowrap;
}
.colo1 {
  color: #ff4f64;
  height: 70px;
  font-size: 18px;
  font-family: Arial, "Microsoft YaHei", Verdana, Arial, Helvetica, sans-serif;
  float: left;
  width: 15%;
  text-align: center;
  line-height: 70px;
  background: #fffbfb;
  border-top: 1px solid #ff9d9d;
  border-bottom: 1px solid #ff9d9d;
  box-sizing: border-box;
  padding-left: 5px;
}
.midd {
  width: 60%;
  height: 70px;
  text-align: left;
  float: left;
  padding: 20px;
  background: #fffbfb;
  box-sizing: border-box;
  border-top: 1px solid #ff9d9d;
  border-bottom: 1px solid #ff9d9d;
}
.midd:after {
  clear: both;
  content: "";
  display: inline-block;
  height: 0;
  font-size: 0;
  visibility: hidden;
}
.colo2 {
  color: #ff4f64;
  font-size: 14px;
  color: #333;
  margin-bottom: 3px;
}
.colo3 {
  font-size: 11px;
  color: #666;
}
.nowrap {
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
}
.middimg {
  float: left;
  height: 70px;
  width: 10px;
  background: url("../../../static/img/conpon.png") no-repeat;
  background-size: 10px 100%;
}
.sale-right {
  display: inline-block;
  clear: both;
  width: 20%;
  font-size: 12px;
  height: 70px;
  text-align: center;
  line-height: 70px;
  background: #fffbfb;
  border-top: 1px solid #ff9d9d;
  border-bottom: 1px solid #ff9d9d;
  box-sizing: border-box;
  border-radius: 3px;
}
.sale-right span {
  display: inline-block;
  color: #fff;
  height: 20px;
  width: 50px;
  background: #ff5757;
  border-radius: 20px;
  line-height: 20px;
}
.wrap2 {
  padding: 10px 0;
  box-sizing: border-box;
}
.evaluate {
  border-radius: 3px;
  padding: 15px 10px 0;
  background: rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  overflow: hidden;
  margin-top: 15px;
}
.evaluate .num {
  text-align: center;
  width: 50%;
  float: left;
  color: #fff;
  box-sizing: border-box;
}
.leftbor {
  border-left: 1px solid #ccc;
}
.num h3 {
  font-size: 25px;
}
.num h4 {
  font-size: 15px;
  font-weight: normal;
}
.username {
  clear: both;
  padding: 20px 0 10px 0;
  overflow: hidden;
  border-bottom: 1px dotted #ccc;
  width: 100%;
  box-sizing: border-box;
}
.username .icon {
  float: left;
  height: 40px;
  width: 40px;
  background: url("../../../static/img/evaluateHeader.jpg") no-repeat;
  background-size: 40px;
  border-radius: 50%;
}
.username .name {
  color: #fff;
  float: left;
  padding-left: 10px;
}
.username .start {
  color: #fea14f;
  font-size: 16px;
}
.look {
  text-align: center;
  color: #fff;
  font-size: 16px;
  padding: 15px 0;
}
.username .time {
  float: right;
  line-height: 30px;
  color: #fff;
  font-size: 12px;
}
.shop {
  margin-bottom: 30px;
}
.shop ul {
  padding: 10px;
  color: #fff;
  line-height: 34px;
  font-size: 16px;
}
.shop ul .tel {
  text-decoration: underline;
}
.shop ul .apti {
  border-bottom: 1px dotted #ccc;
  border-top: 1px dotted #ccc;
  padding: 5px 0;
  margin: 2px 0;
}
.shop .left {
  float: right;
}
/*footer*/
footer {
  width: 100%;
  height: 50px;
  background: #f2f8f3;
  position: fixed;
  bottom: 0;
  left: 0;
  text-align: center;
  z-index: 10;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0/2);
}
footer .totop {
  padding: 10px;
}
footer .toparrow {
  width: 15px;
  height: 8px;
  display: block;
  margin: 0 auto;
  background: url("../../../static/img/store_sprites_4.6.png") no-repeat;
  background-size: 220px;
  background-position: -15px -18px;
}
footer h4 {
  color: #666;
  font-weight: normal;
  margin-top: 6px;
}
/* content */
.content {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 104px;
  left: 0;
  box-shadow: 0, 0, 0, 9px reba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  transition: all 400ms ease-in-out;
}
.search {
  width: 100%;
  height: 40px;
  line-height: 30px;
  padding: 5px 10px;
  box-sizing: border-box;
  background: #eaeaea;
  font-size: 12px;
  color: #999;
  border-bottom: 1px solid #d5d5d5;
}
.searchbox {
  background: #fff;
}
.search span {
  display: block;
  background: url("../../../static/img/search_bar_sprites.png") no-repeat;
  padding-left: 40px;
  background-size: 44px 175px;
  background-position: left -6px;
}
.column {
  width: 100%;
  min-height: 600px;
  position: absolute;
  top: 40px;
  left: 0;
  bottom: 0;
  overflow: hidden;
  background: #fff;
}
.column .list {
  background: #f4f4f4;
  font-size: 16px;
  line-height: 16px;
  color: #666;
  width: 84px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 10;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 10px 80px;
  box-sizing: border-box;
}
.list .group {
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #d5d5d5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hide {
  display: none;
}
footer .bot-cart {
  background: #fff;
  height: 48px;
  border-top: 1px solid #d9d9d9;
}
.bot-cart .cart {
  float: left;
  height: 48px;
  min-width: 80px;
  color: #999;
  font-size: 15px;
  line-height: 48px;
  text-decoration: none;
  background: url("../../../static/img/cart.png") 10px 5px no-repeat;
  background-size: 50px 125px;
  text-align: left;
  padding-left: 70px;
}
.bot-cart .go {
  height: 100%;
  padding: 0 30px;
  background: #bebebe;
  color: #fff;
  float: right;
  line-height: 50px;
}
</style>