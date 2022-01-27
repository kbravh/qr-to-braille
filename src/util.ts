export const qrToBraille = (qr: number[][]): string[][] => {
  const braille = []

  for (let r = 0; r < qr.length; r += 4) {
    const row = []
    for (let c = 0; c < qr[r].length; c += 2) {
      /**
       * A binary representation of the block as 87654321.
       * Braille positions are as follows:
       * 1 4
       * 2 5
       * 3 6
       * 7 8
       */
      const binary =
        `${qr[r + 3]?.[c + 1] ?? 0}` + // 8
        `${qr[r + 3]?.[c] ?? 0}` + // 7
        `${qr[r + 2]?.[c + 1] ?? 0}` + // 6
        `${qr[r + 1]?.[c + 1] ?? 0}` + // 5
        `${qr[r]?.[c + 1] ?? 0}` + // 4
        `${qr[r + 2]?.[c] ?? 0}` + // 3
        `${qr[r + 1]?.[c] ?? 0}` + // 2
        `${qr[r]?.[c] ?? 0}` // 1

      const characterCode = binaryToCharacter(binary)
      row.push(characterCode)
    }
    braille.push(row)
  }

  return braille
}

export const brailleToQr = (braille: string[][]): number[][] => {
  let qr: number[][] = new Array(braille.length * 4)
    .fill(0)
    .map(() => new Array(braille[0].length * 2).fill(0))

  braille.forEach((row, rowIndex) => {
    row.forEach((character, charIndex) => {
      const r = rowIndex * 4
      const c = charIndex * 2
      const binary = characterToBinary(character)
      qr[r][c] = +binary[7]
      qr[r + 1][c] = +binary[6]
      qr[r + 2][c] = +binary[5]
      qr[r][c + 1] = +binary[4]
      qr[r + 1][c + 1] = +binary[3]
      qr[r + 2][c + 1] = +binary[2]
      qr[r + 3][c] = +binary[1]
      qr[r + 3][c + 1] = +binary[0]
    })
  })

  // cleanup empty rows and columns of pure zeros
  qr = qr.flatMap(row => [
    row
      .join('')
      .replaceAll(/0*$/g, '')
      .split('')
      .map(num => +num),
  ])

  return qr
}

const binaryToCharacter = (binary: string): string =>
  String.fromCodePoint(parseInt(parseInt(binary, 2).toString(16), 16) + 0x2800)

const characterToBinary = (character: string): string =>
  (character.codePointAt(0) - 0x2800).toString(2).padStart(8, '0')

// https://github.com/tc39/proposal-relative-indexing-method#polyfill
const at = (arr: any[], n: number) => {
  // ToInteger() abstract op
  n = Math.trunc(n) || 0
  // Allow negative indexing from the end
  if (n < 0) n += arr.length
  // OOB access is guaranteed to return undefined
  if (n < 0 || n >= arr.length) return undefined
  // Otherwise, this is just normal property access
  return arr[n]
}

export const print2dMatrix = (matrix: string[][] | number[][]): string =>
  matrix.map(row => row.join('')).join('\n')
