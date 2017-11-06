<template>
  <div class="cartcontrol" ref="cartControl">
    <transition name="slide-fade">
      <div class="cart-dec icon-remove_circle_outline" v-show="myFood.count>0" @click="decCount"></div>
    </transition>
    <transition name="fade">
      <div class="cart-count" v-show="myFood.count>0" :class="{refresh: valueChange}">{{myFood.count}}</div>
    </transition>
    <div class="cart-add icon-add_circle" @click="addCount"></div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    props: {
      food: {
        type: Object
      },
      seller: {
        type: Object
      }
    },
    data() {
      return {
        count: 0,
        index: []
      }
    },
    computed: {
      ...mapGetters(['allGoods', 'valueChange', 'valChange', 'theScroll', 'isShow', 'newlist', 'buyState']),
      myFood() {
        return this.allGoods.find(f => f.name === this.food.name)
      }
    },
    methods: {
      ...mapMutations(['addToCart', 'decToCart', 'refreshCart',
        'shoplist', 'showShopcart', 'refreshShopcart', 'hideShopcart', 'switchShow', 'setBallAni']),
      addCount() {
        this.addToCart(this.food)
        this.refreshCart({cartGoods: this.allGoods, food: this.food, seller: this.seller})
        this.shoplist({allGoods: this.allGoods})
        if (this.isShow[0].show) {
          this.refreshShopcart()
        } else {
          this.setBallAni(this.$refs.cartControl)
        }
//        this.theScroll.refresh()
      },
      decCount() {
        this.decToCart(this.food)
        this.refreshCart({cartGoods: this.allGoods, food: this.food, seller: this.seller})
        this.shoplist({allGoods: this.allGoods})
        if (this.isShow[0].show) {
          this.refreshShopcart()
          if (this.newlist.length <= 0) {
            this.hideShopcart()
            this.switchShow()
            let curtain = document.getElementsByClassName('shopcart-curtain')[0]
            curtain.style.display = 'none'
          }
        }
//        this.theScroll.refresh()
      }
    }
  }
</script>
<style lang="less">
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all .5s ease-in-out
  }

  .slide-fade-enter, .slide-fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    transform: translateX(20px) rotate(180deg);
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .cartcontrol {
    font-size: 0;
    .cart-dec, .cart-add {
      padding: 6px;
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
    .cart-count {
      display: inline-block;
      vertical-align: text-bottom;
      text-align: center;
      line-height: 24px;
      font-size: 10px;
      color: rbg(147, 153, 159);
    }
  }
</style>
