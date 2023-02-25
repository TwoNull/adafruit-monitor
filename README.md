# Adafruit Monitor
    After seeing a recent restock of the ESP32-S2 Reverse TFT Feather sell out in under 5 minutes, I got fed up and finally created a product monitor for Adafruit.com. This monitor utilizes a public Algolia search endpoint to collect stock and product data based on a search query.

# Instructions
    Rename the .env.example file to .env and set the correct variables for your webhook and the product search you want to monitor. Start the monitor using

    ```npm start```