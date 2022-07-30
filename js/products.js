const utilities = require('./utilities')
const categories = require('./promises/categories')
const taxes = require('./promises/taxes')
const products = require('./promises/products')
const config = require('./config')
const server_url = 'http://localhost:' + config.port
const products_grid = require('./grids/products')
const edit_category_input = document.getElementById('edit_category_input')


const products_body = document.getElementById('products_body')
const category_select = document.getElementById('category_select')
const save_category_btn = document.getElementById('save_category_btn')
const category_name_input = document.getElementById('category_name_input')
const new_category_form = document.getElementById('new_category_form')
const save_tax_btn = document.getElementById('save_tax_btn')
const tax_name_input = document.getElementById('tax_name_input')
const value_tax_input = document.getElementById('value_tax_input')
const new_tax_form = document.getElementById('new_tax_form')
const taxes_select = document.getElementById('taxes_select')
const new_product_form = document.getElementById('new_product_form')
const save_product_btn = document.getElementById('save_product_btn')
const purchase_value_input = document.getElementById('purchase_value_input')
const sale_value_input = document.getElementById('sale_value_input')
const name_product_input = document.getElementById('name_product_input')
const code_product_input = document.getElementById('code_product_input')
const edit_tax_select = document.getElementById('edit_tax_select')
const edit_ctaegory_select = document.getElementById('edit_ctaegory_select')
const edit_tax_btn = document.getElementById('edit_tax_btn')
const edit_category_btn = document.getElementById('edit_category_btn')
const edit_category_modal_btn = document.getElementById('edit_category_modal_btn')
const edit_category_form = document.getElementById('edit_category_form')
const edit_tax_form = document.getElementById('edit_tax_form')
const edit_tax_name_input = document.getElementById('edit_tax_name_input')
const edit_value_tax_input = document.getElementById('edit_value_tax_input')
const edit_tax_modal_btn = document.getElementById('edit_tax_modal_btn')
const select_edit_category_form = document.getElementById('select_edit_category_form')
const select_edit_tax_form = document.getElementById('select_edit_tax_form')

//--------- ON LOAD -----------//
document.addEventListener("DOMContentLoaded", function () {
    products_grid.render()
    utilities.list_categories_on_select(category_select, -1)
    utilities.list_taxes_on_select(taxes_select, 0)
    utilities.list_categories_on_select(edit_ctaegory_select, -1)
    utilities.list_taxes_on_select(edit_tax_select, -1)
})

//--------- PRODUCTS -----------//
sale_value_input.value = '$ 0'
utilities.config_money_input(sale_value_input)


save_product_btn.addEventListener('click', () => {
    if (new_product_form.checkValidity()) {
        let sale_price = utilities.input_money_to_int(sale_value_input.value)
        let category_id = parseInt(category_select.value)
        let tax_id = parseInt(taxes_select.value)
        let product_name = name_product_input.value
        let product_code = code_product_input.value

        products.create_from_form(product_name, product_code, category_id, tax_id, sale_price)
            .then(res => {
                name_product_input.value = ''
                code_product_input.value = ''
                sale_value_input.value = '$ 0'
                utilities.show_alert('Se guardo exitosamente el producto: ' + res.name + '.')
                products_grid.render()
                // console.log(res)
            })
            .catch(err => {
                if (err.msg == 'name not unique') {
                    utilities.show_alert('El nombre del producto ya existe.', 'err')
                } else if (err.msg == 'code not unique') {
                    utilities.show_alert('El código ya existe.', 'err')
                }
                // console.log(err)
            })
    }
})

sale_value_input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === 'Enter') {
        event.preventDefault();
        save_product_btn.click()
    }
});

name_product_input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === 'Enter') {
        event.preventDefault();
        save_product_btn.click()
    }
});





