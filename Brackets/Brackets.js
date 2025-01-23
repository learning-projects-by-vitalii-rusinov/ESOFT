const isValidBrackets = (str) => {

  if (str === '') return true;

  const openingBrackets = ['(', '[', '{'];

  const bracketMap = {
    ')': '(',
    ']': '[',
    '}': '{'
  };

  const stack = [];

  for (let char of str) {
    if (openingBrackets.includes(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
