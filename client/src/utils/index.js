export function ViewDollar(strt) {
  let USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return USDollar.format(strt);
}

export function filterByAttribute(data, filterValue, attribute) {
  const expresionRegular = new RegExp(filterValue, "i"); // 'i' para hacer la búsqueda sin distinción entre mayúsculas y minúsculas
  if (filterValue.length >= 1) {
    return data.filter((item) => expresionRegular.test(item?.[attribute]));
  } else {
    return data;
  }
}
