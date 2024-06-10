## Asset Upload Debugging

### Setup:

Easy Setup:

```
npm run setup
```

Note: If you have a password set on your DFX identity you will need to enter it once during the initial setup.

If for any reason the easy setup does not work please follow the steps below to manually setup the project.

```
npm install
dfx start --clean --background
dfx deploy
dfx stop
```

### Developer Mode:

```
npm run dev
```

### Bug Hunting Information:

#### Overview:

Currently if you upload an image that is over 1.8 MB (has to chunk) the image seems to upload correctly as it shows up with the list function but it will not resolve with the on-chain web link. If you upload one smaller than that it works flawlessly.

#### Instructions:

This is a simple TypeScript/React/Vite frontend with a basic plug wallet login, an asset canister actor created using the @dfinity/assets npm package, and some basic utility functions offered by ICP asset canisters. This includes a single file upload, automatic verification of the upload, and a file list function for access to the metadata of uploaded files. There is no on-screen logging or results outside of the web console log, please use that.

Step by step:

1. Login with your plug wallet. Make sure you are either authorized as a writer on the connected asset canister ID or connect your own.
2. Choose a file and click "Test Upload"
3. The link will appear below, if the file you uploaded is bigger than 1.8 MB it will not resolve the web link. Google says body does not pass verification, firefox says there is an issue with possible file corruption.
4. You can click the "List Files" button to see an object in the web console log of all data on the asset canister to compare with.