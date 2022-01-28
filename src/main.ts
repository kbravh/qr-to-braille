import {matrixQr} from './testData'
import {qrToBraille, brailleToQr, print2dMatrix, qrToEmoji} from './util'

const braille = qrToBraille(matrixQr)
console.log(braille)

console.log(print2dMatrix(braille))

const qr = brailleToQr(braille)
console.log(qr)

console.log(print2dMatrix(qr))

console.log(qrToEmoji(qr))
