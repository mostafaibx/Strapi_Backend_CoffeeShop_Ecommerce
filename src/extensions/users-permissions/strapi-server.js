module.exports = (plugin) => {
  plugin.controllers.user.updateAddress = async (ctx) => {
    // Authentication check
    if (!ctx.state.user || !ctx.state.user.id) {
      return ctx.badRequest("You are not authorized to update your address.");
    }

    const userId = ctx.state.user.id;
    const address = ctx.state.user.address;

    try {
      if (!address) {
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          { data: { address: [ctx.request.body] } }
        );
      } else {
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          userId,
          { data: { address: [...address, ctx.request.body] } }
        );
      }

      ctx.send(200);
    } catch (err) {
      // Handle potential errors during update
      console.error(err);
      ctx.badRequest("An error occurred while updating your address."); // User-friendly error message
    }
  };

  // Register the route with the correct method ("PUT")
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/address",
    handler: "user.updateAddress",
    config: {
      prefix: "",
      policies: [],
    },
  });

  return plugin;
};
