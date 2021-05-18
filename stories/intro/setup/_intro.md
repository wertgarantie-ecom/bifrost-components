# The Future of Cross-Selling

This storybook contains all information for partners and developers that is needed to integrate WERTGARANTIE's-Components.

Do you have questions or are interested? Write us at <a href="mailto:ecommerce@wertgarantie.com">ecommerce@wertgarantie.com</a>!
We &#128153; Open Source! Find us on [Github](https://github.com/wertgarantie-ecom).

# Introduction
This guide will show you how to implement the key WERTGARANTIE components. At the moment there is a total of three components which need to be setup in front to get it working in your online store.

You'll need a 
* __selection component__ (either selection-popup, or selection-embedded), the
* __confirmation component__ and the 
* __after-sales component__. 

An extensive documentation can be found in the following chapters and within the component documentation itself under "2. Components".

Each Component is initialized by a script-block, which itself must be provided with all neccessary data (by the partner-shop). Additionaly a ```placeholder-div``` must by provided as well. The concept is further described within the following sub chapters.

### E-Mail address (optional)
Please provide us with a shop-email address so that we can inform you on new insurace contracts. This service may be replaced with a respective reporting in the future.

### Environments and credentials
We provide two different environments: ```staging``` and ```production```. You will receive two seperate e-mails with the neccessary credentials (publicId and secret) for each environment.

The publicId is the public shop identifier which is passed to each component-loader-script. The secret on the other hand is used to protect the actual insurance contract and guarantee the insurace selection or any passed product / client information was not modified by a third party.




