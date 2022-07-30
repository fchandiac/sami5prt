
const config = require('./config')



function timbre_str(total){
    let data = {'emisor' : {'tipodoc' : '39','servicio' : 3},
        'detalles' : [{'codigo' : '10001', 'nombre' : 'Venta','cantidad' : 1, 'precio' : total,'exento' : false}],
        'expects' : 'all'}
    const timbre_str = new Promise((resolve, reject) => {

        fetch('https://www.lioren.cl/api/boletas', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + config.lioren_token}
        }).then(res => {
            res.json().then(res => {
                let xml = res.xml
                let buff = Buffer.from(xml, 'base64');
                xml = buff
                var parseString = require('xml2js').parseString; // paso de xml a json
                parseString(xml, function (err, result) {
                        xml = result
                });

                let iva = xml.DTE.Documento[0].Encabezado[0].Totales[0].IVA[0]
       

    
                //--------- RUT EMISOR -----------//
                let RE = xml.DTE.Documento[0].TED[0].DD[0].RE[0]
                //--------- TIPO DOCUMENTO -----------//
                let TD = xml.DTE.Documento[0].TED[0].DD[0].TD[0]
                //--------- FOLIO -----------//
                let F = xml.DTE.Documento[0].TED[0].DD[0].F[0]
                //--------- FECHA -----------//
                let FE = xml.DTE.Documento[0].TED[0].DD[0].FE[0]
                //--------- RR -----------//
                let RR = xml.DTE.Documento[0].TED[0].DD[0].RR[0]
                //--------- RSR -----------//
                let RSR = xml.DTE.Documento[0].TED[0].DD[0].RSR[0]
                //--------- MONTO -----------//
                let MNT = xml.DTE.Documento[0].TED[0].DD[0].MNT[0]
                //--------- ITEM1 -----------//
                let IT1 = xml.DTE.Documento[0].TED[0].DD[0].IT1[0]
                //--------- TSTED -----------//
                let TSTED = xml.DTE.Documento[0].TED[0].DD[0].TSTED[0]
                //--------- CAF -----------//
                let CAF = xml.DTE.Documento[0].TED[0].DD[0].CAF[0]
                //--------- FRMT -----------//
                let FRMT = xml.DTE.Documento[0].TED[0].FRMT[0]._
    
                let timbre_str = '<TED version="1.0"><DD>' +
                    '<RE>' + RE+'</RE>' +
                    '<TD>'+ TD +'</TD>' +
                    '<F>'+ F +'</F>' +
                    '<FE>'+ FE +'</FE>' +
                    '<RR>'+ RR +'</RR>' +
                    '<RSR>'+ RSR +'</RSR>' +
                    '<MNT>'+ MNT +'</MNT>' +
                    '<IT1>'+ IT1 +'</IT1>' +
                    '<CAF version="1.0"><DA>' +
                    '<RE>'+ CAF.DA[0].RE[0] +'</RE>' +
                    '<RS>'+ CAF.DA[0].RS[0] + '</RS>' +
                    '<TD>'+ CAF.DA[0].TD[0] +'</TD>' +
                    '<RNG><D>'+ CAF.DA[0].RNG[0].D[0] +'</D>' +
                    '<H>'+ CAF.DA[0].RNG[0].H[0] +'</H></RNG>' +
                    '<FA>'+ CAF.DA[0].FA[0] +'</FA>'+
                    '<RSAPK><M>'+ CAF.DA[0].RSAPK[0].M[0] +'</M>' +
                    '<E>'+ CAF.DA[0].RSAPK[0].E[0] +'</E></RSAPK>' + 
                    '<IDK>'+ CAF.DA[0].IDK[0] +'</IDK></DA>'+
                    '<FRMA algoritmo="SHA1withRSA">'+ CAF.FRMA[0]._ +'</FRMA></CAF>'+
                    '<TSTED>'+ TSTED +'</TSTED></DD>'+
                    '<FRMT algoritmo="SHA1withRSA">'+ FRMT +'</FRMT></TED>'
                
                // console.log(timbre_str)
                resolve([timbre_str, iva, F])
    
               //console.log(xml.DTE.Documento[0])
                
    
            }).catch(err => {
                reject(err)
            })
        })

        
    })
    return timbre_str
    
    

   
}


module.exports = {timbre_str}


// <TED version="1.0">
        //     <DD>
        //         <RE>78543570-2</RE>
        //         <TD>39</TD>
        //         <F>45402</F>
        //         <FE>2021-12-22</FE>
        //         <RR>66666666-6</RR>
        //         <RSR>Publico General</RSR>
        //         <MNT>200</MNT>
        //         <IT1>Venta</IT1>
        //         <CAF version="1.0">
        //             <DA>
        //                 <RE>78543570-2</RE>
        //                 <RS>TAPIA Y COFRE LIMITADA</RS>
        //                 <TD>39</TD>
        //                 <RNG>
        //                     <D>40101</D>
        //                     <H>50100</H>
        //                 </RNG>
        //                 <FA>2021-11-06</FA>
        //                 <RSAPK>
        //                     <M>vc0qoeRHgC93rnVSKqToPbveI8BqxtC2k0PmWwHfEcs9xXno/f/BD6+UWt+mwHLM/4Xj/n6OejS5iQaJrueRcw==</M>
        //                     <E>Aw==</E>
        //                 </RSAPK>
        //                 <IDK>300</IDK>
        //             </DA>
        //             <FRMA algoritmo="SHA1withRSA">FbdK7xF40SQ8Dvm0fWE/0VjfvHrb3c1V7i5lcTbhpuwcL4kjG0aWdiJXrk9T9RDn/G85KH7g/jSFffdiFxzxlw==</FRMA>
        //         </CAF>
        //         <TSTED>2021-12-22T01:28:28</TSTED>
        //     </DD>
        // <FRMT algoritmo="SHA1withRSA">ElvPoDqEEYqIBXNwEKgum93kaIgxV2Ni8MQgTp5MTahOzoOSOpvhzZJVPH4wKoEqoJlHrRI4hS/T8anUShmKfw==</FRMT>
        // </TED>