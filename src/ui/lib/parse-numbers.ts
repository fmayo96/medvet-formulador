export function parseDecimal(x: string) {
  let xnew = ''
  if (x.split(',').length === 2) {
    xnew = x.split(',')[0] + '.' + x.split(',')[1]
    return parseFloat(xnew)
  }
  return parseFloat(x)
}
