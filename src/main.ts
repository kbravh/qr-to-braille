import {qr} from './testData'
import {qrToBraille, brailleToQr, print2dMatrix} from './util'

const braille = qrToBraille(qr)

console.log(print2dMatrix(braille))

const qrParsed = brailleToQr(braille)

console.log(print2dMatrix(qrParsed))
