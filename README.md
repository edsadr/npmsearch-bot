# Npmsearch Slack Webhook

This project creates an [Slack outgoing webhook](https://slack.com/apps/A0F7VRG6Q-outgoing-webhooks) to search for NPM packages from Slack using [Auth0 Webtask](http://webtask.io/).

It uses [npmsearch.com](https://npmsearch.com) API to get the information including, [NodeSource Certified Module score](https://github.com/nodesource/nscm).

## Instructions to use it

1. Install Webtask and configure it in case you don't have it yet: `npm install wt-cli -g && wt init email@domain.com`
2. Execute `npm run create` and copy the URL at the end of the process
3. Go to https://slack.com/apps/A0F7VRG6Q-outgoing-webhooks and configure an Slack outgoing webhook using the URL returned in the previous step
4 Ready to go, just use the trigger keyword for the outgoing webhook

## Developing

You can work with it online after install it, just execute: `npm run edit` and this will open the online editor.

You can work locally too, for this:

1. Execute `npm run debug`
2. Install local tunnel: `npm install -g localtunnel`
3. Expose your port `8080`, the one launched from debug by default: `lt --port 8080` and grab the URL
4. Use the localtunnel URL in your Slack Outgoing Webhook configuration
5. Execute `npm run update` to update the code in Webtask

## License

Copyright 2017 Adrian Estrada

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

