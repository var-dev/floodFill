export function printImage(img: Array<string>, width: number, height: number): string{
  let result = ''
  for(let i = 0; i < height; i++){
    result += (img.slice(i * width, (i + 1) * width).join('')) + '\n'
  }
  return result
}