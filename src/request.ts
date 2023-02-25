import Axios from "axios";

export async function getProducts(query: string) {
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://w9dmm4oth0-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.24.3%3BJS%20Helper%202.21.1&x-algolia-application-id=W9DMM4OTH0&x-algolia-api-key=929ce6f84af11b19c73f4fd5778122cc",
    headers: {
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
      Origin: "https://www.adafruit.com",
      Referer: "https://www.adafruit.com/",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
      accept: "application/json",
      "content-type": "application/x-www-form-urlencoded"
    },
    data: JSON.stringify({
      requests: [
        {
          indexName: "prod_products",
          params:
            `query=${encodeURIComponent(query)}&hitsPerPage=10&maxValuesPerFacet=2000&page=0&facets=%5B%22availability%22%5D&tagFilters=&facetFilters=`,
        }
      ],
    }),
  };
  const res = await Axios(config);
  return res;
}
