import { Grid } from "grid"
import { printImage } from "./utils.js"

// Problem: Find path from S to E

const maze = Array.from(
'#######################################################################' +
'#S#                 #       # #   #     #         #     #   #         #' +
'# ##### ######### # ### ### # # # # ### # # ##### # ### # # ##### # ###' +
'# #   #     #     #     #   # # #   # #   # #       # # # #     # #   #' +
'# # # ##### # ########### ### # ##### ##### ######### # # ##### ### # #' +
'#   #     # # #     #   #   #   #         #       #   #   #   #   # # #' +
'######### # # # ##### # ### # ########### ####### # # ##### ##### ### #' +
'#       # # # #     # #     # #   #   #   #     # # #   #         #   #' +
'# # ##### # # ### # # ####### # # # # # # # ##### ### ### ######### # #' +
'# # #   # # #   # # #     #     #   #   #   #   #   #     #         # #' +
'### # # # # ### # # ##### ####### ########### # ### # ##### ##### ### #' +
'#   # #   # #   # #     #   #     #       #   #     # #     #     #   #' +
'# ### ####### ##### ### ### ####### ##### # ######### ### ### ##### ###' +
'#   #         #     #     #       #   # #   # #     #   # #   # #   # #' +
'### ########### # ####### ####### ### # ##### # # ##### # # ### # ### #' +
'#   #   #       # #     #   #   #     #       # # #     # # #   # #   #' +
'# ### # # ####### # ### ##### # ####### ### ### # # ####### # # # ### #' +
'#     #         #     #       #           #     #           # #      E#' +
'#######################################################################' 
)

const WIDTH = 71
if(maze.length % WIDTH !== 0) throw new Error( 'Image width is not valid')
const HEIGHT = maze.length / WIDTH

type Coordinate = {x: number, y: number}
export class MazeSolver {
  private grid: Grid<string>
  private _path: Coordinate[] = []
  private _passageSymbol: string = ' '
  private _startSymbol = 'S'
  private _exitSymbol = 'E'
  private _visitedSymbol = '.'
  private _exitFlag: boolean = false;
  constructor (aMaze: string[] = maze, private _width: number = WIDTH, private _height: number = HEIGHT ){
    this.grid = new Grid<string>(this._width, this._height, ()=>'X', ()=>'X', [...aMaze] )
  }
  startFinder(): Coordinate {
    for(let y = 0; y < this._height; y++){
      for(let x = 0; x < this._width; x++){
        if(this.grid.getCell(x, y) === this._startSymbol){
          return {x, y}
        }
      }
    }
    return {x:1, y:1}
  }
  isNorthPathClear(x: number, y: number): boolean {
    const foundOnPath = this.grid.getCell(x, y - 1)
    return (
      foundOnPath === this._passageSymbol || 
      foundOnPath === this._exitSymbol
    )
  }
  isSouthPathClear(x: number, y: number): boolean {
    const foundOnPath = this.grid.getCell(x, y + 1)
    return (
      foundOnPath === this._passageSymbol || 
      foundOnPath === this._exitSymbol
    )
  }
  isWestPathClear(x: number, y: number): boolean {
    const foundOnPath = this.grid.getCell(x - 1, y)
    return (
      foundOnPath === this._passageSymbol || 
      foundOnPath === this._exitSymbol
    )
  }
  isEastPathClear(x: number, y: number): boolean {
    const foundOnPath = this.grid.getCell(x + 1, y)
    return (
      foundOnPath === this._passageSymbol || 
      foundOnPath === this._exitSymbol
    )
  }

  solver(x: number, y: number){
    if(this.isExitSymbolFound(x, y)){
      this._exitFlag = true
      return
    }
    this.recordStepOnPath(x, y)
    console.log(printImage(this.grid, this._width, this._height))

    if(this.isNorthPathClear(x, y)){ this.goNorth(x, y) }
    if(this.isSouthPathClear(x, y)){ this.goSouth(x, y) }
    if(this.isWestPathClear(x, y)){ this.goWest(x, y) }
    if(this.isEastPathClear(x, y)){ this.goEast(x, y) }

    if(this._exitFlag) return
    this.backtrackStepOnPath(x, y)
  }

  private backtrackStepOnPath(x: number, y: number) {
    if (this._path.length > 0) {
      this._path.pop()
      this.grid.setCell(x, y, this._passageSymbol)
    }
  }

  private recordStepOnPath(x: number, y: number) {
    this._path.push({ x, y })
    this.grid.setCell(x, y, this._visitedSymbol)
  }

  private goEast(x: number, y: number) {
    this.solver(x + 1, y)
  }

  private goWest(x: number, y: number) {
    this.solver(x - 1, y)
  }

  private goSouth(x: number, y: number) {
    this.solver(x, y + 1)
  }

  private goNorth(x: number, y: number) {
    this.solver(x, y - 1)
  }

  private isExitSymbolFound(x: number, y: number) {
    return this.grid.getCell(x, y) === this._exitSymbol
  }

  runSolver() {
    const {x, y} = this.startFinder()
    this.solver(x, y)
    return this
  }
  getPath() { return JSON.stringify(this._path)}
}

console.log((new MazeSolver()).runSolver().getPath())