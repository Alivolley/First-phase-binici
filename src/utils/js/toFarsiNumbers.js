export const toFarsiNumber = num => {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

  return !num && num !== 0
    ? ''
    : num.toString().replace(/\d/g, x => farsiDigits[x]);
};
