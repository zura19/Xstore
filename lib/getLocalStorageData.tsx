export const orderInfo = localStorage.getItem("orderInfo")
  ? JSON.parse(localStorage.getItem("orderInfo") as string)
  : null;
