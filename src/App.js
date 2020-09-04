import React, { useEffect, useState } from 'react';
//import ( Component ) from 'react''
import { createWorker } from 'tesseract.js';
//import plaatje from './img/log.jpeg';

//export default class App extends React.Component {


/*
  OPZET / PLAN:

  - CAMERA VOOR SCAN VAN ACARS FLT LOG
  - OCR
  - ZOEK VOOR NODIGE INFO
  - DATABASE, WAAR DE LOG IN GAAT
  - BEVESTIGING / AANPASSING GEVRAAGD VOORDAT HET ERIN GESCHOTEN WORDT.


*/


export default function App() {
  console.log('start');
  //  render() {

    const worker = createWorker({
      logger: m => console.log(m),
    });

    const doOCR = async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
      //const { data: { text } } = await worker.recognize('http://boomingwebdesign.nl/eng.png');
      const { data: { text } } = await worker.recognize(require('./img/log3.jpg'));

      console.log(text);
      setOcr(text);
    };
    const [ocr, setOcr] = useState('Recognizing...');
    useEffect(() => {
      console.log('useEffect');
      doOCR();
    });

    const doIt = () => {
      var log = [{          //dit is log[0]
        flightnumber: 'a',
      }];
      var fromI = ocr.indexOf('FROM');
      var fltno = ocr.substr((fromI - 7), 7);
      var from = ocr.substr((fromI + 8), 4);
      var to = ocr.substr((fromI + 13), 4);
      var fltdate = ocr.substr((ocr.indexOf('DATE') + 5), 7);
      var reg = ocr.substr((ocr.indexOf('ID') + 4), 6);
      var offblock = ocr.substr((ocr.indexOf('AIRBORNE') - 5), 4);
      var onblock = ocr.substr((ocr.indexOf('TOUCH') - 5), 4);

      log.push({        //dit is log[1]
        flightnumber: fltno,
        from: from,
        to: to,
        flightdate: fltdate,
        reg: reg
      });


      //console.log('fromI: ' + fromI);
      console.log('flightnumber: ' + fltno);
      console.log('from: ' + from);
      console.log('to: ' + to);
      console.log('date: ' + fltdate);
      console.log('reg: ' + reg);
      console.log('Off blocks: ' + offblock);
      console.log('on blocks: ' + onblock);



      /*

      console.log('log0:' + log[0]);
      console.log('log0 reg:' + log[0].reg);
      console.log('log1 reg:' + log[1].reg);
      console.log('log reg:' + log.reg);
      console.log('log0:' + log[0]);
      console.log('log1:' + log[1]);
      //console.log('log reg:' + log.reg); //undefined
      console.log('log0 reg:' + log[0].reg);
      */

    }

    // van {log[0].from} naar {log[0].to} op {log[0].date} reg: {log[0].reg} </p>
    //<p>{log[0] !== undefined && log[0].flightnumber}</p>
    //{require('./img/log.jpeg')}
    return (
      <div className="App">
        <h1>Hoi hoi!</h1>
        <p>{ocr}</p>
        <p/>
        <img src={require('./img/log3.jpg')} alt='' style={{width: 500, height: 100}} />
        <p/>
        <button type="button" onClick={doIt()}>DoIt!</button>
        <p/>

      </div>
    )
  //}
}
