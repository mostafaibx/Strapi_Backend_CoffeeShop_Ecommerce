"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  getOrders: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "Unauthorized");
      return;
    }
    try {
      const orders = await strapi.query("api::order.order").findMany({
        where: { users_permissions_user: { id: ctx.state.user.id } },
      });

      return orders || [];
    } catch (error) {
      ctx.throw(500, "Internal server error");
    }
  },

  createOrder: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.response.status = 401;
      return;
    }

    try {
      // check validation in strapi
      /*       const validData = await strapi.services[
        "api::order.order"
      ].validateSchema(ctx.request.body); */

      const createOrder = await strapi.query("api::order.order").create({
        data: {
          ...ctx.request.body,
          users_permissions_user: { id: ctx.state.user.id },
        },
      });
      return createOrder;
    } catch (error) {
      ctx.throw(500, "Internal server error");
    }
  },

  updateOrderStatus: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "Unauthorized");
      return;
    }
    // add validation
    /*     const { id, status } = await strapi.services["api::order.order"].validateSchema(ctx.request.body);
     */

    try {
      const order = await strapi.query("api::order.order").findOne({
        where: { id: ctx.request.body.id },
      });
      if (!order) {
        return ctx.notFound("Order not found.");
      }
      const updatedOrder = {
        ...order,
        status: ctx.request.body.status,
      };
      strapi.query("api::order.order").update({
        where: { id: ctx.request.body.id },
        data: {
          ...updatedOrder,
        },
      });

      return ctx.send({
        message: `Order: ${updatedOrder.id} status updated successfully.`,
      });
    } catch (error) {
      ctx.throw(500, "Internal server error");
    }
  },

  deleteOrder: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "Unauthorized");
      return;
    }

    const id = ctx.params.id;

    try {
      const order = await strapi.query("api::order.order").findOne({
        where: { id },
      });
      if (!order) {
        return ctx.notFound("Order not found.");
      }
      await strapi.query("api::order.order").delete({
        where: { id },
      });
      return ctx.send({
        message: `Order: ${order.id} deleted successfully.`,
      });
    } catch (error) {
      ctx.throw(500, "Internal server error");
    }
  },
}));
