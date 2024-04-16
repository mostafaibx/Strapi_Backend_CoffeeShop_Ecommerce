"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::address.address", ({ strapi }) => ({
  getAddresses: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "Unauthorized");
      return;
    }
    try {
      const address = await strapi.query("api::address.address").findMany({
        where: { users_permissions_user: { id: ctx.state.user.id } },
      });
      return address || [];
    } catch (error) {
      ctx.throw(500, "Internal Server Error");
    }
  },

  addAddress: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "Unauthorized");
      return;
    }
    try {
      await strapi.query("api::address.address").create({
        data: {
          ...ctx.request.body,
          users_permissions_user: { id: ctx.state.user.id },
        },
      });
      return ctx.send({ message: "Address added successfully" });
    } catch (error) {
      ctx.throw(500, "Internal Server Error");
    }
  },
  deleteAddress: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.response.status = 401;
      return;
    }
    const id = ctx.params.id;
    try {
      const address = await strapi.query("api::address.address").findOne({
        where: { id },
      });
      if (!address) {
        return ctx.notFound("Address not found.");
      }
      if (address.users_permissions_user?.id !== ctx.state.user.id) {
        return ctx.forbidden("You can only delete your own address.");
      }
      await strapi.query("api::address.address").delete({
        where: { id },
      });
      return ctx.send({
        message: `Address: ${address.city} ${address.street} deleted successfully.`,
      });
    } catch (error) {
      console.log(error);
    }
  },
}));
