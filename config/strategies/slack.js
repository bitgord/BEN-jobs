'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	SlackStrategy = require('passport-slack').Strategy,
	config = require('../config'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function() {
	// Use facebook strategy
	console.log('gogo');
	passport.use(new SlackStrategy({
			clientID: config.slack.clientID,
			clientSecret: config.slack.clientSecret,
			callbackURL: config.slack.callbackURL,
			passReqToCallback: true,
			scope: "users:read"
			
		},
		function(req, accessToken, refreshToken, profile, done) {
			console.log('start');
			// Set the provider data and include tokens
			console.log(profile);

			var providerData = profile._json;
			providerData.accessToken = accessToken;
			providerData.refreshToken = refreshToken;

			// Create the user OAuth profile
			var providerUserProfile = {
				displayName: profile.displayName,
				//email: profile.emails[0].value,
				username: profile.displayName,
				provider: 'slack',
				providerIdentifierField: 'id',
				providerData: providerData
			};

			// Save the user OAuth profile
			users.saveOAuthUserProfile(req, providerUserProfile, done);
		}
	));
};
