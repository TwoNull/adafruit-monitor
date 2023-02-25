import { getProducts } from './request'
import { newProductHook, productRestockHook, productUpdateHook } from './webhook'

export async function monitor(query: string) {
    let results: any[] = []
    try {
        const initRes = await getProducts(query)
        results = initRes.data.results[0].hits
    }
    catch {
        console.log('Error on Initial Request')
        return
    }
    await timeout(4000)
    while(true) {
        try {
            const nextRes = await getProducts(query)
            const nextResults = nextRes.data.results[0].hits
            results = await compare(results, nextResults)
        }
        catch (err) {
            console.log(err)
        }
        await timeout(4000)
    }
}

async function compare(oldResults: any[], newResults: any[]) {
    if(oldResults != newResults) {
        if(newResults.length > oldResults.length) {
            for(let res in newResults) {
                if(isNewProduct(newResults[res], oldResults)) {
                    const newProduct = newResults[res]
                    const webhookParams = {
                        productName: newProduct.name,
                        productID: newProduct.objectID,
                        stockStatus: newProduct.list_tag,
                        price: newProduct.price,
                        updatedTimestamp: newProduct.last_modified,
                        cartable: newProduct.add_to_cart,
                        sale: newProduct.on_sale,
                        imageURL: `https://cdn-shop.adafruit.com/310x233/${newProduct.image}`
                    }
                    if(newProduct.is_video) {
                        webhookParams.imageURL = `https://cdn-shop.adafruit.com/product-videos/320x240/${newProduct.image}.jpg`
                    }
                    newProductHook(webhookParams.productName, webhookParams.productID, webhookParams.stockStatus, webhookParams.price, webhookParams.updatedTimestamp, webhookParams.cartable, webhookParams.sale, webhookParams.imageURL)
                }
            }
        }
        else if(newResults.length === oldResults.length) {
            for(let res in newResults) {
                if(newResults[res].parts_visible_stock > 0 && oldResults[res].parts_visible_stock === 0) {
                    const newProduct = newResults[res]
                    const webhookParams = {
                        productName: newProduct.name,
                        productID: newProduct.objectID,
                        stockStatus: newProduct.list_tag,
                        price: newProduct.price,
                        updatedTimestamp: newProduct.last_modified,
                        cartable: newProduct.add_to_cart,
                        sale: newProduct.on_sale,
                        imageURL: `https://cdn-shop.adafruit.com/310x233/${newProduct.image}.jpg`
                    }
                    if(newProduct.is_video) {
                        webhookParams.imageURL = `https://cdn-shop.adafruit.com/product-videos/320x240/${newProduct.image}.jpg`
                    }
                    productRestockHook(webhookParams.productName, webhookParams.productID, webhookParams.stockStatus, webhookParams.price, webhookParams.updatedTimestamp, webhookParams.cartable, webhookParams.sale, webhookParams.imageURL)
                }
                else if((newResults[res].price != oldResults[res].price) || (newResults[res].on_sale != oldResults[res].on_sale && newResults[res].on_sale === true)) {
                    const newProduct = newResults[res]
                    const webhookParams = {
                        productName: newProduct.name,
                        productID: newProduct.objectID,
                        stockStatus: newProduct.list_tag,
                        price: newProduct.price,
                        updatedTimestamp: newProduct.last_modified,
                        cartable: newProduct.add_to_cart,
                        sale: newProduct.on_sale,
                        imageURL: `https://cdn-shop.adafruit.com/310x233/${newProduct.image}.jpg`
                    }
                    if(newProduct.is_video) {
                        webhookParams.imageURL = `https://cdn-shop.adafruit.com/product-videos/320x240/${newProduct.image}.jpg`
                    }
                    productUpdateHook(webhookParams.productName, webhookParams.productID, webhookParams.stockStatus, webhookParams.price, webhookParams.updatedTimestamp, webhookParams.cartable, webhookParams.sale, webhookParams.imageURL)
                }
            }
        }
    }
    return newResults
}

async function timeout(ms: number) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

function isNewProduct(product: any, oldResults: any[]) {
    for(let res in oldResults) {
        if(oldResults[res].objectID === product.objectID) {
            return false
        }
    }
    return true
}