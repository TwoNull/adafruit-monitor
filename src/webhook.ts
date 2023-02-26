import { WebhookClient } from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const webhook = new WebhookClient({ url: process.env.DISCORD_WEBHOOK! });
const query = process.env.SEARCH_QUERY;

export function newProductHook(
  productName: string,
  productID: string,
  stockStatus: string,
  price: string,
  updatedTimestamp: number,
  cartable: boolean,
  sale: boolean,
  imageURL: string
) {
  console.log(productID);
  webhook.send({
    username: "Dark2 Adafruit Monitor",
    avatarURL:
      "https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png",
    embeds: [
      {
        title: `New Product Found!`,
        description: `For Search Query \`${query}\``,
        color: 0x1a1a1a,
        fields: [
          {
            name: `Product Name`,
            value: productName,
          },
          {
            name: `Stock Status`,
            value: stockStatus,
            inline: true,
          },
          {
            name: `Price`,
            value: price,
            inline: true,
          },
          {
            name: `Time Updated`,
            value: new Date(updatedTimestamp * 1000).toISOString(),
          },
          {
            name: `Cartable?`,
            value: String(cartable),
            inline: true,
          },
          {
            name: `On Sale?`,
            value: String(sale),
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        thumbnail: {
          url: imageURL,
          height: 0,
          width: 0,
        },
        footer: {
          text: `Dark2 Industries | Adafruit`,
          icon_url: `https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png`,
        },
        url: `https://www.adafruit.com/product/${productID}`,
      },
    ],
  });
}

export function productRestockHook(
  productName: string,
  productID: string,
  stockStatus: string,
  price: string,
  updatedTimestamp: number,
  cartable: boolean,
  sale: boolean,
  imageURL: string
) {
  console.log(productID);
  webhook.send({
    username: "Dark2 Adafruit Monitor",
    avatarURL:
      "https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png",
    embeds: [
      {
        title: `Product Restocked!`,
        description: `For Search Query \`${query}\``,
        color: 0x1a1a1a,
        fields: [
          {
            name: `Product Name`,
            value: productName,
          },
          {
            name: `Stock Status`,
            value: stockStatus,
            inline: true,
          },
          {
            name: `Price`,
            value: price,
            inline: true,
          },
          {
            name: `Time Updated`,
            value: new Date(updatedTimestamp * 1000).toISOString(),
          },
          {
            name: `Cartable?`,
            value: String(cartable),
            inline: true,
          },
          {
            name: `On Sale?`,
            value: String(sale),
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        thumbnail: {
          url: imageURL,
          height: 0,
          width: 0,
        },
        footer: {
          text: `Dark2 Industries | Adafruit`,
          icon_url: `https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png`,
        },
        url: `https://www.adafruit.com/product/${productID}`,
      },
    ],
  });
}

export function productUpdateHook(
  productName: string,
  productID: string,
  stockStatus: string,
  price: string,
  updatedTimestamp: number,
  cartable: boolean,
  sale: boolean,
  imageURL: string
) {
  console.log(productID);
  webhook.send({
    username: "Dark2 Adafruit Monitor",
    avatarURL:
      "https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png",
    embeds: [
      {
        title: `Product Information Updated!`,
        description: `For Search Query \`${query}\``,
        color: 0x1a1a1a,
        fields: [
          {
            name: `Product Name`,
            value: productName,
          },
          {
            name: `Stock Status`,
            value: stockStatus,
            inline: true,
          },
          {
            name: `Price`,
            value: price,
            inline: true,
          },
          {
            name: `Time Updated`,
            value: new Date(updatedTimestamp * 1000).toISOString(),
          },
          {
            name: `Cartable?`,
            value: String(cartable),
            inline: true,
          },
          {
            name: `On Sale?`,
            value: String(sale),
            inline: true,
          },
        ],
        timestamp: new Date().toISOString(),
        thumbnail: {
          url: imageURL,
          height: 0,
          width: 0,
        },
        footer: {
          text: `Dark2 Industries | Adafruit`,
          icon_url: `https://cdn.discordapp.com/attachments/1045165622943830038/1078050827513634937/adafruit_logo_small.png`,
        },
        url: `https://www.adafruit.com/product/${productID}`,
      },
    ],
  });
}
