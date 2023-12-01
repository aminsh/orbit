export const isSimpleType = (value: any, { maybeIsArray }: { maybeIsArray: boolean }): boolean => {
  const simpleTypes = [ 'String', 'Date', 'Number', 'Boolean' ]

  if(maybeIsArray && Array.isArray(value)) {
    return value.every(it => !!simpleTypes.find(st => Object.prototype.toString.call(it).includes(st)))
  }

  return !!simpleTypes.find(st => Object.prototype.toString.call(value).includes(st))
}


