<template>
    <div class="rightgroup">
        <el-collapse accordion class="list">
          <el-collapse-item v-for="(item,index) in groups" :key="'item' + index" :tit="item.name"  :item="item.id"  class="one" :class="(item.name=='单品优惠')?'mark':''">
            <template slot="title">
              <i class="header-icon" v-if="item.name=='单品优惠'"></i>
                {{item.name}}
            </template>
            <div v-for="(a,index) in item.children" :key="'a'+index" class="two" @click.stop="showPage(a.id,a.name)" :item="a.id" :name="a.name">{{a.name}}</div>
          </el-collapse-item>
        </el-collapse>


        <div class="rightlist">
            <div class="pic1" v-if="(prolists.selfSend)">
                <div class="midd">
                    <p class="colo1">{{couponNum}}张优惠券</p>
                    <p class="colo2">{{prolists.salecoupon | obj}}</p>
                </div>
                <div class="middimg"></div>	
                <div class="sale-right">
                    <span>领券</span>
                </div>
            </div>
            <div class="bannerimg">
                <a href="javascript:void(0)">
                    <img src="../../../static/img/stroe-title1.jpg" alt="">
                </a>
                 <a href="javascript:void(0)">
                    <img src="../../../static/img/stroe-title2.jpg" alt="">
                </a>
            </div>
            <h3 class="listTitle">{{markTitle}}</h3>
            <div class="partinfo">
                <div class="storePromptWrap a2" v-if="parts" style="display: none;">
                    没找到
                    <span>“<span class="searchKey"></span>”</span>,为您推荐<span>“<span class="searchPrompt"></span>”</span>
                </div>
                <div class="all">
                    <ul>
                        <li v-for="part in parts" :key="'part' + part.id">
                            <a href="javascript:void(0)" class="infoimg">
                                <span>
                                    <img :src="part.img" alt="">
                                </span>
                                <dl>
                                    <dt>{{part.title}}</dt>
                                    <dd>
                                        <strong class="line_pre">月销售{{part.volumn}}件</strong>
                                        <i class="line_split"></i>
                                        <strong class="line_after">好评100%</strong>
                                    </dd>
                                    <dd>
                                        <span class="part_sale">{{part.sale}}</span>

                                    </dd>
                                    <dd>
                                        <label>
                                            <em>&yen;</em>
                                            <i class="price">{{part.price}}</i>
                                        </label>
                                        <strong>
                                            <em>￥</em>
                                            <i class="sprice">{{part.sprice}}</i>
                                        </strong>
                                    </dd>
                                </dl>
                            </a>
                            <div class="box">
                                <span class="reduce" v-if="part.nums>0"></span>
                                <label class="show-arr" v-if="part.nums>0">{{part.nums}}</label>
                                <span class="add" @click="addCar(part)"></span>
                            </div>
                        </li>
                    </ul>
                    <p class="ct">努力加载中<i></i></p>
                    <div class="goToelse">
                        <span>去看看那其他分类吧</span>   
                    </div>
                </div>
            </div>         
        </div>
        <div class="nav">
            <div class="navlist">
                <a class="zr" href="#searchIndex">搜索</a>
                <a class="zs" href="#index">首页</a>
                <a class="zt" href="#homeCategorySearch">分类</a>
                <a class="zu" href="#shopCartList">购物车</a>
                <a class="zv" href="#orderlist">订单</a>
                <a class="zw" href="#user">我的</a>
                <i class="zx"></i>
            </div>
        </div>   
        <div id="carshop">
          <div class="cs1">
            <div class=" carshop-sel cs1-l">全选</div>
            <div class="cs1-r">清空购物车</div>
          </div>
          <table class="cs2">
            <tr v-for="(item,index) in cars" :key="'car'+index">
              <th><span class="carshop-sel cs2-check"></span></th>
              <th class="carImg"><img :src="item.img" alt=""></th>
              <th class="car-info">
                <div class="cartitle">{{item.title}}</div>
                <div class="carsale">
                  <div class="sale-name">
                    <span class="part_sale">{{item.sale}}</span>
                  </div>
                  <label class="carlabel">
                      <em>&yen;</em>
                      <i class="price">{{item.price}}</i>
                  </label>
                  <strong>
                      <em>￥</em>
                      <i class="sprice">{{item.sprice}}</i>
                  </strong>
                </div>
                <div class="box">
                  <span class="reduce"></span>
                  <label class="show-arr">{{item.nums}}</label>
                  <span class="add"></span>
                </div>
              </th>
            </tr>
          </table>
          
        </div>     
    </div>
