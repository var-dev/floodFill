import strict from "node:assert/strict"

const image = Array.from(
'..########################...........'+
'..#......................#...#####...'+
'..#..........########....#####...#...'+
'..#..........#......#............#...'+
'..#..........########.........####...'+
'..######......................#......'+
'.......#..#####.....###########......'+
'.......####...#######................')

const image2 = Array.from(
'.....................................'+
'..########################...........'+
'..#......................#...#####...'+
'..#..........########....#####...#...'+
'..#..........#......#............#...'+
'..#..........########.........####...'+
'..######......................#......'+
'.......#..#####.....###########......'+
'.......####...#######................'+
'.....................................')

const WIDTH = 37
if(image.length % WIDTH !== 0) throw new Error( 'Image width is not valid')
const HEIGHT = image.length / WIDTH
const ORIGINAL = '.'
const REPLACEMENT = 'O'
const WALL = '#'


type Coordinate = [number, number]

class Grid<T> extends Array{
  private readonly _width: number
  private readonly _height: number
  constructor(width: number, height: number, private outBoundsCbX: ()=>T | void = ()=>{}, private outBoundsCbY: ()=>T | void = ()=>{}, array: Array<T> = []){
    super()
    this._width = width
    this._height = height
    this.push(...array)
  }
  public index (x: number, y: number): number{
    return y * this.width + x 
  }
  getXy(x: number, y: number): T {
    if(x < 0 || x >= this.width ) { return this.outBoundsCbX() ?? this[0] }
    if(y < 0 || y >= this.height) { return this.outBoundsCbY() ?? this[0] }
    return this[this.index(x, y)]
  }
  setXy(x: number, y: number, value: T): T{
    if(x < 0 || x >= this.width ) { return this.outBoundsCbX() ?? this[0] }
    if(y < 0 || y >= this.height) { return this.outBoundsCbY() ?? this[0] }
    this[this.index(x, y)] = value
    return value
  }
  get width(){
    return this._width
  }
  get height(){
    return this._height
  }
}

function doesNorthNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getXy(x, y - 1) === ORIGINAL
}
function doesSouthNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getXy(x, y + 1) === ORIGINAL
}
function doesEastNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getXy(x - 1, y) === ORIGINAL
}
function doesWestNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getXy(x + 1, y) === ORIGINAL
}

function floodFill(x: number, y: number, img: Grid<string>){
  img.setXy(x, y, REPLACEMENT)
  if(doesNorthNeedWork(x, y, img)){
    floodFill(x, y - 1, img)
  }
  if(doesSouthNeedWork(x, y, img)){
    floodFill(x, y + 1, img)
  }
  if(doesEastNeedWork(x, y, img)){
    floodFill(x - 1, y, img)
  }
  if(doesWestNeedWork(x, y, img)){
    floodFill(x + 1, y, img)
  }
}

function printImage(img: Array<string>): string{
  let result = ''
  for(let i = 0; i < HEIGHT; i++){
    result += (img.slice(i * WIDTH, (i + 1) * WIDTH).join('')) + '\n'
  }
  return result
}

console.log(printImage(image))
const grid = new Grid(WIDTH, HEIGHT, ()=>'X', ()=>'X', [...image]  )
floodFill(4,4, grid)
console.log(printImage(grid))
// console.log(grid.getXy(5,5))

