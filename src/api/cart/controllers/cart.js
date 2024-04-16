"use strict";

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::cart.cart", ({ strapi }) => ({
  getCart: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return ctx.unauthorized("You need to be logged in to access your cart");
    }
    try {
      // Check if user already has a cart and if not create a new one
      let cart = await strapi.query("api::cart.cart").findOne({
        where: { users_permissions_user: { id: ctx.state.user.id } },
      });
      if (!cart) {
        cart = await strapi.query("api::cart.cart").create({
          data: {
            users_permissions_user: { id: ctx.state.user.id },
            items: [],
          },
        });
      }

      return cart;
    } catch (error) {
      console.log(error);
      ctx.throw(500, "Something went wrong");
    }
  },

  updateCart: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.throw(401, "You need to be logged in to update your cart");
      return;
    }

    const { id } = ctx.request.body;

    try {
      const cart = await strapi.query("api::cart.cart").findOne({
        where: { users_permissions_user: { id: ctx.state.user.id } },
      });

      const existingItemIndex = cart.items.findIndex((item) => item.id === id);

      if (existingItemIndex !== -1) {
        cart.items[existingItemIndex].quantity++;
      } else {
        // we can validate the product here since we strapi doesnt use ORM or typescript
        cart.items.push(ctx.request.body);
      }

      await strapi.query("api::cart.cart").update({
        where: { id: cart.id },
        data: { items: cart.items },
      });
      ctx.response.status = 200;
    } catch (error) {
      ctx.throw(500, "Something went wrong");
    }
  },

  deleteCartItem: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.response.status = 401;
      return;
    }
    const itemId = ctx.params.id;

    const cart = await strapi.query("api::cart.cart").findOne({
      where: { users_permissions_user: { id: ctx.state.user.id } },
    });
    let existingItemIndex = -1;
    // Check if the item is already in the cart
    if (cart.items.length > 0) {
      existingItemIndex = cart.items.findIndex((item) => item.id === itemId);
    }

    if (existingItemIndex !== -1) {
      cart.items.splice(existingItemIndex, 1);
      await strapi.query("api::cart.cart").update({
        where: { id: cart.id },
        data: { items: cart.items },
      });
    }
    // Set response status
    ctx.response.status = 200;
  },
  clearCart: async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      ctx.response.status = 401;
      return;
    }

    const cart = await strapi.query("api::cart.cart").findOne({
      where: { users_permissions_user: { id: ctx.state.user.id } },
    });

    await strapi.query("api::cart.cart").delete({
      where: { id: cart.id },
    });
    // Set response status
    ctx.response.status = 200;
  },
}));
