"use strict";

/**
 * order router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/order",
      handler: "order.createOrder",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/order",
      handler: "order.getOrders",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/order/:id",
      handler: "order.deleteOrder",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "PUT",
      path: "/order",
      handler: "order.updateOrderStatus",
      config: {
        prefix: "",
        policies: [],
      },
    },
  ],
};
