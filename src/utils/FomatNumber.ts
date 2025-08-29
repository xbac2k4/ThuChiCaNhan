import 'intl';
import 'intl/locale-data/jsonp/vi';

export const formatCurrencyVND = (amount: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);
};


export const formatTextVND = (value: string | number) => {
  if (!value) return "";
  const number = Number(value.toString().replace(/\D/g, ""));
  if (isNaN(number)) return "";
  return number.toLocaleString("vi-VN");
};