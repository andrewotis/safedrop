SafeDrop

[![Netlify Status](https://api.netlify.com/api/v1/badges/4cd8e7f6-2787-4a27-a540-f6d7a2f05351/deploy-status)](https://app.netlify.com/sites/safedrop/deploys)

A 100% locally stored password manager, secure note storage, private messaging tool that uses PGP encryption.

This app uses
-React
-react-bootstrap
-Redux
-HTML Filesystem API
-OpenPGPjs

Basic Core Principals so far:
- nothing should be transmitted over the wire. No relational databases, all local filesystem storage.
- upon successful installation, this app should be able to be run 100% offline and stored to secured local files.
- the app should make it very easy for any user of any skill level to use top of the line security/encryption tools
- the app should help users learn best practices for online privacy and security
- the app should be highly customizable and provide a wicked UI/UX
- should run on browser AND mobile, and provide a way to *easily* sync up the two

Storage and Retrieval
This app stores all its data in a JSON file on the users PC.

All sensitive data is stored in a JSON object which is JSON.stringified in Javascript and then encrypted as a text string using the user’s public key which they generated themselves. This encrypted data is then packaged with the users public and private keys and encrypted using the application’s house public key on the web server. The house private key is highly secured on the web server.
