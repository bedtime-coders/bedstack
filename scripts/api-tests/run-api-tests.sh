#!/usr/bin/env bash
set -x

SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null && pwd)"

APIURL=${APIURL:-https://api.realworld.io/api}
USERNAME=${USERNAME:-u$(date +%s)}
EMAIL=${EMAIL:-$USERNAME@mail.com}
PASSWORD=${PASSWORD:-password}

OFFICIAL_COLLECTION_URL="https://raw.githubusercontent.com/gothinkster/realworld/refs/heads/main/api/Conduit.postman_collection.json"

# Function to run newman with the given collection
run_newman() {
	local collection="$1"
	npx newman run "$collection" \
		--delay-request 500 \
		--global-var "APIURL=$APIURL" \
		--global-var "USERNAME=$USERNAME" \
		--global-var "EMAIL=$EMAIL" \
		--global-var "PASSWORD=$PASSWORD" \
		"$@"
}

echo "Attempting to run tests against official RealWorld Postman collection..."

# First try to download the collection to verify it's accessible
if curl -s -f "$OFFICIAL_COLLECTION_URL" >/dev/null; then
	echo "Successfully accessed official collection, running tests..."
	run_newman "$OFFICIAL_COLLECTION_URL"
else
	echo "Failed to access official collection, falling back to local collection"
	run_newman "$SCRIPTDIR/postman_collection.json"
fi
