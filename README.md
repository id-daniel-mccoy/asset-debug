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

### Deploy To Mainnet:

```
dfx deploy --network ic
```
