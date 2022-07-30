const input = document.getElementById('search_input')
const ul = document.getElementById('search_ul')
const products = require('./promises/products')
const cash_resgister_tab_btn = document.getElementById('cash_resgister_tab_btn')

var counter = 0
var sugestions = []
var data = []

products.find_all().then(res => {
  res.forEach(item => {
    data.push(item.name)
  })
  console.log(data)
})

cash_resgister_tab_btn.addEventListener('click', () => {
  products.find_all().then(res => {
    var data = []
    res.forEach(item => {
      data.push(item.name)
    })
    console.log(data)
  })
})

input.onkeyup = (e) => {
  var value = input.value

  if (e.code != 'ArrowDown' && e.code != 'ArrowUp' && e.code != 'Enter') {
    if (value) {
      ul.innerHTML = ''
      sugestions = data.filter(data => { //reliza el filtro en data_list(List<String>, con los valores a buscar)
        return data.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      })

      sugestions.forEach(item => {
        let index = sugestions.indexOf(item)
        counter = index + 1
        let a = document.createElement('a')
        a.classList.add('dropdown-item')
        a.id = 'suggestion_' + counter
        a.innerText = item
        ul.appendChild(a)
        a.onmouseover = (e) => { input.value = item }
        a.onclick = (e) => {
          input.value = item
          ul.innerHTML = ''
          counter = 0
        }
      })
      counter = 0
    } else {
      ul.innerHTML = ''
      counter = 0
    }

  } else if (e.code == 'ArrowUp') {
    if (counter == 0) {
      counter = sugestions.length
      let sugestion = document.getElementById('suggestion_' + counter)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input.focus()
    } else if (counter == 1) {
      counter = 1
    }
    else {
      counter = counter - 1
      let sugestion = document.getElementById('suggestion_' + counter)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input.focus()
      if (counter > 0) {
        let pre_counter = counter + 1
        let pre_sugestion = document.getElementById('suggestion_' + pre_counter)
        pre_sugestion.classList.remove('active')
      }

    }

  } else if (e.code == 'ArrowDown') {

    if (counter == sugestions.length) {
      counter = sugestions.length
    } else {
      counter = counter + 1
      let sugestion = document.getElementById('suggestion_' + counter)
      sugestion.classList.add('active')
      sugestion.dispatchEvent(new MouseEvent('mouseover', { 'bubbles': true }))
      //input.focus()
      if (counter > 1) {
        let pre_counter = counter - 1
        let pre_sugestion = document.getElementById('suggestion_' + pre_counter)
        pre_sugestion.classList.remove('active')
      }
    }

  } else if (e.code == 'Enter') {
    ul.innerHTML = ''
    counter = 0
  }
}


