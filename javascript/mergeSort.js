function mergeSort(arr) {
  if (arr.length == 1) return arr;

  const leftArr = mergeSort(arr.slice(0, Math.round(arr.length / 2)))
  const rightArr = mergeSort(arr.slice(Math.round(arr.length / 2)))

  const newArr = []

  while(leftArr.length > 0 || rightArr.length > 0) {
    if(leftArr[0] >= rightArr[0] || leftArr.length == 0) {
      newArr.push(rightArr[0])
      rightArr.shift()
    } else {
      newArr.push(leftArr[0])
      leftArr.shift()
    }
  }

  return newArr
}


function test(arr) {
  if (arr.length == 1) return arr;

  return test(arr.slice(Math.round(arr.length / 2), arr.length))
}

const val = [3, 7, 2, 8, 1, 9, 4, 6, 5]

console.log(mergeSort(val))
