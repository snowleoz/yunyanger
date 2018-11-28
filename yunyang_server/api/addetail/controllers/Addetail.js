'use strict';

/**
 * Addetail.js controller
 *
 * @description: A set of functions called "actions" for managing `Addetail`.
 */

module.exports = {

  /**
   * Retrieve addetail records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.addetail.search(ctx.query);
    } else {
      return strapi.services.addetail.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a addetail record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.addetail.fetch(ctx.params);
  },

  /**
   * Count addetail records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.addetail.count(ctx.query);
  },

  /**
   * Create a/an addetail record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.addetail.add(ctx.request.body);
  },

  /**
   * Update a/an addetail record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.addetail.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an addetail record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.addetail.remove(ctx.params);
  }
};
