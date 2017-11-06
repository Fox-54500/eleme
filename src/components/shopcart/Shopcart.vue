<template>
  <div class="shopcart-wrapper">
    <div class="shopcart">
      <div class="footer-content">
        <div class="content-left" @click="onshow">
          <div class="logo-warper">
            <div class="logo highlight" v-if="isShow[2].haveGood"><i class="icon-shopping_cart"></i></div>
            <div class="logo" v-else><i class="icon-shopping_cart"></i></div>
            <div class="num">{{allCount}}</div>
          </div>
          <div class="price highlight" v-if="isShow[2].haveGood">¥{{totals}}</div>
          <div class="price" v-else>¥{{totals}}</div>
          <div class="desc highlight" v-if="isShow[1].buy">另需配送费¥4元</div>
          <div class="desc" v-else>另需配送费¥4元</div>
        </div>
        <div class="content-right">
          <div class="pay enough" v-if="isShow[1].buy">去结算</div>
          <div class="pay" v-else>还差¥{{delPrice}}起送</div>
        </div>
      </div>
      <div class="shopcart-content">
        <div class="shopcart-title">
          <span class="shopcart-title-context">购物车</span>
          <div class="empty" @click="empty">
            <span>清空</span>
          </div>
        </div>
        <div class="shopcart-list" ref="listWrapper">
          <ul>
            <li v-for="food in newlist" v-if="food.count">
              <div class="li-left">{{food.name}}</div>
              <div class="li-right">
                <div class="price">
                  <span class="food-oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  <span class="food-price"><span style="font-weight: normal;font-size: 10px">¥</span>{{food.price}}</span>
                </div>
                <cartControl :seller="seller" :food="food"></cartControl>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="shopcart-curtain" @click="onshow" ref="curtain">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations} from 'vuex'
  import cartControl from '../cartcontrol/Cartcontrol.vue'
  import IScroll from 'iscroll/build/iscroll'

  export default {
    props: {
      seller: {
        type: Object
      },
      goods: {
        type: Array
      }
    },
    created() {
      this.$nextTick(() => {
        this.initScroll()
      })
    },
    data() {
      return {}
    },
    computed: {
      ...mapState(['list']),
      ...mapGetters(['allCount', 'allGoods', 'totals', 'delPrice', 'newlist', 'isShow', 'valChange'])
    },
    methods: {
      ...mapMutations(['shoplist', 'showShopcart', 'refreshShopcart',
        'hideShopcart', 'getScroller', 'switchShow', 'changeValue']),
      initScroll() {
        this.listScroll = new IScroll(this.$refs.listWrapper, {
          click: true
        })
        this.getScroller(this.listScroll)
      },
      onshow() {
        let curtain = this.$refs.curtain
        if (!this.isShow[0].show) {
          if (this.newlist.length > 0) {
            this.showShopcart()
            this.refreshShopcart()
            this.switchShow()
            this.listScroll.refresh()
            curtain.style.display = 'block'
          }
        } else {
          this.hideShopcart()
          this.switchShow()
          curtain.style.display = 'none'
          this.listScroll.refresh()
        }
      },
      empty() {
        this.refreshShopcart()
        this.hideShopcart()
        this.switchShow()
        let curtain = document.getElementsByClassName('shopcart-curtain')[0]
        curtain.style.display = 'none'
        this.allGoods.find(f => {
          f.count = 0
        })
        this.allGoods.push(1)
        this.allGoods.splice(this.allGoods.length - 1, 1)
        this.newlist.splice(0, this.newlist.length)
        this.changeValue(this.seller.minPrice)
      }
    },
    watch: {},
    components: {
      cartControl: cartControl
    }
  }
</script>

<style lang="less" scoped>
  @import "../../common/less/mixin";

  .shopcart {
    position: fixed;
    height: 48px;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 50;
    /*background: #141d27;*/
    .footer-content {
      position: relative;
      display: flex;
      font-size: 0;
      z-index: 12;
      .content-left {
        flex: 1;
        position: relative;
        z-index: 12;
        background: #141d27;
        .logo-warper, .price, .desc {
          display: inline-block;
        }
        .logo-warper {
          transform: translateY(-10px);
          margin: 0 12px;
          padding: 6px;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          vertical-align: top;
          background: #141d27;
          .logo {
            width: 100%;
            height: 100%;
            line-height: 44px;
            border-radius: 50%;
            text-align: center;
            font-size: 24px;
            background: #2B343C;
            color: rgba(255, 255, 255, 0.4);
            &.highlight {
              color: rgb(255, 255, 255);
              background: rgb(0, 160, 220);
            }
          }
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius: 8px;
            font-size: 9px;
            color: #fff;
            background: rgb(240, 20, 20);
            box-shadow: 0 4px 8px 0 rbga(0, 0, 0, 0.4);
          }
        }
        .price {
          margin: 12px 0;
          padding-right: 12px;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          line-height: 24px;
          font-size: 16px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff;
          }
        }
        .desc {
          margin: 12px 0;
          padding-left: 12px;
          font-size: 10px;
          line-height: 24px;
          color: rgba(255, 255, 255, 0.4);
          &.highlight {
            color: #fff;
          }
        }
      }
      .content-right {
        flex: 0 0 105px;
        width: 105px;
        background: #2B343C;
        .pay {
          padding: 0 8px;
          height: 48px;
          line-height: 48px;
          font-size: 12px;
          font-weight: 700;
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          &.enough {
            background: #55da6c;
            color: #fff;
          }
        }
      }
    }
    .shopcart-content {
      position: relative;
      z-index: 11;
      transition: all 0.5s;
      .shopcart-title {
        position: relative;
        z-index: 10;
        height: 40px;
        background: #f3f5f7;
        width: 100%;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .shopcart-title-context {
          font-weight: 200;
          margin-left: 18px;
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 40px;
        }
        .empty {
          float: right;
          margin-right: 18px;
          line-height: 40px;
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }
      .shopcart-list {
        position: relative;
        z-index: 5;
        background: #FFFFFF;
        max-height: 229px;
        overflow: hidden;
        ul {
          li {
            display: flex;
            justify-content: space-between;
            height: 48px;
            margin: 0 18px;
            border-bottom: 1px solid #CCCCCC;
            &:last-child {
              border: none;
            }
            .li-left {
              font-size: 14px;
              margin: 12px 0;
              line-height: 24px;
              color: rgb(7, 17, 27);
            }
            .li-right {
              display: flex;
              /*width: 128px;*/
              margin: 12px 0px 12px 18px;
              .price {
                .food-price {
                  &:first-letter{
                    color: blue;
                    font-size: 10px;
                    font-weight: normal;
                  }
                  font-weight: 700;
                  font-size: 14px;
                  line-height: 24px;
                  color: rgb(240, 20, 20);
                }
                .food-oldPrice {
                  font-size: 10px;
                  line-height: 24px;
                  text-decoration: line-through;
                  color: #cccccc;
                }
              }
              .cartcontrol {
                transform: translateY(-6px);
                -webkit-transform: translateY(-6px);
              }
            }
          }
        }
      }
    }
    .shopcart-curtain {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      display: none;
      background-color: rgba(7, 17, 27, 0.6);
      width: 375px;
      height: 667px;
      filter: blur(10px);
    }
  }
</style>