//--------- CATEGORIES -----------//
save_category_btn.addEventListener('click', () => {
    if (new_category_form.checkValidity()) {
        categories.create(category_name_input.value)
            .then(res => {
                utilities.show_alert('Se guardo exitosamente la categoría: ' + res.name + '.')
                utilities.list_categories_on_select(category_select, -1)
                utilities.list_categories_on_select(edit_ctaegory_select, -1)
                category_name_input.value = ''
            })
            .catch(err => {
                if (err.errors[0].message == 'name must be unique') {
                    utilities.show_alert('El nombre de la categoría ya existe.', 'err')
                    category_name_input.value = ''
                } else {
                    utilities.show_alert('Se ha generado un error.', 'err')
                    category_name_input.value = ''
                }
                console.log(err)
            })
    }

})
category_name_input.addEventListener("keyup", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.code === 'Enter') {
        event.preventDefault();
        save_category_btn.click()
    }
})
edit_category_btn.addEventListener('click', () => {
    if (select_edit_category_form.checkValidity()) {
        $('#edit_category_modal').modal('show')
        edit_category_input.focus()
        edit_category_input.value = $('#edit_ctaegory_select option:selected').text()
    }

})

edit_category_modal_btn.addEventListener('click', () => {
    if (edit_category_form.checkValidity()) {
        categories.updtae(edit_ctaegory_select.value, edit_category_input.value)
            .then(res => {
                $('#edit_category_modal').modal('hide')
                utilities.show_alert('la Categoría ' + edit_ctaegory_select.value + ' fue actualizada exitosamente.')
                products_grid.render()
                utilities.list_categories_on_select(category_select, -1)
                utilities.list_categories_on_select(edit_ctaegory_select, -1)

            })
            .catch(err => {
                if (err.errors[0].message == 'categories.name must be unique') {
                    utilities.show_alert('El nombre de la categoría ya existe.', 'err')
                    category_name_input.value = ''
                } else {
                    utilities.show_alert('Se ha generado un error.', 'err')
                    category_name_input.value = ''
                }
                console.log(err)
            })
    }
})

//--------- TAXES -----------//
save_tax_btn.addEventListener('click', () => {
    if (new_tax_form.checkValidity()) {
        taxes.create(tax_name_input.value, value_tax_input.value)
            .then(res => {
                utilities.show_alert('Se guardo exitosamente el impuesto: ' + res.name + '.')
                utilities.list_taxes_on_select(taxes_select, 0)
                utilities.list_taxes_on_select(edit_tax_select, -1)
                tax_name_input.value = ''
                value_tax_input.value = ''
            })
            .catch(err => {
                if (err.errors[0].message == 'name must be unique') {
                    utilities.show_alert('El nombre del impuesto ya existe.', 'err')
                    tax_name_input.value = ''
                    value_tax_input.value = ''
                } else {
                    utilities.show_alert('Se ha generado un error.', 'err')
                    tax_name_input.value = ''
                    value_tax_input.value = ''
                }
                console.log(err)
            })
    }
})

edit_tax_btn.addEventListener('click', () => {
    if (select_edit_tax_form.checkValidity()) {
        $('#edit_tax_modal').modal('show')
        edit_tax_name_input.focus()
        edit_tax_name_input.value = $('#edit_tax_select option:selected').text()
        taxes.find_one_by_id(edit_tax_select.value).then(res => {
            edit_value_tax_input.value = res.values
        })
    }

})

edit_tax_modal_btn.addEventListener('click', () => {
    if (edit_tax_form.checkValidity()) {
        taxes.update(edit_tax_select.value, edit_tax_name_input.value, edit_value_tax_input.value)
            .then(res => {
                $('#edit_tax_modal').modal('hide')
                utilities.show_alert('impuesto ' + edit_tax_select.value + ' actualizado exitosamene.')
                utilities.list_taxes_on_select(taxes_select, 0)
                utilities.list_taxes_on_select(edit_tax_select, -1)
            })
            .catch(err => {
                if (err.errors[0].message == 'taxes.name must be unique') {
                    utilities.show_alert('El nombre de la categoría ya existe.', 'err')
                    category_name_input.value = ''
                } else {
                    utilities.show_alert('Se ha generado un error.', 'err')
                    category_name_input.value = ''
                }
                console.log(err)

            })
    }
})
