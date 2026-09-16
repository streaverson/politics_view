const convertToPersianDigits = (number) => {
  if (number === null || number === undefined) return "";

  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return number.toString().replace(/\d/g, (digit) => {
    return persianDigits[digit];
  });
};

export default convertToPersianDigits;
