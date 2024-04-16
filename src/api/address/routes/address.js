"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/address",
      handler: "address.addAddress",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "GET",
      path: "/address",
      handler: "address.getAddresses",
      config: {
        prefix: "",
        policies: [],
      },
    },
    {
      method: "DELETE",
      path: "/address/:id",
      handler: "address.deleteAddress",
      config: {
        prefix: "",
        policies: [],
      },
    },
  ],
};
