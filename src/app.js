// Copyright 2020 OAX Foundation Limited

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

// http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const UtilCrypto = require("@polkadot/util-crypto");
const { ApiPromise, WsProvider, Keyring } = require("@polkadot/api");
const { Telegraf } = require("telegraf");
const { ethers } = require('ethers');
const { BN } = require("bn.js");
const ADDITIONAL_TYPES = require("./types/types.json");

// this is the Generic Faucet Interface
class GenericFaucetInterface {
  constructor(config) {
    this.types = config.types;
    this.api = undefined;
    this.mnemonic = config.mnemonic;
    this.privateKey = config.privateKey;
    this.keyRing = undefined;
    this.providerUrl = config.providerUrl;
    this.rpcUrl = config.rpcUrl;
    this.amount = config.amount;
    this.tokenName = config.tokenName;
    this.addressType = config.addressType;
    this.timeLimitHours = config.timeLimitHours;
    this.decimals = new BN(config.decimals.toString());
    // Help message when user first starts or types help command
    this.helpMessage = `Welcome to the ${process.env.FAUCET_NAME}! 
    To request for tokens send the message: 
    "/request ADDRESS" 
    with your correct ${this.tokenName} address`;
    // Error Messages
    this.timeLimitMessage = `Sorry please wait for ${this.timeLimitHours} hours, between token requests from the same telegram account!`;
    this.invalidAddressMessage = `Invalid address! Plese use the generic substrate format or ethereum format (evm)`;
    // record storage (for time limit)
    this.records = {};
  }

  // tries to get valid address from message, if fails, returns undefined
  getAddressFromMessage(message) {
    const address = message.text.substring(9);
    const check1 = UtilCrypto.checkAddress(address, this.addressType);
    const check2 = UtilCrypto.checkAddress(address, 972);
    const check3 = ethers.utils.isAddress(address);
    if (check1[0] || check2[0] || check3) {
      return address;
    } else {
      return undefined;
    }
  }

  // returns the help message
  getHelpMessage() {
    return this.helpMessage;
  }

  // loads json file and inits keyring
  initKeyring() {
    const keyring = new Keyring({ type: "sr25519", ss58Format: 42 });
    this.keyRing = keyring.addFromMnemonic(this.mnemonic);
  }

  // This initializes api
  async initApi() {
    const ws = new WsProvider(this.providerUrl);
    this.api = await ApiPromise.create({ types: this.types, provider: ws });
    // Retrieve the chain & node information information via rpc calls
    const [chain, nodeName, nodeVersion] = await Promise.all([
      this.api.rpc.system.chain(),
      this.api.rpc.system.name(),
      this.api.rpc.system.version(),
    ]);
    // Log these stats
    console.log(
      `You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`
    );
  }

  async sendToken(address) {
    const api = await this.initApi();
    this.initKeyring();
    const parsedAmount = this.decimals.mul(new BN(this.amount));
    console.log(`Sending ${this.amount} ${this.tokenName} to ${address}`);
    const transfer = this.api.tx.balances.transfer(address, parsedAmount);
    const hash = await transfer.signAndSend(this.keyRing);
    console.log("Transfer sent with hash", hash.toHex());
  }

  async sendEtherToken(address) {
    const provider = new ethers.providers.JsonRpcProvider(
        this.rpcUrl, { chainId: 222 }
    );
    let wallet = new ethers.Wallet(this.privateKey, provider);
    const tx = { to: address, value: ethers.utils.parseEther("10.0") };
    console.log(`Sending ${this.amount} ${this.tokenName} to ${address}`);
    const createReceipt = await wallet.sendTransaction(tx);
    await createReceipt.wait();
    console.log("Transfer sent with hash", this.amount);
}
  
  // function that telgram bot calls
  async requestToken(message) {
    let response;
    const now = Date.now();
    //   const username = message["from"]["username"];
    const senderId = message["from"]["id"];
    // Get the senders record
    const senderRecords = this.records[senderId];

    const address = this.getAddressFromMessage(message);
    const etherAddress = ethers.utils.isAddress(address);

    if (address) {
      response = `Sending ${this.amount} ${this.tokenName} to ${address}!`;
      // if exists
      if (senderRecords) {
        // make sure last request was long time ago
        const last = senderRecords.slice(-1)[0];
        // check if now - last > timeLimitHours * 60 * 60 * 1000
        if (now - last > this.timeLimitHours * 1000 * 60 * 60) {
          // yes limit has passed

          if (etherAddress) {
            await this.sendEtherToken(address);
          }else {
            await this.sendToken(address);
          }
          // update the records to show this
          this.records[senderId].push(now);
        } else {
          // this means user requested tokens already
          response = this.timeLimitMessage;
        }
      } else {
        // this is users first request
        // yes limit has passed
        if (etherAddress) {
          await this.sendEtherToken(address);
        }else {
          await this.sendToken(address);
        }
        // create the record
        this.records[senderId] = [];
        // update the records to show this
        this.records[senderId].push(now);
      }
    } else {
      response = this.invalidAddressMessage;
    }
    return response;
  }
}

// load env vars
require("dotenv").config();

const config = {
  types: ADDITIONAL_TYPES,
  providerUrl: process.env.NODE_WS_URL,
  rpcUrl: process.env.RPC_URL,
  amount: parseFloat(process.env.AMOUNT),
  tokenName: process.env.TOKEN_NAME,
  addressType: parseInt(process.env.ADDRESS_TYPE),
  timeLimitHours: parseFloat(process.env.TIME_LIMIT_HOURS),
  decimals: parseInt(process.env.DECIMALS),
  mnemonic: process.env.MNEMONIC,
  privateKey: process.env.PRIVATE_KEY,
};

const faucet = new GenericFaucetInterface(config);

// Initialize telegram bot
const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
// Initialize the faucet

bot.start(async (ctx) => {
  await ctx.reply(faucet.getHelpMessage());
});

bot.help(async (ctx) => {
  await ctx.reply(faucet.getHelpMessage());
});

bot.command("request", async (ctx) => {
  const resp = await faucet.requestToken(ctx.message);
  await ctx.reply(resp);
});

// Run the bot
bot.launch();
