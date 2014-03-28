window.WineListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var wines = this.model.models;
        var len = wines.length;
        var startPos = (this.options.page - 1) * 18;
        var endPos = Math.min(startPos + 18, len);

        $(this.el).html('<div class="navcontainer"><ul class="thumbnails"></ul></div>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new WineListItemView({model: wines[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);

        return this;
    }
});

window.WineListItemView = Backbone.View.extend({

    tagName: 'li',

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});