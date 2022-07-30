const Chart = require('chart.js')
const moment = require('moment')
const utilities = require('./utilities')
const sales = require('./promises/sales')
const sales_detail = require('./promises/sales_detail')
const sales_details_grid = require('./grids/sale_detail')
const ChartDataLabels = require('chartjs-plugin-datalabels')
const printer = require('./printer')

const canvas_sales_month_chart = document.getElementById('sales_month_chart')
const canvas_sales_day_chart = document.getElementById('sales_day_chart')
const canvas_sales_categories_chart = document.getElementById('sales_categories_chart')
const canvas_sales_products_chart = document.getElementById('sales_products_chart')
const config_categories_chart_btn = document.getElementById('config_categories_chart_btn')
const config_products_chart_btn = document.getElementById('config_products_chart_btn')
const categories_chart_btn = document.getElementById('categories_chart_btn')
const category_start_date_input = document.getElementById('category_start_date_input')
const category_end_date_input = document.getElementById('category_end_date_input')
const product_start_date_input = document.getElementById('product_start_date_input')
const product_end_date_input = document.getElementById('product_end_date_input')
const products_chart_btn = document.getElementById('products_chart_btn')
const render_grid_btn = document.getElementById('render_grid_btn')
const sales_grid_ctaegory_select = document.getElementById('sales_grid_ctaegory_select')
const start_sales_grid_date_imput = document.getElementById('start_sales_grid_date_imput')
const end_sales_grid_date_imput = document.getElementById('end_sales_grid_date_imput')
const total_grid_sales_label = document.getElementById('total_grid_sales_label')
const print_month_sales_btn = document.getElementById('print_month_sales_btn')
const products_chart_form = document.getElementById('products_chart_form')
const categories_chart_form = document.getElementById('categories_chart_form')
const sales_grid_form = document.getElementById('sales_grid_form')

document.addEventListener("DOMContentLoaded", function(){
  $('#content_config_categories_chart').hide()
  $('#up_icon_config_categories_chart').hide()
  $('#content_config_products_chart').hide()
  $('#up_icon_config_products_chart').hide()
  utilities.list_categories_on_select_for_grid_sale(sales_grid_ctaegory_select,1)
  
})

config_categories_chart_btn.addEventListener('click', () => {
    $('#content_config_categories_chart').toggle(1000)
    $('#up_icon_config_categories_chart').toggle()
    $('#down_icon_config_categories_chart').toggle()
})
config_products_chart_btn.addEventListener('click', () => {
    $('#content_config_products_chart').toggle(1000)
    $('#up_icon_config_products_chart').toggle()
    $('#down_icon_config_products_chart').toggle()
})
categories_chart_btn.addEventListener('click', () => {
    if (categories_chart_form.checkValidity()){
        render_categories_chart(category_start_date_input.value, category_end_date_input.value)
        $('#content_config_categories_chart').toggle(1000)
        $('#up_icon_config_categories_chart').toggle()
        $('#down_icon_config_categories_chart').toggle()
    }
    
})
products_chart_btn.addEventListener('click', () => {
    if (products_chart_form.checkValidity()){
        render_products_chart(product_start_date_input.value, product_end_date_input.value)
        $('#content_config_products_chart').toggle(1000)
        $('#up_icon_config_products_chart').toggle()
        $('#down_icon_config_products_chart').toggle()
    }
})

render_grid_btn.addEventListener('click', () => {
    if (sales_grid_form.checkValidity()){
        if (sales_grid_ctaegory_select.value == 0){
            render_sales_grid(start_sales_grid_date_imput.value, end_sales_grid_date_imput.value)
        } else {
            render_sales_grid_by_category(
                start_sales_grid_date_imput.value, 
                end_sales_grid_date_imput.value,
                sales_grid_ctaegory_select.value
            )
        }
    }
})

print_month_sales_btn.addEventListener('click', () => {
    let end_date = moment(new Date())
    let start_date = moment(end_date).subtract((end_date.date()-1), 'days')
    if (printer.print_test_conn() == 'err'){
        utilities.show_alert('Error de conexión con la impresora.', 'err')
    } else {
        sales.find_all_by_date_range_group_by_date(start_date.format('YYYY-MM-DD'), end_date.format('YYYY-MM-DD'))
        .then(res => {
            let month_total = 0
            res.forEach(item => {
                month_total = month_total + item.total_amount
            })
            printer.print_sales_report(res, month_total)
            // console.log(res)
        })
    }
})
let background_color = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]
let border_color = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]
//--------- CHARTS -----------//

