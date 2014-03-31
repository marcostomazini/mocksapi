var AppRouter = Backbone.Router.extend({

    routes: {
        ""                               : "home",
        "about"                          : "about",
		"authenticated/:hash/:token"     : "authenticated"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.el);
    },

    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        $('#content').html(this.homeView.el);
        this.headerView.selectMenuItem('home-menu');
    },

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },
	
	authenticated: function (hash, token) {
		//var wine = new Auth({_hash: hash, _token: token});
		var wine = new Auth({_hash: hash, _token: token});
        wine.fetch({success: function(){
            $("#content").html(new AuthenticatedView({model: wine}).el);
        }});		
		this.headerView.selectMenuItem();
    }

});

utils.loadTemplate(['HomeView', 'HeaderView', 'AboutView', 'AuthenticatedView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});