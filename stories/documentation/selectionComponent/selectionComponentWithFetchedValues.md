# Selection component with fetched values

For demonstration purposes, we deployed a piece of software on Heroku: `https://midgard-bff.herokuapp.com/wertgarantie/`. You can make an http call to this server to get Wertgarantie's Google rating but also fetch policies. Fetching policies for now is just mocked, so `https://midgard-bff.herokuapp.com/wertgarantie/policies` makes a http call to a mock server that we also deployed on Heroku. This mock server responds with a default answer for every call as long as `data-device-id` and `data-device-price`, as well as `data-fetch-uri` are set as an attribute in the `<wertgarantie-policy-selection>` tag.

```
<wertgarantie-policy-selection
            data-fetch-uri="https://midgard-bff.herokuapp.com/wertgarantie/policies"
            data-device-id="1234"
            data-device-price="12"
>
</wertgarantie-policy-selection>
```