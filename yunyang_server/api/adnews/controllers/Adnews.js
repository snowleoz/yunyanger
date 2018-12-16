'use strict';

/**
 * Adnews.js controller
 *
 * @description: A set of functions called "actions" for managing `Adnews`.
 */

module.exports = {

  /**
   * Retrieve adnews records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.adnews.search(ctx.query);
    } else {
      return strapi.services.adnews.fetchAll(ctx.request.body);
    }
  },

  /**
   * Retrieve a adnews record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.adnews.fetch(ctx.params);
  },

  /**
   * Count adnews records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.adnews.count(ctx.query);
  },

  /**
   * Create a/an adnews record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.adnews.add(ctx.request.body);
  },

  /**
   * Update a/an adnews record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.adnews.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an adnews record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.adnews.remove(ctx.params);
  }
};
