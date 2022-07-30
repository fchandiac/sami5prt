const input_s = document.getElementById('search_input_stcock')
const ul_s = document.getElementById('search_ul_stock')
const products = require('./promises/products')
const stock_grid = require('./grids/stock_grid')
const stocks_promises = require('./promises/stocks')

const stocks_body = document.getElementById('stocks_body')
const stocks_tab_btn = document.getElementById('stocks_tab_btn')
const sales_tab_btn = document.getElementById('sales_tab_btn')
const sales_body = document.getElementById('sales_body')
const cash_resgister_tab_btn = document.getElementById('cash_resgister_tab_btn')
const products_tab_btn = document.getElementById('products_tab_btn')
const config_tab_btn = document.getElementById('config_tab_btn')
const cash_register_body = document.getElementById('cash_register_body')
const products_body = document.getElementById('products_body')
const config_body = document.getElementById('config_body')
const movements_tab_btn = document.getElementById('movements_tab_btn')
const movements_body = document.getElementById('movements_body')
const search_product_stock_form = document.getElementById('search_product_stock_form')
const add_stock_btn = document.getElementById('add_stock_btn')
const utilities = require('./utilities')
const add_warehouse_imput = document.getElementById('add_warehouse_imput')
const add_room_input = document.getElementById('add_room_input')
const orders_tab_btn = document.getElementById('orders_tab_btn')
const orders_body = document.getElementById('orders_body')


var counter_s = 0
var sugestions_s = []
var data_s = []



//--------- ON LOAD -----------//
document.addEventListener("DOMContentLoaded", function () {
  products.find_all().then(res => {
    res.forEach(item => {
      data_s.push(item.name)
    })
  })
})

stocks_tab_btn.addEventListener('click', () => {
  set_active_body(stocks_body)
  set_non_active_body(products_body)
  set_non_active_body(cash_register_body)
  set_non_active_body(movements_body)
  set_non_active_body(sales_body)
  set_non_active_body(config_body)
  set_non_active_body(orders_body)

  set_active_tab(stocks_tab_btn)
  set_non_active_tab(products_tab_btn)
  set_non_active_tab(cash_resgister_tab_btn)
  set_non_active_tab(movements_tab_btn)
  set_non_active_tab(sales_tab_btn)
  set_non_active_tab(config_tab_btn)
  set_non_active_tab(orders_tab_btn)
  cash_register_tab_open = false
  stock_grid.render()

  data_s = []
  products.find_all().then(res => {
    res.forEach(item => {
      data_s.push(item.name)
    })
  })

  input_s.value = ''
  ul_s.innerHTML = ''
  counter_s = 0
  add_room_input.value = ''
  add_warehouse_imput.value = ''


})

add_stock_btn.addEventListener('click', () => {
  if (search_product_stock_form.checkValidity()) {
    products.find_one_by_name(input_s.value).then(res => {
      if (res == null) {
        input_s.value = ''
        ul_s.innerHTML = ''
        counter_s = 0
        utilities.show_alert('Producto no econtrado', 'err')
      } else {
        stocks_promises.create(res.id, add_room_input.value, add_warehouse_imput.value).
          then(res => {
            stock_grid.render()
          })
          .catch(err => {
            //console.log(err.errors[0].message)
            if (err.errors[0].message == 'stocks.product_id must be unique') {
              utilities.show_alert('El producto ya tiene registro de Stock.', 'err')
              input_s.value = ''
              ul_s.innerHTML = ''
              counter_s = 0
              add_room_input.value = ''
              add_warehouse_imput.value = ''
            }

          })

      }

    }).catch(err => {
      console.log(err)
    })
  }
})

input_s.onfocus = (e) => {
  ul_s.innerHTML = ''
  counter_s = 0
}

add_room_input.onfocus = (e) => {
  ul_s.innerHTML = ''
  counter_s = 0
}

//--------- FUNCTIONS -----------//
function subtract_stock(product_id, quanty) {
  stocks_promises.find_one_by_product_id(product_id)
    .then(res => {
      if (res != null) {
        let new_room = res.room - quanty
        stocks_promises.update_room(res.id, new_room).then(res => { })
      }

    }).catch(err => {
      console.log(err)
    })
}

//--------- SEARCH -----------//
input_s.onkeyup = (e) => {
  var value = input_s.value

  if (e.code != 'ArrowDown' && e.code != 'ArrowUp' && e.code != 'Enter') {
    if (value) {
      ul_s.innerHTML = ''
      sugestions_s = data_s.filter(data_s => { //reliza el filtro en data_s_list(List<String>, con los valores a buscar)
        return data_s.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      })


      sugestions_s.forEach(item => {
        let index = sugestions_s.indexOf(item)
        counter_s = index + 1
        let a = document.createElement('a')
        a.classList.add('dropdown-item')
        a.id = 'suggestion_' + counter_s
        a.innerText = item
        ul_s.appendChild(a)
        a.onmouseover = (e) => { input_s.value = item }
        a.onclick = (e) => {
          input_s.value = item
          ul_s.innerHTML = ''
          counter_s = 0
        }
      })
      counter_s = 0
    } else {
      ul_s.innerHTML = ''
      counter_s = 0
    }

  } else if (e.code == 'ArrowUp') {
    if (counter_s == 0) {
      counter_s = sugestions_s.length
      let sugestion = document.getElementById('suggestion_' + counter_s)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input_s.focus()
    } else if (counter_s == 1) {
      counter_s = 1
    }
    else {
      counter_s = counter_s - 1
      let sugestion = document.getElementById('suggestion_' + counter_s)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input_s.focus()
      if (counter_s > 0) {
        let pre_counter_s = counter_s + 1
        let pre_sugestion = document.getElementById('suggestion_' + pre_counter_s)
        pre_sugestion.classList.remove('active')
      }

    }

  } else if (e.code == 'ArrowDown') {
    if (counter_s == sugestions_s.length) {
      counter_s = sugestions_s.length
    } else {
      counter_s = counter_s + 1
      let sugestion = document.getElementById('suggestion_' + counter_s)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input_s.focus()
      if (counter_s > 1) {
        let pre_counter_s = counter_s - 1
        let pre_sugestion = document.getElementById('suggestion_' + pre_counter_s)
        pre_sugestion.classList.remove('active')
      }
    }
  } else if (e.code == 'Enter') {

  }
}

module.exports = { subtract_stock }