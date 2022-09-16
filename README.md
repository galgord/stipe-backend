# stripe-backend


## API Reference
#### API URL
```
https://koombea-stripe-backend.herokuapp.com/
```

## Endpoints
#### Get Publishable Key

```http
GET /publishable-key
```

return the Stripe publishable API_KEY that is used to init the Stripe Instancne

---

#### Create Payment Card

Gets the information for the credit card and creates and Id for it with Stripe
```http
POST /create-payment-card
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `number`      | `number` | **Required**. Number of the Credit card |
| `exp_month`      | `number` | **Required**. Experation Month of the credit card |
| `exp_year`      | `number` | **Required**. Experation Year of the credit card in two digits|
| `cvc`      | `number` | **Required**. cvc of the credit card|

---

#### Create Customer with Credit Card

```http
POST /create-customer
```
**Before calling this method make sure to call the endpoint above to creaete a card.**
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of the customer |
| `email`      | `string` | **Required**. Email of the customer |
| `phone`      | `string` | **Required**. Phone of the customer|
| `address`      | `object` | **Required**. Adrees is an object that gets the following params: line1, city, state, country, postal_code |
| `payment_method`      | `string` | **Required**. Id of the payment method |
