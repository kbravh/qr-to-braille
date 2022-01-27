export const qrToBraille = (qr: number[][]): string[][] => {
  const braille = []

  for (let r = 0; r < qr[r].length; r += 2) {
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

const brailleToQr = (braille: string[][]): number[][] => {
  const qr: number[][] = new Array(braille.length)
    .fill(0)
    .map(() => new Array(qr[0].length).fill(0))



  return qr
}

export const binaryToCharacter = (binary: string): string =>
  String.fromCodePoint(parseInt(parseInt(binary, 2).toString(16), 16) + 0x2800)

export const characterToBinary = (character: string): string =>
  (character.codePointAt(0) - 0x2800).toString(2).padStart(8, '0')

export const printBraille = (braille: string[][]): string =>
  braille.map(row => row.join('')).join('\n')
