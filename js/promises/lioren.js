
const config = require('../config')
const utilities = require('../utilities')

function lioren_authorization_test() {
    const test = new Promise((resolve, reject) => {
        fetch('https://www.lioren.cl/api/whoami', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.lioren_token
            }
        }).then(res => {
            if(res.status == 401){
                utilities.show_alert('Error de autorización de Lioren. Verificar pago de facturas, vigencia de firma o token.', 'err')
                reject(res.status)
            } else {
                res.json().then(res => {resolve(res)})
                
            }
            //console.log(res)
        })
        .catch(err => { console.log(err)})

    })

    return test
}

module.exports = {lioren_authorization_test}

//eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0MjgiLCJqdGkiOiJiOTM5OGNiNmJmOWMxMzMxZTg5MGJjYmM0NmMyNzAyOGZjYzM4Yjg0NDUwYWQ5MzYyNGY4NGUyMTIzMGY1NDU3MDg2MjM5MmY5ZWMyYzIxZCIsImlhdCI6MTY0NTg5MjExNCwibmJmIjoxNjQ1ODkyMTE0LCJleHAiOjE2Nzc0MjgxMTQsInN1YiI6IjI5MTciLCJzY29wZXMiOltdfQ.cw55CHyCKMFkm-w-7W4usKrKwAeaZR3TFs4YIJ3kYR3XtaEHwKgoYk2vLkUvueNS66TceBv6YkUxOq59pUSBEbshcInn0-da7RiAlwEZ0otkv4IL39gR15Zl4WtQqpx8uqhzGEvkvoAloq9CeUsdxddoVgDVy_d8JD8cjoPDNtbL5RTZFXU3r9z9_d7WFWpjkTCSjD2ddY3uiDeXY3qYUIIQEce0oQvjtA0WfhoFluR_7kmAx78q1rZhBv7KOnSkqks0DcdDV_60uEiglfOmyUdR13PBHwNbW629kFbA3pIycxIs9ohn2nYLLu8_KHTqBEjNfymGoiJ_EKQH8GlJ2ly9auLdMY89dN1uy6QcLNwb-7dtwdNb2FHr6zT6n_8iIw-NGTFuvbvgAlleu5Qb5E9RnHIM-_BGHYs2Lc_BCOZBWFYw15yF8_CzpbuaBhH4EXUECYbAaFkDx-gSW8ShC-meBvJL9-76CnDNUit6GD5_QHubuQ2kNlswjXfKuN9bpLwQHPqwYI6IuNb78dqEBVG1of7IaxvdYzeZn5Ae46ANIVN_sNpTSoCvPFQw8W9F6DuPO35ow-EwtLgsgFWTQJ2zV4zB-Q6OsfKExPBpjo2fqyBxFm8nMTSJEmSnLGX6SN3pycLP1wXFKN93FUPE5sYjg_jVEvdy-FtxkrJJ3DQ


