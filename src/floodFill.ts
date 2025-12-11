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
  constructor(width: number, height: number, private cbW: ()=>T | void = ()=>{}, private cbH: ()=>T | void = ()=>{}, array: Array<T> = []){
    super()
    this._width = width
    this._height = height
    this.push(...array)
  }
  public index (x: number, y: number): number{
    return y * this.width + x 
  }
  getXy(x: number, y: number): T {
    if(x < 0 || x >= this.width ) { return this.cbW() ?? this[0][0] }
    if(y < 0 || y >= this.height) { return this.cbH() ?? this[0][0] }
    return this[this.index(x, y)]
  }
  setXy(x: number, y: number, value: T): T{
    if(x < 0 || x >= this.width ) { return this.cbW() ?? this[0][0] }
    if(y < 0 || y >= this.height) { return this.cbH() ?? this[0][0] }
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

function calculateCoordinateFromIndex(i: number): Coordinate{
  return [i % WIDTH, Math.floor(i / WIDTH)]
}

function calculateIndexFromCoordinate(c: Coordinate): number{ 
  return c[1] * WIDTH + c[0]
}

function doesNorthNeedWork(c: Coordinate, img: Grid<string>): boolean{
  const [x, y] = c
  return img.getXy(x, y - 1) === ORIGINAL
}
function doesSouthNeedWork(c: Coordinate, img: Grid<string>): boolean{
  const [x, y] = c
  return img.getXy(x, y + 1) === ORIGINAL
}
function doesEastNeedWork(c: Coordinate, img: Grid<string>): boolean{
  const [x, y] = c
  return img.getXy(x - 1, y) === ORIGINAL
}
function doesWestNeedWork(c: Coordinate, img: Grid<string>): boolean{
  const [x, y] = c
  return img.getXy(x + 1, y) === ORIGINAL
}

function isCoordinateNotValid(c: Coordinate, img: Array<string>): boolean{
  const [x, y] = c
  return (img[calculateIndexFromCoordinate(c)] ?? 'X') !== (ORIGINAL || REPLACEMENT)
}

function floodFill(start: Coordinate, img: Grid<string>){
  // if(isCoordinateNotValid(start, img)) return
  console.log(img.setXy(start[0], start[1], REPLACEMENT))
  if(doesNorthNeedWork(start, img)){
    floodFill([start[0], start[1] - 1], img)
  }
  if(doesSouthNeedWork(start, img)){
    floodFill([start[0], start[1] + 1], img)
  }
  if(doesEastNeedWork(start, img)){
    floodFill([start[0] - 1, start[1]], img)
  }
  if(doesWestNeedWork(start, img)){
    floodFill([start[0] + 1, start[1]], img)
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
floodFill([34,0], grid)
console.log(printImage(grid))
// console.log(grid.getXy(5,5))

