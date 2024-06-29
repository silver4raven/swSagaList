function convertToRoman(num: number): string {
  let arabic: number = num;
  let roman: string = "";
  if (num < 1) {
    return "Less than 1";
  }
  const romanMatrix: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  for (var i = 0; i < romanMatrix.length; i++) {
    while (arabic >= romanMatrix[i][0]) {
      roman = roman + romanMatrix[i][1];
      arabic = arabic - romanMatrix[i][0];
    }
  }
  return roman;
}

export default convertToRoman;
