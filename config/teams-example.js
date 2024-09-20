/**
 * Create a teams.js file similar to this to preload teambuilder teams in when the client(s) start.
 * To get the string that needs to go in here, follow these steps:
 * 1. open chrome dev tools (right click page -> inspect)
 * 2. Navigate to the "Application" tab
 * 3. Expand "Local Storage" in the leftmost "Storage" tree view
 * 4. Click "http://localhost:8080"
 * 5. Copy the Value for the key "showdown_teams" and paste as the value for the variable below.
 * An example teambuilder values might look like:
 * elitereduxou]Untitled 1|Amoonguss||aguavberry|infiltrator|bodyslam,clearsmog,curse,doubleedge|Brave|248,252,,8,,|||||
 * For this value, your config.js file should look like:
 * Config.preloadedTeams = "elitereduxou]Untitled 1|Amoonguss||aguavberry|infiltrator|bodyslam,clearsmog,curse,doubleedge|Brave|248,252,,8,,|||||";
 */
Config.preloadedTeams = "";
