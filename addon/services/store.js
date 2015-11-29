import Ember from 'ember';
import ajax from '../mixins/ajax';

export default Ember.Service.extend(ajax, {
    modelFor: function(type) {
        var klass = this.container.lookupFactory('model:' + type);
        if (!klass) {
            Ember.Logger.warn('model:' + type + ' is not found');
            return Ember.Object.create();
        }
        return klass.create();
    },
    find: function(type, params, options) {
        return this.modelFor(type).find(params, options);
    },
    findOne: function(type, _id, data, options) {
        return this.modelFor(type).findOne(_id, data, options);
    },
    createRecord: function(type, init) {
        return this.modelFor(type).createRecord(init);
    },
    deleteRecord: function(type, model, data, options) {
        return this.modelFor(type).deleteRecord(model, data, options);
    },
    save: function(type, model, options) {
        return this.modelFor(type).save(model, options);
    },
    emptyAttrs: function(type, model, filterKeys, unfilterKeys) {
        var emptyKeys = [];
        var filtered = filterKeys || Ember.keys(this.modelFor(type).model);
        var unfiltered = unfilterKeys || [];

        var finallyfiltered = filtered.filter(function(item) {
            return unfiltered.indexOf(item) === -1;
        });

        Ember.$.each(finallyfiltered, function(index, key) {
            if (typeof key === "string") {
                if (Ember.isEmpty(model.get(key))) {
                    emptyKeys.push(key);
                }
            }
        });
        return emptyKeys;
    }
});