#!/usr/bin/env node

/**
 * generate manually
 */
const {existsSync} = require(`fs`);
const {createRequire} = require(`module`);
const {resolve} = require(`path`);

const relPnpApiPath = "../../.pnp.cjs";

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = createRequire(absPnpApiPath);

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    // Setup the environment to be able to require typescript/bin/tsc
    require(absPnpApiPath).setup();
  }
}

// Defer to the real typescript/bin/tsc your application uses
module.exports = absRequire(`ts-node/register`);
