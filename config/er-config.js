/**
 * This file is intended to contain custom extra or overridden configs to the Elite Redux showdown port.
 * Prefer leaving valid workable configs from standard pokemon showdown intact, referenced here: https://play.pokemonshowdown.com/config/config.js
 */
Config.devUsernameOverride = undefined;

/// Determine if the client specified a username in the query string or not, and rename if they did.
const usernameMatch = /username=([a-z0-9*]{1,19})/.exec(location.search);
if (usernameMatch) {
	Config.devUsernameOverride = usernameMatch[1];
}
