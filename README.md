# request-retry-proxy

This is an experiment for a $http proxy that retries requests once the server expires client's authentication

# How to run the experiment

1. Download dependencies with `yarn` or `npm install` commands
1. Run the server with `yarn run server` or `npm run server` commands
1. Run the client with `yarn run dev` or `npm run dev` commands

# Server

The server runs on port 9091.

The server only allows 10 calls to be made to `/comics` path before having to reauthenticate calling to `/reauthenticate` path.

The reauthentication blocks for 1 second.

# Client

The client runs on port 9090: [http://localhost:9090](http://localhost:9090)

Every time you trigger a call to the server you are informed how many calls have been made and how many calls are left before having to reauthenticate.

The proxy handles reauthentication automatically.

The proxy will retry every failing request until 4 max attempts.

The proxy applies an increasing wait time (2 ^ attempt * 10 milliseconds) to each retry.