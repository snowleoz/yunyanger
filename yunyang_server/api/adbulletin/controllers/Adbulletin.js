'use strict';

/**
 * Adbulletin.js controller
 *
 * @description: A set of functions called "actions" for managing `Adbulletin`.
 */

module.exports = {

  /**
   * Retrieve adbulletin records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.adbulletin.search(ctx.query);
    } else {
      return strapi.services.adbulletin.fetchAll(ctx.request.body);
      // return strapi.services.adbulletin.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a adbulletin record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.adbulletin.fetch(ctx.params);
  },

  /**
   * Count adbulletin records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.adbulletin.count(ctx.query);
  },

  /**
   * Create a/an adbulletin record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.adbulletin.add(ctx.request.body);
  },

  /**
   * Update a/an adbulletin record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.adbulletin.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an adbulletin record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.adbulletin.remove(ctx.params);
  }
};
