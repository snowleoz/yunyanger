'use strict';

/**
 * Adlist.js controller
 *
 * @description: A set of functions called "actions" for managing `Adlist`.
 */

module.exports = {

  /**
   * Retrieve adlist records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.adlist.search(ctx.query);
    } else {
      // return strapi.services.adlist.fetchAll(ctx.query);
      return strapi.services.adlist.fetchAll(ctx.request.body);
    }
  },

  /**
   * Retrieve a adlist record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.adlist.fetch(ctx.params);
  },

  /**
   * Count adlist records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.adlist.count(ctx.query);
  },

  /**
   * Create a/an adlist record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.adlist.add(ctx.request.body);
  },

  /**
   * Update a/an adlist record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.adlist.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an adlist record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.adlist.remove(ctx.params);
  }
};
