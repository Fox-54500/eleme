const state = {
  counts: 0,
  total: 0,
  dprice: 20,
  list: [],
  scroll: 0,
  show: [
    {show: false},
    {buy: false},
    {haveGood: false}
  ]
}
const getters = {
  allCount: state => state.counts,
  totals: state => state.total,
  delPrice: state => state.dprice,
  newlist: state => state.list,
  theScroll: state => state.scroll,
  isShow: state => state.show
}
const mutations = {
  refreshCart(state, {cartGoods, food, seller}) {
    let cnt = 0
    let ttl = 0
    for (let i = 0; i < cartGoods.length; i++) {
      cnt += cartGoods[i].count
      ttl += cartGoods[i].count * cartGoods[i].price
    }
    state.counts = cnt
    state.total = ttl
    state.dprice = seller.minPrice - state.total
    if (state.dprice <= 0) {
      state.show[1].buy = true
    } else {
      state.show[1].buy = false
    }
    if (state.total > 0) {
      state.show[2].haveGood = true
    } else {
      state.show[2].haveGood = false
    }
  },
  shoplist(state, {allGoods}) {
    allGoods.find(f => {
      let test = state.list.find(l => l.name === f.name)
      if (f.count > 0 && !test) {
        state.list.push(f)
      }
    })
    for (let i = 0; i < state.list.length; i++) {
      if (state.list[i].count <= 0) {
        state.list.splice(i, 1)
      }
    }
  },
  showShopcart() {
    let shopCart = document.getElementsByClassName('shopcart-content')[0]
    shopCart.style.transition = `all 0.5s`
    shopCart.style.webkitTransition = `all 0.5s`
  },
  hideShopcart() {
    let shopCart = document.getElementsByClassName('shopcart-content')[0]
    shopCart.style.transform = `translateY(0px)`
    shopCart.style.webkitTransform = `translateY(0px)`
  },
  refreshShopcart(state) {
    let index = state.list.length
    let height = -(49 * index + 97) + 1
    if (height <= -326) {
      height = -326
    }
    let shopCart = document.getElementsByClassName('shopcart-content')[0]
    shopCart.style.transform = `translateY(${height}px)`
    shopCart.style.webkitTransform = `translateY(${height}px)`
    if (index <= 0) {
      shopCart.style.transform = `translateY(0px)`
      shopCart.style.webkitTransform = `translateY(0px)`
    }
  },
  getScroller(state, scroller) {
    state.scroll = scroller
  },
  switchShow(state) {
    if (state.show[0].show === true) {
      state.show[0].show = false
    } else {
      state.show[0].show = true
    }
  },
  changeValue(state, minPrice) {
    state.counts = 0
    state.total = 0
    state.dprice = minPrice
    state.show[0].show = false
    state.show[1].buy = false
    state.show[2].haveGood = false
  },
  setBallAni(state, parent) {
    let newBall = document.createElement('div')
    newBall.className = 'ani-ball'
    document.body.appendChild(newBall)
    let des = document.getElementsByClassName('num')[0]
    let desX = des.getBoundingClientRect().x
    let desY = des.getBoundingClientRect().y
    let ballPosX = parent.lastElementChild.getBoundingClientRect().x
    let ballPosY = parent.lastElementChild.getBoundingClientRect().y
    if (ballPosY >= 550) {
      newBall.remove()
      return
    }
    let allX = ballPosX - desX + 20
    let allY = desY - ballPosY
    newBall.style.top = ballPosY + 10 + 'px'
    newBall.style.left = ballPosX + 10 + 'px'
    var Y = 0
    var X = 0
    var time = 0
    var downY = 0
    var timer = setInterval(function () {
      time++
      if (time <= 5) {
        Y = 100 / time - 100
        downY = Y
      } else {
        Y = ((allY - downY) * (time - 5) / 20 * (time - 5) / 20) + downY
      }
      X = allX * time / 25
      newBall.style.transform = `translate3d(${-X}px,${Y}px,0)`
      if (X >= allX) {
        clearInterval(timer)
        newBall.remove()
        timer = null
        return
      }
    }, 20)
  }
}
export default {
  state,
  getters,
  mutations
}
