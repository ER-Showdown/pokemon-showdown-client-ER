# Pokémon Showdown Elite Redux Client

Navigation: [Website][1] | [Server repository][2] | **Client repository** | [Dex repository][3]

[1]: http://pokemonshowdown.com/
[2]: https://github.com/ER-Showdown/pokemon-showdown-ER
[3]: https://github.com/ER-Showdown/pokemon-showdown-client-ER

## Introduction

This is a repository for most of the client code for Pokémon Showdown Elite Redux mod.

This is what runs `play.pokemonshowdown.com`.

**WARNING: You probably want the [Pokémon Showdown server][4]**, if you're
setting up a server.

[4]: https://github.com/Zarel/Pokemon-Showdown

## Browser support

Pokémon Showdown currently supports, in order of preference:

-   Chrome
-   Firefox
-   Opera
-   Safari 5+
-   IE11+
-   Chrome/Firefox/Safari for various mobile devices

Pokémon Showdown is usable, but expect degraded performance and certain features not to work in:

-   Safari 4+
-   IE9+

Pokémon Showdown is mostly developed on Chrome, and Chrome or the desktop client is required for certain features like dragging-and-dropping teams from PS to your computer. However, bugs reported on any supported browser will usually be fixed pretty quickly.

## Developing

The Editor/IDE of choice for working with the elite redux showdown codebase is VSCode.
We utilize launch configurations tailored to VSCode's environment to facilitate developing and testing the server and client architecture.
Other editors will work, but you will need to configure running the client and server on your own.
If working within VSCode on both the client and server, we recommend using the workspace configuration following these steps:

1. Clone both the client and server architecture. The repos should exist next to each other in a folder:
    - parent_folder
        - pokemon-showdown-client-ER
        - pokemon-showdown-ER
2. "Open Workspace from File" in VSCode, and point to the file in your server repo `pokemon-showdown-ER/.vscode/pokemon-elite-redux-showdown.code-workspace`
3. Point to this file anytime you want to edit the repositories in the future.

## Testing

Because elite redux uses it's own custom showdown server, it is not sufficient to run just the client alone and you will need the server as well.

Doing this in VSCode is very easy with workspace configurations.
There are two launch options to choose from that will handle both the server and client:

-   `[TWOPLAYER] Elite Redux Showdown Battle Testing` This configuration will start the frontend and backend servers, and open two chrome tabs with separate usernames which is ideal for battle testing.
-   `[SINGLEPLAYER] Elite Redux Showdown` This configuration will start the frontend and backend servers, and open one chrome tab with a predefined username. Ideal for testing non-battle related features.

These configurations should also handle hot reloading when code changes, though you may need to refresh the browser.

Outside of VSCode, you will need to handle starting and stopping the server/client yourself.
This is still not too difficult, and can be easily automated with a script or different IDE configurations.

For the backend, run `npm run start`. This will start the backend webserver that listens on `localhost:8000`.
For the frontend, run `npm run serve`. This will start the frontend webserver that listens on `http://localhost:3000`.

Now that both web servers are running, open your browser to `http://localhost:3000/testclient.html?~~localhost:8000`.
This will load pokemon showdown and configure it to connect to your local backend server instance.
If you would like to have it preload a username for you so you don't have to choose one everytime, you can add a query parameter to your url.
For instance: `http://localhost:3000/testclient.html?~~localhost:8000&username=player11112222`.

### Preloaded Teams

The testing client has support for preloaded teambuilder teams from the config file `config/teams.js`.
Look at the example file `config/teams-example.js` for details on how to setup this file properly.
Once setup, the client will automatically load the team you created when loading the page.

### Test keys

As the elite redux client now has a method of specifying a guest username via query parameter, this is no longer needed.

For security reasons, browsers [don't let other websites control PS][5], so
they can't screw with your account, but it does make it harder to log in on
the test client.

The default hack makes you copy/paste the data instead, but if you're
refreshing a lot, just add a `config/testclient-key.js` file, with the
contents:

    const POKEMON_SHOWDOWN_TESTCLIENT_KEY = 'sid';

Replace `sid` with the contents of your actual PS `sid` cookie. You can quickly
access this on Chrome through the URL bar:

![image](https://user-images.githubusercontent.com/551184/53414680-def43480-3994-11e9-89d0-c06098c23fa0.png)
![image](https://user-images.githubusercontent.com/551184/53414760-119e2d00-3995-11e9-80f8-ecd17467310a.png)

(This is the only supported method of logging in on the beta Preact client.)

[5]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

### Other servers

You can connect to an arbitrary server by navigating to
`testclient.html?~~host:port`. For example, to connect to a server running
locally on port 8000, you can navigate to `testclient.html?~~localhost:8000`.

**NOTE**: Certain browsers will convert `'?'` to `'%3F'` when reading files off
of the local filesystem. As a workaround, try using a different browser or
serving the files locally first (ie. run `npx http-server` from the
directory this README is in, then navigate in your browser to
`http://localhost:3000/testclient.html?~~localhost:8000`).

### Limitations

Even with a test key, the following things will fail in `testclient.html`:

-   Registering
-   Logging into other accounts (you can still switch to other unregistered
    accounts and back, though)

Everything else can be tested.

## Warning

This repository is not "batteries included". It does NOT include instructions
to run a full Pokémon Showdown login server, and we will not provide them.
Please do not ask for help on this; you will be turned away.

If you make a mistake hosting a login server, your users' passwords can get
stolen, so we do not want anyone to host a login server unless they can
figure out how to do it without help.

It also doesn't include several resource files (namely, the `/audio/` and
`/sprites/` directories) for size reasons.

On the other hand, as long as you don't want to run your own login server,
this repository contains everything you need to test changes to the client;
just see the "Testing" section above.

## License

Pokémon Showdown's client is distributed under the terms of the [AGPLv3][6].

The reason is mostly because I don't want low-effort proprietary forks that add bad code that steals everyone's passwords, or something like that.

If you're doing _anything_ else other than forking, _especially_ if you want to some client code files in your own open-source project that you want to release under a more permissive license (like, if you want to make your own multiplayer open-source game client for a different game), please ask at `staff@pokemonshowdown.com`. I hold all the copyright to the AGPLv3 parts and can relicense them to MIT for you.

[6]: http://www.gnu.org/licenses/agpl-3.0.html

**WARNING:** This is **NOT** the same license as Pokémon Showdown's server.
