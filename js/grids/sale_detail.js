const { Grid, Cell, h, html, BaseComponent, PluginPosition } = require("gridjs")
const translate = require("./translate_grid")
const utilities = require('../utilities')
const config = require('../config')
const server_url = 'http://localhost:' + config.port
const moment = require('moment');
const sales = require('../promises/sales')
const printer = require('../printer')
const start_sales_grid_date_imput = document.getElementById('start_sales_grid_date_imput')
const end_sales_grid_date_imput = document.getElementById('end_sales_grid_date_imput')
const sales_grid_ctaegory_select = document.getElementById('sales_grid_ctaegory_select')

const categories = require('../promises/categories')




function render(sale_detail){
    let old_grid = document.getElementById('sale_detail_grid')
    old_grid.remove()
    let container_grid = document.getElementById('sale_detail_grid_container')
    container_grid.appendChild(utilities.grid_container('sale_detail_grid'))

    var grid = new Grid({

        search: false,
        sort: true,
        pagination: { limit: 8},
        language: translate.es_ES,
        columns: [
            {name: 'id',  width: '8%'},
            {name: 'Producto',  width: '30%'},
            {name: 'Categoría',  width: '20%'},
            {name: 'Precio',  width: '20%'},
            {name: '#',width: '6%',},
            {name: 'Subtotal',width: '20%'}
        ], 
        data: sale_detail.map(item => [item.id, item.Product.name, item.Product.Category.name, utilities.render_money_string(item.Product.Price.sale), item.quanty, utilities.render_money_string(item.subtotal)])
    });
    
    
    grid.render(document.getElementById('sale_detail_grid'))
    let new_grid = document.getElementById('sale_detail_grid')
    let gridjs_container = new_grid.childNodes[0]
    gridjs_container.style.width = ''
}

class TotalSalaryPlugin extends BaseComponent {
    constructor(...props) {
      super(...props);
      
      this.state = {
        total: 0
      };
    }
    
    setTotal() {

      this.config.pipeline.process().then(data => {
        this.setState({
          //total: data.toArray().reduce((prev, row) => prev + row[5], 0)
          total: data.toArray().reduce((prev, row) => prev + utilities.input_money_to_int(row[7]) , 0)
        });
      });
    }
    
    componentDidMount() {
      // initial setState
      this.setTotal();
      this.config.pipeline.on('updated', this.setTotal.bind(this));
    }

    render() {
      return h('b', {}, 'Total: ' + utilities.render_money_string(this.state.total))
    }
}

class PrintReportPlugin extends BaseComponent {
    constructor(...props) {
        super(...props);
        
        this.state = {
            start: 'por definir',
            end: 'por definir',
            category: 'por definir',
            total:0
        };
      }
      setTotal() {

        this.config.pipeline.process().then(data => {
          this.setState({
            //total: data.toArray().reduce((prev, row) => prev + row[5], 0)
            total: data.toArray().reduce((prev, row) => prev + utilities.input_money_to_int(row[7]) , 0)
          });
        });
      }
      
      set_info() {
  
        this.config.pipeline.process().then(data => {
          this.setState({
            start: start_sales_grid_date_imput.value,
            end:end_sales_grid_date_imput.value,
            category: $('#sales_grid_ctaegory_select option:selected').text()
            //sales_grid_ctaegory_select.value
          })
          this.setTotal()
        });
      }
      
      componentDidMount() {
        // initial setState
        this.set_info();
        this.config.pipeline.on('updated', this.set_info.bind(this));
      }
    print_report() {
        if (printer.print_test_conn() == 'err'){
            utilities.show_alert('Error de conexión con la impresora.', 'err')
        } else {
            this.config.pipeline.process().then(res => { 
                let data = res.toArray()
                data = data.map(item => [item[2], item[4], item[7], item[6].charAt(0)])
                printer.print_grid_report(data, this.state.total, this.state.start, this.state.end, this.state.category)
                console.log(data)
            })
        }
    }

