SafeDrop

A 100% locally stored password manager, secure note storage, private messaging tool that uses PGP encryption.

Main depenencies of the web app:
-React for tailoring the UI
-react-bootstrap for UI experience
-Redux for state managemnet (I started prop drilling this and it just wasn't working out)
-HTML Filesystem API for data storage
-OpenPGPjs for encryption and decryption


Storage and Retrieval
This app stores all its data in a JSON file on the users PC.

All sensitive data is stored in a JSON object which is JSON.stringified in Javascript and then encrypted as a text string using the user’s public key which they generated themselves. This encrypted data is then packaged with the users public and private keys and encrypted using the application’s house public key on the web server. The house private key is highly secured on the web server.
