import { Grid } from "grid"
import { printImage } from "./utils.js"

// Problem: Using the flood fill algorithm, count 
// the number of “rooms,” or enclosed spaces, in a 2D grid.

const image = Array.from(
'...##########....................................' +
'...#........#....####..................##########' +
'...#........#....#..#...############...#........#' +
'...##########....#..#...#..........#...##.......#' +
'.......#....#....####...#..........#....##......#' +
'.......#....#....#......############.....##.....#' +
'.......######....#........................##....#' +
'.................####........####..........######' 
)

const WIDTH = 49
if(image.length % WIDTH !== 0) throw new Error( 'Image width is not valid')
const HEIGHT = image.length / WIDTH
const ORIGINAL = '.'
const REPLACEMENT = 'O'
const WALL = '#'

console.log(printImage(image, WIDTH, HEIGHT))