    print_category_report(){
      if (printer.print_test_conn() == 'err'){
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        this.config.pipeline.process().then(res => { 
            let data = res.toArray()
            data = data.map(item => [item[2], item[4], item[7], item[6].charAt(0)])
            printer.print_grid_report(data, this.state.total, this.state.start, this.state.end, this.state.category)
            console.log(data)
        })
    }

    }
    render() {
        return h('button',{onClick: () => this.print_report(), className:'btn btn-secondary btn-grid-background'}, (html('<i class="bi bi-printer"></i>')) );
        //h('b', { className: 'btn btn-secondary btn-grid', onClick: () => print_report()}, (html('<i class="bi bi-cart-plus"></i>')))
    }
}

class HeaderPlugin extends BaseComponent {

    constructor(...props) {
        super(...props);
        
        this.state = {
            start: 'por definir',
            end: 'por definir',
            category: 'por definir',
        };
      }
      
      set_info() {
  
        this.config.pipeline.process().then(data => {
          this.setState({
            start: start_sales_grid_date_imput.value,
            end:end_sales_grid_date_imput.value,
            category: $('#sales_grid_ctaegory_select option:selected').text()
            //sales_grid_ctaegory_select.value
          });
        });
      }
      
      componentDidMount() {
        // initial setState
        this.set_info();
        this.config.pipeline.on('updated', this.set_info.bind(this));
      }
  
      render() {
        return [
            h('h5', {}, 'Detalle de Ventas'), 
            h('br', {}),
            h('a', {}, 'fecha inicial: ' + this.state.start + ' -- fecha final : ' + this.state.end + ' -- categoría : ' + this.state.category)
        ]
        //h('b', {}, 'Total: ' + utilities.render_money_string(this.state.total))
      }
}

function render_for_sales(sales_details){
    let old_grid = document.getElementById('sales_grid')
    old_grid.remove()
    let container_grid = document.getElementById('sales_grid_container')
    container_grid.appendChild(utilities.grid_container('sales_grid'))
    //let items_per_page = parseInt(((window.screen.availHeight*0.67)/50))

    var grid = new Grid({
        search: true,
        sort: true,
        //pagination: { items_per_page},
        language: translate.es_ES,
        columns: [
            {name: 'Venta',  width: '9%'},
            {name: 'Código',  width: '10%'},
            {name: 'Producto',  width: '22%'},
            {name: 'Categoría',  width: '15%'},
            {name: 'Fecha',  width: '13%'},
            {name: 'Hora',width: '9%',},
            {name: 'Pago',width: '10%',},
            {name: 'Subtotal',width: '12%'}
        ], 
        data: sales_details.map(item => [item.sale_id, item.Product.code, item.Product.name, item.Product.Category.name, moment(item.createdAt).format('DD-MM-yyyy'), moment(item.createdAt).format('HH:mm'), item.Sale.payment_method, utilities.render_money_string(item.subtotal)])
    });
    

    grid.plugin.add({
        id: 'salaryplugin',
        component: TotalSalaryPlugin,
        position: PluginPosition.Footer,
    })

    grid.plugin.add({
        id: 'report_plugin',
        component: PrintReportPlugin,
        position: PluginPosition.Footer,
        order: 1
    })

    grid.plugin.add({
        id: 'header_plugin',
        component: HeaderPlugin,
        position: PluginPosition.Header,
        //order: 1
    })

    grid.render(document.getElementById('sales_grid'))
    let new_grid = document.getElementById('sales_grid')
    let gridjs_container = new_grid.childNodes[0]

    gridjs_container.style.width = ''
    // let header_grid = gridjs_container.childNodes[1]
    // let header_grid_title = document.createElement('h5')
    // header_grid_title.textContent = 'Detalle de ventas'
    // header_grid.appendChild(header_grid_title)
}

module.exports = {render, render_for_sales}