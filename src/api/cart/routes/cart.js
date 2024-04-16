"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/cart",
      handler: "cart.updateCart",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/cart",
      handler: "cart.getCart",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/cart",
      handler: "cart.clearCart",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/cart/:id",
      handler: "cart.deleteCartItem",
      config: {
        prefix: "",
        policies: [],
      },
    },
  ],
};
