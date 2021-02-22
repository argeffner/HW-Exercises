const {turnToNums, getMode, getMedian, getMean} = require('./statistics');

describe("getMode", function(){
  test("for the mode", () => {
  expect(getMode([5, 5, 5, 2, 2, 2, 2, 2, 9, 4])).toEqual(2)
  })
  test("for empty array", () => {
  expect(getMode([])).toEqual("No numbers were passed in")    
  })
})

describe("getMedian", function(){
  test("even array", () => {
  expect(getMedian([5, 5, 5, 2, 2, 2, 2, 2, 9, 4])).toEqual(3)
  })
  test("odd array", () => {
  expect(getMedian([5, 5, 5, 2, 2, 1, 2, 2, 2, 9, 4])).toEqual(2)
  })
  test("for empty array", () => {
  expect(getMedian([])).toEqual(0)    
  })
})

describe("getMean", function(){
  test("for empty array", () => {
  expect(getMean([])).toEqual(0)    
  })
  test("for the mean of array", () => {
  expect(getMean([5, 5, 5, 2, 2, 2, 2, 2, 9, 4])).toEqual(3.8)
  })
})