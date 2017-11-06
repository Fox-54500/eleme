<template>
  <div class="goods-container">
    <div v-if="goods.length === 0">
      <Loading></Loading>
    </div>
    <div v-if="goods.length" class="goods">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li v-for="(item, index) in goods" @click="fn(index)" :key="item.id" class="menu-item"
              :class="{'current':currentIndex === index}">
            <span class="text border">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <li class="good-content"  v-for="good in goods">
          <ul>
            <div class="tile">{{good.name}}</div>
            <li v-for="food in good.foods">
              <div class="food-icon"><img :src=food.icon width="57" height="57"></div>
              <div class="food-content">
                <div class="food-name">{{food.name}}</div>
                <!--<div class="food-description">{{food.description}}</div>-->
                <div class="extra">
                  <span class="food-sellCount">月售{{food.sellCount}}份</span>
                  <span class="food-rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="food-price">￥{{food.price}}</span>
                  <span class="food-oldPrice">{{food.oldPrice}}</span>
                </div>
                <div class="cartControler-wrapper">
                  <cartControl :seller="seller" :food="food"></cartControl>
                </div>
              </div>
            </li>
          </ul>
        </li>
        </ul>
      </div>
    </div>
    <shopCart :seller="seller" :goods="goods"></shopCart>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'
  import shopCart from '../shopcart/Shopcart.vue'
  import Loading from '../loading/Loading'
  import CartControl from '../cartcontrol/Cartcontrol'
  export default {
    props: {
      goods: {
        type: Array
      },
      seller: {
        type: Object
      }
    },
    data () {
      return {
        classMap: this.$store.state.classMap,
        currentIndex: 0,
        listHeight: []
      }
    },
    created () {
      this.$nextTick(() => {
        this.initScrollTemplate()
      })
    },
    methods: {
      fn (id) {
        var el = this.$refs.foodsWrapper.childNodes[0].childNodes[id]
        this.currentIndex = id
        this.foodsScroll.scrollToElement(el, 1000)
      },
      initScrollTemplate () {
        if (this.$refs.menuWrapper) {
          this.getFoodsListHeight()
          this.menuScroll = new IScroll(this.$refs.menuWrapper, {
            click: true
          })
        }
        if (this.$refs.foodsWrapper) {
          this.foodsScroll = new IScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          })
        }
      },
      getFoodsListHeight () {
        var selectLis = this.$refs.foodsWrapper.childNodes[0].childNodes
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < selectLis.length; i++) {
          let li = selectLis[i]
          height += li.clientHeight
          this.listHeight.push(height)
        }
      },
      getCurrentIndex (num) {
        for (let i = 0; i < this.listHeight.length - 1; i++) {
          let height = this.listHeight[i]
          if (i + 1 === this.listHeight.length - 1 && num >= height) {
            this.currentIndex = i
            return
          }
          if (num >= height && num < this.listHeight[i + 1]) {
            this.currentIndex = i
            return
          }
        }
      }
    },
    watch: {
      goods (val) {
        this.$nextTick(() => {
          if (val.length > 0) {
            this.initScrollTemplate()
            let self = this
            this.foodsScroll.on('scroll', function () {
              self.getCurrentIndex(Math.abs(Math.round(this.y)))
            })
          }
        })
      }
    },
    components: {
      Loading,
      cartControl: CartControl,
      shopCart
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .goods {
    display: flex;
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        &.current {
          position: relative;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
        }
        .text {
          display: table-cell;
          vertical-align: middle;
          width: 56px;
          font-size: 14px;
          line-height: 14px;
          .border-1px(rgba(7, 17, 27, 0.1));
        }
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 1px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          .iconImg(3)
        }
      }
      .menu-item-active{
        background: white;
      }
    }
    .foods-wrapper {
      flex: 1;
      .good-content{
        .tile{
          background-color: #f3f5f7;
          font-size: 12px;
          line-height: 26px;
          color: rgb(147,153,159);
          text-indent: 15px;
          width: 100%;
          border-left: 3px solid #d9dde1;
        }
        ul{
          li{
            display: flex;
            position: relative;
            height: 100px;
            margin: 18px;
            border-bottom: 1px solid #CCCCCC;
            &:last-child{
              border-bottom: none;
              margin-bottom: 0;
            }
            .food-icon{
              flex:0 0 57px;
              margin-right: 10px;
            }
            .food-content{
              margin-left: 5px;
              .food-name{
                margin: 2px 0 8px;
                font-size: 14px;
                color: rgb(7,17,27);
                line-height: 14px;
              }
              .price{
                margin-top: 10px;
                .food-price{
                  font-weight: 700;
                  font-size: 14px;
                  margin-right: 8px;
                  color: red;
                }
                .food-oldPrice{
                  font-size: 10px;
                  margin-right: 8px;
                  text-decoration: line-through;
                  color: #cccccc;
                }
              }
              .extra{
                .food-sellCount{
                  margin-right: 8px;
                  margin-bottom: 8px;
                  font-size: 10px;
                  color: rgb(147,153,159);
                }
                .food-rating{
                  margin-right: 12px;
                  color: rgb(147,153,159);
                  font-size: 10px;
                  margin-bottom: 8px;
                }
              }
              .cartControler-wrapper{
                position: absolute;
                right: 0px;
                bottom: 12px;
              }
            }
          }
        }

      }
    }
  }


</style>
