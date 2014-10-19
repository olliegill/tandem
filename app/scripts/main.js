/* global _, Parse, $ */
'use strict';

// LOG IN VIEW //////////////////////////////////
var LogInView = Parse.View.extend({
	className : 'login',
	loginTemplate: _.template($('.login-template').text()),

	events: {
		'click .login-btn'	: 'userLogIn',
	},

	initialize: function(){
		//appends login-view div with contents of the login-template
		$('.login-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.loginTemplate);
		return this;
	},

	userLogIn: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var passwordVal = $('.password-input').val();
		
		//calls Parse's login function
		Parse.User.logIn(usernameVal, passwordVal, {
		  success: function(user) {
				console.log('Username', user.get('username'), 'is logged in.');
				router.navigate('userview', {trigger: true});
			},

		  error: function(user, error) {
		  	//alert('Error: Log in failed.');
		  	console.log('User not logged in.' + error.code + " " + error.message);
				//user stays on the login page
		  }
		});
	}
});

// SIGN UP VIEW ///////////////////////////////////////////////////////////
var SignUpView = Parse.View.extend({
	
	signupTemplate: _.template($('.signup-template').text()),

	events: {
		'click .signup-btn' : 'userSignUp'
	},

	initialize: function(){
		//appends signup-view div with contents of the signup-template
		$('.signup-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.signupTemplate);
		return this;
	},

	userSignUp: function(){
		//naming the value of the input fields
		var usernameVal = $('.username-input').val();
		var emailVal = $('.email-input').val();
		var passwordVal = $('.password-input').val();
		var hometownVal = $('.hometown-input').val();

		//creates a user instance; adds that instance to the users collection
		//sets the properties of that user to be the value of the input fields
		var user = new Parse.User();
		user.set({
			'username':		usernameVal,
			'email':			emailVal,
			'password':		passwordVal,
			'hometown': 	hometownVal
		});

		//saves added input to the server; when done...
		user.signUp(null, {
			success: function(user) {
				console.log('Username', user.get('username'), 'is logged in.');
    		router.navigate('userview', {trigger: true});
  		},
  		error: function(user, error) {
    		//alert('Error: Sign up failed.');
				console.log('User not logged in.' + error.code + ' ' + error.message);
				//user stays on the signup page
  		}
		});
	}

});

// ABOUT ME VIEW ////////////////////////////////
var AboutMeView = Parse.View.extend({
	className : 'about-me',
	aboutMeTemplate: _.template($('.about-me-template').text()),

	initialize: function(){
		//appends about-me-view div with contents of the about-me-template
		$('.about-me-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.aboutMeTemplate);
		return this;

	}

});

// SET LANGUAGES VIEW ///////////////////////////
var SetLanguagesView = Parse.View.extend({
	className : 'set-lang',
	setLangTemplate: _.template($('.set-lang-template').text()),

	initialize: function(){
		//appends set-lang-view div with contents of the set-lang-template
		$('.set-lang-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.setLangTemplate);
		return this;
	}

});

// WANT TO MEET VIEW ////////////////////////////
var ToMeetView = Parse.View.extend({
	className : 'to-meet',
	toMeetTemplate: _.template($('.to-meet-template').text()),

	initialize: function(){
		//appends to-meet-view div with contents of the login-template
		$('.to-meet-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.toMeetTemplate);
		return this;
	}

});

// MESSENGER VIEW ///////////////////////////////
var MessengerView = Parse.View.extend({
	className : 'messenger',
	messengerTemplate: _.template($('.messenger-template').text()),

	initialize: function(){
		//appends messenger-view div with contents of the messenger-template
		$('.messenger-view').html(this.el);
	},

	render: function(){
		this.$el.html(this.messengerTemplate);
		return this;
	}

});

// THE APP ROUTER ///////////////////////////////
var AppRouter = Parse.Router.extend({
	routes: {
		//URL to match	//function called when the hash matches



		''					: 'renderLogIn',				//	url/#
		'aboutme'		: 'renderAboutMe',			//	url/#aboutme
		'setlang'		: 'renderSetLanguages',	//	url/#setlang
		'tomeet'		: 'renderToMeet',				//	url/#tomeet
		'messenger'	: 'renderMessenger'			//	url/#messenger
	},

	initialize: function(){
		this.currentView = null;

		// if there is a currently logged in user...
		if ( Parse.User.current() ) {
			//router redirects to the AboutMeView
			this.navigate('aboutme', {trigger: true});

		// if there is NOT a currently logged in user...
		} else {
			//router redirects to the LogInView
			this.navigate('', {trigger: true});
	},

	// REDIRECT TO LOGIN IF NO CURRENT USER
	redirectToLogin: function(){
		this.navigate('', {trigger: true});
	},

  renderLogIn: function(){
  	this.swap( new LogInView() );
  	$('.menubar').hide();
  },

  renderAboutMe: function(){
	if ( Parse.User.current() === null ){
			this.redirectToLogin();
		} else {
			//instantiate the AboutMeView with the current user as the model
			this.swap( new AboutMeView({model: Parse.User.current().attributes}) );
			$('.menubar').show();
		}
  },

  renderSetLanguages: function(){
  if ( Parse.User.current() === null ){
			this.redirectToLogin();
		} else {
			this.swap( new SetLanguagesView() );
			$('.menubar').show();
		}
  },

  renderToMeet: function(){
  if ( Parse.User.current() === null ){
			this.redirectToLogin();
		} else {
			this.swap( new ToMeetView() );
			$('.menubar').show();
		}
  },

  renderMessenger: function(){
  if ( Parse.User.current() === null ){
			this.redirectToLogin();
		} else {
			this.swap( new MessengerView() );
			$('.menubar').show();
		}
  },

  swap: function(view){
	  if (this.currentView) this.currentView.remove();
	  this.currentView = view;
	  this.currentView.render();
  }

});

// INSTANTIATING THE ROUTER /////////////////////
Parse.initialize("VqnYqznvx3Wc5ONfDghDMrZqwx77KEFiESe4l82W", "z3vDhzbq25kW3Y0uCNRnOBmsEMWb0XmANkjF1rTh");
new AppRouter();
Parse.history.start();