var sales_months_chart = new Chart(canvas_sales_month_chart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: []
    }, 
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
              display: true,
              text: 'Chart Title',
            },
            tooltip: {
                callbacks: {
                    label: function(context){
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += utilities.render_money_string(context.parsed.y)
                            //label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                        }
                        return label
                    }
                }
            }
        }
    }
})


var sales_day_chart = new Chart(canvas_sales_day_chart, {
    type: 'bar',
    data: {
        labels: [],
        datasets: []
    }, 
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
              display: true,
              text: 'Chart Title',
            },
            tooltip: {
                callbacks: {
                    label: function(context){
                        var label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += utilities.render_money_string(context.parsed.y)
                            //label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y)
                        }
                        return label
                    }
                }
            }
        }
    }
})

var sales_categories_chart = new Chart(canvas_sales_categories_chart, {
    plugins: [ChartDataLabels],
    type: 'doughnut',
    data: {
        labels: [],
        datasets: []
    }, 
    options: {
        responsive: true,
        scales: {
            y: {
                display: false,
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            title: {
              display: true,
              text: 'Chart Title',
            },
            datalabels: {
                color: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                formatter: function(value, canvas_sales_categories_chart) {
                    let sum = 0;
                    let dataArr = canvas_sales_categories_chart.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(1)+"%";
                    return percentage;
                    //return canvas_sales_categories_chart.dataIndex + ': ' + Math.round(value*100) + '%';
                }
            },
            tooltip: {
                callbacks: {
                    label: function(canvas_sales_categories_chart){
                        var index = canvas_sales_categories_chart.dataIndex
                        var label_conetext = canvas_sales_categories_chart.chart.data.labels[index]
                        var amount = canvas_sales_categories_chart.chart.data.datasets[0].data[index]
                        var label = label_conetext + ': ' + utilities.render_money_string(amount) 
                        return label
                    }
                }
            }
            
            
            
        }
    }
})

var sales_products_chart = new Chart(canvas_sales_products_chart, {
    plugins: [ChartDataLabels],
    type: 'doughnut',
    data: {
        labels: [],
        datasets: []
    }, 
    options: {
        responsive: true,
        scales: {
            y: {
                display: false,
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
                display: false,
                position: 'bottom'
            },
            title: {
              display: true,
              text: 'Chart Title',
            },
            datalabels: {
                color: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 206, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                    'rgba(255, 159, 64, 0.8)'
                ],
                formatter: function(value, canvas_sales_products_chart) {
                    let sum = 0;
                    let dataArr = canvas_sales_products_chart.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value*100 / sum).toFixed(1)+"%";
                    return percentage;
                }
            },
            tooltip: {
                callbacks: {
                    label: function(canvas_sales_products_chart){
                        var index = canvas_sales_products_chart.dataIndex
                        var label_conetext = canvas_sales_products_chart.chart.data.labels[index]
                        var amount = canvas_sales_products_chart.chart.data.datasets[0].data[index]
                        var label = label_conetext + ': ' + utilities.render_money_string(amount) 
                        return label
                    }
                }
            }
            
        }
    }
})

//--------- GRID -----------//




//--------- FUNCTIIONS -----------//

function render_day_sales_chart(today){
    

    let start_day = moment(today).subtract(6, 'day')

    let promises_days_list = []
    let period_day_to_chart = utilities.period_days_range(start_day, today)
    
    period_day_to_chart.forEach(item => {
        promises_days_list.push(sales.find_one_by_date(moment(item).format("YYYY-MM-DD")))
    })

    let labels = []
    period_day_to_chart.forEach(item => {
        labels.push(utilities.render_day(moment(item).weekday()))
    })

    let data = []

    Promise.all(promises_days_list).then(res => {
        remove_data_to_chart(sales_day_chart)
        res.forEach(day => {
            let amount = 0
            if (day != null) {
                amount = day.total_amount
            }
            data.push(amount)
        })
        // console.log(data)
        add_data_to_chart(sales_day_chart, labels, '', data, 'Ventas últimos 7 días.')
        
    })
}


function render_month_sales_chart(start_month, today, title){

    let promises_months_list = []
    let period_months_to_chart = utilities.period_month_range(start_month, today)

    period_months_to_chart.forEach(item => {
        promises_months_list.push(sales.find_all_by_month_and_year((item.month + 1), item.year))
    })

    Promise.all(promises_months_list).then(res => {
        //console.log(res)
        remove_data_to_chart(sales_months_chart)
        let labels = []
        let data = []
        period_months_to_chart.forEach(item => {
            labels.push(utilities.render_month(item.month))
        })
        //console.log(labels)
        res.forEach(month => {
            let month_amount = 0
            month.forEach(sale => {
                month_amount = month_amount + sale.amount
            })
            data.push(month_amount)
        })
        add_data_to_chart(sales_months_chart, labels, '', data, title)
    })
}