</template>


<script>
import $ from 'jquery'
import Vue from 'vue'
import store from 'storejs'


export default {
    props:['prolists','shopId'],
    data(){
        return {
            groups:[],//请求的分组
            parts:[],//获取对应的分类信息存放这里
            couponNum:[],//存放优惠券，以便知道几个优惠
            list:{},
            markTitle:'',//右边抬头分类名，点击左边哪个，右边就是哪个名字
            cars:[],//存放商品
        }
    },
    created(){
        $.get(this.apiUrl+ '/group',(result)=>{//请求数据，得到左侧分类
            this.groups = result.data
             console.log(this.groups)
            if(this.groups[0].children.length>0){
               this.showPage(this.groups[0].children[0].id)             
            }else{
               this.showPage(this.groups[0].id)
            }           
        })  
        
        // 购物车初始化
        // store.set('cars',{})
        if(!store.get('?cars')){//外面总的购物车是否存在，不存在就创建
          store.set('cars',{})
        }
    },
    updated(){
      if(this.prolists.selfSend==true){//优惠券张数
          this.couponNum = $.map( this.prolists.salecoupon,function(num,i) {
              return num 
          }).length;//对象转成数组，好用他的长度属性，Object.keys(this.prolists.MoneyOff).length,也可以，不过只兼容ie9以上      
      }
      // 一级菜单点击
      this.$nextTick(function(){
        $('.one').each((i,value)=>{    
               
          $(value).click(()=>{
            var count = $(value).find('.two').length//获取是否有分类，个数
            var parentId = $(value).attr('item')
            var childrenId = $(value).find('.two').eq(0).attr('item')
            var parentname = $(value).attr('tit')
            var childrenname = $(value).find('.two').eq(0).attr('name')
           
            if(count>0){//分类存在        
              $(value).find('.two').css('background','#fff')
              this.markTitle = childrenname;
              $.get(this.apiUrl+ '/part',{id:childrenId},(result)=>{
                this.parts = result.data             
              })
            }else if(count==0){
              $(value).css('background','#fff')
              this.markTitle = parentname;
              $.get(this.apiUrl+'/part',{id:parentId},(result)=>{
                this.parts = result.data   
                // console.log(this.parts)             
              })
            }
           
          }) 
       })
      })
      
     
    
    },
    mounted(){
       $('.nav').click(()=>{//右侧小导航
            $('.nav .navlist').toggleClass('show')
        }) 
        $(window).ready(function(){
            if($('.one').eq(0).find('.two').length>0){
              $('.el-collapse-item__wrap').eq(0).css('display','block') 
              this.markTitle = $('.one').eq(0).find('.two').eq(0).attr('name')
              // console.log(this.markTitle)
            } 
          
        })
         
    },
    methods:{
        showPage:function(id,name){//获取页面
            $.get(this.apiUrl+ '/part',{id:id},(result)=>{
                this.parts = result.data                
            })
            this.markTitle = name;  
            if(name!=='秒杀'){
              $('.pic1','.bannerimg').css('display','none')
            }        
        },
        addCar(part){
          // console.log(store('cars'))//读取保存的购物车信息
          // console.log(this.shopId)

          if(this.cars.length>0){          
            for(var i = 0;i<this.cars.length;i++){
              console.log(this.cars)
              console.log(part.id)
              if(this.cars[i].id==part.id){
                this.cars[i].nums++//如果购物车里面有了，就在数量上加1
                this.cars.splice(i,1,this.cars[i])//实现双向绑定，实时改变页面上的数据
                return
              }   
            }
            part.nums = 1;
            this.cars.push(part)//如果购物车里面没有，就把选中的商品放进购物车   
          }else{
            part.nums = 1;
            this.cars.push(part)//如果购物车里面没有，就把选中的商品放进购物车 
          }
              
        }
    }
}


</script>


