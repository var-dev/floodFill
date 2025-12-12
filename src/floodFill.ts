import strict from "node:assert/strict"
import { Grid } from 'grid'
import { printImage } from "./utils.js"

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



function doesNorthNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getCell(x, y - 1) === ORIGINAL
}
function doesSouthNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getCell(x, y + 1) === ORIGINAL
}
function doesEastNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getCell(x - 1, y) === ORIGINAL
}
function doesWestNeedWork(x: number, y: number, img: Grid<string>): boolean{
  return img.getCell(x + 1, y) === ORIGINAL
}

function floodFill(x: number, y: number, img: Grid<string>){
  img.setCell(x, y, REPLACEMENT)
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



console.log(printImage(image, WIDTH, HEIGHT))
const grid = new Grid(WIDTH, HEIGHT, ()=>'X', ()=>'X', [...image]  )
floodFill(4,4, grid)
console.log(printImage(grid, WIDTH, HEIGHT))
// console.log(grid.getCell(5,5))