function render_categories_chart(start_date, end_date){
    //let start_date = moment('2021-05-01').format("YYYY-MM-DD")
    //let end_date = moment('2021-12-18').format("YYYY-MM-DD")
    
    remove_data_to_chart(sales_categories_chart)
    sales_detail.find_all_by_date_range_group_by_category(start_date, end_date)
    .then(res=>{
        let categories = []
        res.forEach(item => {
            let index = res.indexOf(item)
            if (index <= 4){
                let category = {'name': item.category_name, 'amount':item.total_amount}
                categories.push(category)
            }
        });

        if (res.length >= 5){
            let name = 'otras'
            let amount = 0
            res.forEach(item => {
                let index = res.indexOf(item)
                if (index >= 5){
                    amount = amount + item.total_amount 
                }
            });
            let others = {'name': name, 'amount':amount}
            categories.push(others)

        }
        

        let data = []
        let labels = []

        categories.forEach(item => {
            data.push(item.amount)
            labels.push(item.name)
        })

        let title = 'Top 5 Categorías ' + moment(start_date).format("DD-MM-yyy") + ' a ' + moment(end_date).format("DD-MM-yyy") + '.'

        add_data_to_chart(sales_categories_chart, labels, '', data, title)
        //console.log(categories)
    })
    
}

function render_products_chart(start_date, end_date){
    //let start_date = moment('2021-05-01').format("YYYY-MM-DD")
    //let end_date = moment('2021-12-18').format("YYYY-MM-DD")
    
    remove_data_to_chart(sales_products_chart)
    sales_detail.find_all_by_date_range_group_by_product(start_date, end_date)
    .then(res=>{
        let products = []
        res.forEach(item => {
            let index = res.indexOf(item)
            if (index <= 4){
                let product = {'name': item.Product.name, 'amount':item.total_amount}
                products.push(product)
            }
        });

        if (res.length >= 5){
            let name = 'otros'
            let amount = 0
            res.forEach(item => {
                let index = res.indexOf(item)
                if (index >= 5){
                    amount = amount + item.total_amount 
                }
            });
            let others = {'name': name, 'amount':amount}
            products.push(others)

        }
        

        let data = []
        let labels = []

        products.forEach(item => {
            data.push(item.amount)
            labels.push(item.name)
        })

        let title = 'Top 5 Productos ' + moment(start_date).format("DD-MM-yyyy") + ' a ' + moment(end_date).format("DD-MM-yyyy") + '.'

        add_data_to_chart(sales_products_chart, labels, '', data, title)
        //console.log(categories)
    })
    
}


function add_data_to_chart(chart, labels, data_label, data, title){
    chart.data.labels = labels
    let dataset = dataset_to_chart(data_label, data)
    chart.options.plugins.title.text = title
    chart.data.datasets.push(dataset)
    chart.update()

}


function dataset_to_chart(data_label, data){
    let dataset ={
        label: data_label,
        data: data,
        backgroundColor: background_color,
        borderColor: border_color,
        borderWidth: 1
    }
    return dataset
}

function remove_data_to_chart(chart) {

    chart.data.labels = []
    chart.data.datasets = []
    chart.update()
}

function render_sales_grid(start_date, end_date){
    var end_date = moment(end_date)
    var start_date = moment(start_date)

    sales_detail.find_all_by_date_range(start_date.format('yyyy-MM-DD'),end_date.format('yyyy-MM-DD'))
    .then(res => {
        sales_details_grid.render_for_sales(res)
    })
}

function render_sales_grid_by_category(start_date, end_date, category_id){
    var end_date = moment(end_date)
    var start_date = moment(start_date)
    sales_detail.find_all_by_date_range_and_category(
        start_date.format('yyyy-MM-DD'),
        end_date.format('yyyy-MM-DD'),
        category_id).then(res => {
            sales_details_grid.render_for_sales(res)
            sales_detail.find_total_by_date_range_and_category(
                start_date.format('yyyy-MM-DD'),
                end_date.format('yyyy-MM-DD'),
                category_id
            ).then(total => {
                //console.log(total[0].total_amount)
                if (total[0].total_amount != null){
                    total_grid_sales_label.innerText = 'Total: ' + utilities.render_money_string(total[0].total_amount)
                } else {
                    total_grid_sales_label.innerText = 'Total: $0'
                }
                //total_grid_sales_label.innerText = 'Total: ' + utilities.render_money_string(total[0].total_amount)
            })
        })

}


module.exports = {render_month_sales_chart, 
    render_day_sales_chart, 
    render_categories_chart,
    render_products_chart,
    render_sales_grid

}