//return example `set #name = :name, #age = :age, #email = :email`,
export function convertToExpressionAttributeNames(arr: string[]): Record<string, string> {
  return arr.reduce((acc, curr) => {
    acc[`#${curr}`] = curr;
    return acc;
  }, {} as Record<string, string>);
}

//return example {
//   "#name": "name",
//   "#age": "age",
//   "#email": "email",
// }

export function convertToExpressionUpdateExpression(expression: string[]): string {
  return `set ${expression.map((exp: string) => `#${exp} = :${exp}`).join(',')}`;
}

//return example : { ':name': 'raki', ':age': '20', ':address': 'Dhaka' }
export function convertToExpressionAttributeValues(
  updatevalue: Record<string, any>
): Record<string, any> {
  return Object.keys(updatevalue).reduce((acc, curr) => {
    acc[`:${curr}`] = updatevalue[curr];
    return acc;
  }, {} as Record<string, any>);
}

export function pluralize(word: string, count?: number) {
  if (count === 1) {
    return word;
  } else if (word.endsWith('y')) {
    return word.slice(0, -1) + 'ies';
  } else if (
    word.endsWith('s') ||
    word.endsWith('x') ||
    word.endsWith('z') ||
    word.endsWith('ch') ||
    word.endsWith('sh')
  ) {
    return word + 'es';
  } else {
    return word + 's';
  }
}
