module.exports = {
  filterPositiveInt: function(value) {
    if (/^([0-9]+)$/.test(value))
      return Number(value);
    return NaN;
  },

  filterMangaIdType: function(value) {
    let valid_values = ['md', 'mu', 'mal'];
    if (valid_values.includes(value))
      return value;
    else
      return null;
  },

  filterChaptersOrigin: function(value) {
    let valid_values = ['group', 'manga', 'user', 'new'];
    if (valid_values.includes(value))
      return value;
    else
      return null;
  },

  filterMangasOrigin: function(value) {
    let valid_values = ['all', 'updated', 'new'];
    if (valid_values.includes(value))
      return value;
    else
      return null;
  },

  filterLanguageIDs: function(value) {
    let lang_ids = [];

    //Filter out non-integers
    value.split(',').forEach((lang_id) => {
      let filtered = module.exports.filterPositiveInt(lang_id);

      if (!isNaN(filtered))
        lang_ids.push(filtered);
    });

    return lang_ids.join(',');
  },

  handleCaching: function(config, resourceTitle, cache) {
    //Is caching disabled?
    if (!config.cacheFor || !config.cacheFor[resourceTitle]) {
      //Skip redis-cache
      return (req, res, next) => {
        next();
      }
    } else {
      //Use redis-cache
      return cache.withTtl(config.cacheFor[resourceTitle]);
    }
  }
}