<style scoped>
* {
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
strong {
  font-weight: normal;
}
em {
  font-style: normal;
}
.rightgroup {
  width: 100%;
  min-height: 600px;
  position: absolute;
  top: 40px;
  left: 0;
  bottom: 0;
  overflow: hidden;
}
.borderRight {
  border-left: 3px solid #43b34f !important;
  color: #43b34f;
}
.rightlist {
  position: absolute;
  top: 0;
  left: 84px;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}
.pic1 {
  width: 90%;
  margin: 10px auto;
  height: 70px;
  border-radius: 3px;
  border-left: 3px solid #ff5757;
  box-sizing: border-box;
  position: relative;
}
.colo1,
.colo2 {
  padding-left: 5px;
  font-size: 15px;
  color: #ff5757;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.colo2 {
  font-size: 11px;
  color: #666;
  margin-top: 4px;
}
.midd {
  width: 70%;
  height: 68px;
  text-align: left;
  float: left;
  padding: 16px 10px 0 12px;
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
.colo3 {
  font-size: 11px;
  color: #666;
}
.middimg {
  position: absolute;
  top: 0px;
  left: 70%;
  height: 68px;
  width: 10px;
  background: #fff url("../../../static/img/conpon.png") no-repeat;
  background-size: 10px 100%;
  z-index: 999;
}
.sale-right {
  display: inline-block;
  width: 29%;
  font-size: 12px;
  height: 68px;
  text-align: center;
  line-height: 70px;
  box-sizing: border-box;
  border-radius: 3px;
  position: absolute;
  right: 0;
  border-top: 1px solid #ff9d9d;
  border-bottom: 1px solid #ff9d9d;
  border-right: 1px solid #ff9d9d;
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
/* 领取优惠券结束广告位 */
/* 两张宣传图 */
.bannerimg {
  padding: 0 10px 10px;
}
.bannerimg a {
  display: block;
  padding-top: 10px;
}
.bannerimg a > img {
  width: 100%;
  display: block;
}
.listTitle {
  font-weight: 400;
  color: #666;
  height: 31px;
  line-height: 31px;
  font-size: 12px;
  background: #f4f4f4;
  text-indent: 10px;
}
.partinfo {
  position: relative;
  height: auto;
}
.storePromptWrap {
  margin: 31px 10px;
  text-align: center;
  font-size: 13px;
  color: #666666;
  text-overflow: ellipsis;
  overflow: hidden;
  max-height: 18px;
  line-height: 18px;
  position: relative;
  display: none;
}
.storePromptWrap span {
  color: #ff8203;
}
.all {
  padding-bottom: 180px;
}
.all > ul > li {
  position: relative;
  padding-left: 10px;
}
.infoimg {
  display: block;
  overflow: hidden;
  padding: 10px 10px 10px 0;
}
.infoimg:after {
  content: "";
  width: 100%;
  height: 0px;
  border-bottom: 1px solid #e8e8e8;
  position: absolute;
  right: 0;
  z-index: 10;
  padding-bottom: 10px;
}
.infoimg > span {
  float: left;
  padding-top: 4px;
}
.infoimg > span > img {
  width: 65px;
  height: 65px;
  display: inline-block;
  border-radius: 2px;
  padding-top: 6px;
}
.infoimg dl {
  padding-left: 70px;
}
.infoimg dl dt {
  font-size: 14px;
  color: #333;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 5px;
  max-height: 42px;
  line-height: 21px;
  padding-top: 3px;
  padding-bottom: 1px;
}
.infoimg dl dd {
  padding-left: 5px;
  overflow: hidden;
  padding-bottom: 1px;
  color: #999;
}
.line_pre,
.line_after {
  display: inline-block;
  font-size: 11px;
}
.line_split {
  display: inline-block;
  height: 10px;
  width: 8px;
  background: url("../../../static/img/icon_line_split.jpg") no-repeat center
    2px;
}
.line-_after {
  padding-left: 2px;
}
dd > label,table .carlabel {
  font-size: 16px;
  color: #ff3434;
  padding-top: 2px;
  white-space: nowrap;
  display: inline-block;
  font-size: 0;
}
dd strong,tr strong {
  font-size: 0;
}
.sprice {
  text-decoration: line-through;
}
label .price {
  font-size: 16px;
}
strong .sprice {
  font-size: 13px;
}
label em,
strong em {
  font-style: normal;
  font-size: 11px;
}
.part_sale {
  background: #ff5959;
  color: #fff;
  padding: 1px 2px;
  font-size: 10px;
  line-height: 14px;
  border-radius: 2px;
  font-weight: 200;
}
.box {
  position: absolute;
  right: 0;
  bottom: 42px;
}
.box span {
  position: absolute;
  right: 52px;
  padding: 6px;
  text-indent: -999999999px;
  background: url("../../../static/img/addNumSprite.png") no-repeat;
  background-size: 400% 100%;
  border: 0 none;
  width: 28px;
  height: 28px;
  vertical-align: top;
  background-origin: content-box;
}
.hide {
  display: none;
}
.nav .navlist.show {
  display: block;
}
.box span.reduce {
  background-position: -42px 0;
}
.box span.add {
  right: 0;
  background-position: 0 0;
}
.box label {
  position: absolute;
  right: 35px;
  margin-top: 6px;
  color: #333333;
  font-size: 12px;
  padding: 0;
  width: 24px;
  height: 28px;
  overflow: hidden;
  text-align: center;
  line-height: 28px;
  vertical-align: top;
  background-origin: content-box;
  background-color: transparent;
}
.ct {
  width: 90;
  display: none;
  margin: 0 auto 10px;
  position: relative;
  color: #999;
  text-align: center;
  line-height: 30px;
  font-size: 11px;
}
.goToelse {
  text-align: center;
}
.goToelse span {
  margin-top: 10px;
  z-index: 2;
  background-color: #fff;
  display: inline-block;
  padding: 0 8px;
  position: relative;
  line-height: 30px;
  font-size: 14px;
  color: rgb(139, 138, 138);
}
.goToelse span:before {
  content: "";
  height: 0px;
  border-top: 1px solid #d9d9d9;
  width: 16%;
  position: absolute;
  top: 50%;
  left: -15%;
}
.goToelse span:after {
  content: "";
  height: 0;
  border-top: 1px solid #d9d9d9;
  width: 16%;
  position: absolute;
  top: 50%;
  right: -15%;
}
/* 侧边小导航 */
.nav {
  position: fixed;
  z-index: 20;
  right: 0;
  bottom: 60px;
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.8) url("../../../static/img/bm.png") no-repeat;
  background-size: 80px 25px;
  background-position: 5px center;
  border-radius: 4px 0 0 4px;
  border: 1px solid #757575;
}
.navlist {
  position: absolute;
  right: -1px;
  bottom: 42px;
  width: 95px;
  border: 1px solid #757575;
  background: rgba(0, 0, 0, 0.8);
  display: none;
}
.navlist a {
  color: #fff;
  display: block;
  height: 35px;
  line-height: 35px;
  padding-left: 38px;
  border-bottom: 1px solid #4b4b4b;
  background: url("../../../static/img/bmenu.png") no-repeat;
  background-size: 16px 300px;
}
.navlist a.zr {
  background-position: 10px 0;
}
.navlist a.zs {
  background-position: 10px -50px;
}
.navlist a.zt {
  background-position: 10px -100px;
}
.navlist a.zu {
  background-position: 10px -150px;
}
.navlist a.zv {
  background-position: 10px -200px;
}
.navlist a.zw {
  background-position: 10px -250px;
}
.navlist i.zx {
  display: block;
  height: 0;
  width: 0;
  border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
  border-width: 6px;
  border-style: solid;
  position: absolute;
  bottom: -12px;
  right: 10px;
  z-index: 15px;
}
/* 购物车 */
#carshop{
  position:absolute;
  left:0;
  right:0;
  bottom:100px;
  transition:transform 0.5s ease-out ;
  background:#fff;
  z-index:20;
  padding:0 10px;
}
.cs1{
  line-height:40px;
  width:100%;
  height:40px;
  color:#666;
  border-bottom:1px solid #ebebeb;
  font-size:12px;
}
.carshop-sel{
  background:url('../../../static/img/ck.png') no-repeat;
  background-size:20px 220px ;
  width:50px;
  height:40px; 
  padding-left:30px;
}
.cs1-l{
  float:left; 
  background-position:0 -190px;
  width:50px;
  height:40px; 
  padding-left:30px;
}
.cs1-r{
  background:url('../../../static/img/delete.png') no-repeat center left;
  float:right;
  padding-left:20px;
  background-size:13px 12px
} 
#carshop tr{
  border-bottom:1px solid #ebebeb;
  width:100%;
   position:relative;
  display:inline-block;
  padding-bottom:10px;
 
}
#carshop tr th{
  text-align:left;
}
.cs2-check{
  background-position:0 -200px;
}
.carImg{
  width:62px;
  height:62px;
}
.carImg img{
  width:52px;
  height:52px;
  margin-top:10px;
  vertical-align:top;
}
.car-info{
  padding-left:10px;
}
.cartitle{
  min-height:36px;
  line-height:36px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  border-collapse: collapse;
  color:#555;
  font-weight:400;
  font-size:14px;
}
.cs2{
  /* overflow-y:auto;
  overflow-x: hidden;
  position: relative;
  top:0;
  left:0;
  bottom:0;
  max-height:380px;
  background:#fff; */
}

</style>


