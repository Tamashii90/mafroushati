<div align="center">
    <h1>Mafroushati</h1>
    <img alt="img" src="https://i.imgur.com/hLIeIjz.png" />
    <h5>Mafroushati isn't a real company. This website was built purely for educational purposes.</h5>
</div>

## Features

- Payment gateway (PayPal sandbox).
- Admins can create, edit, or delete products.
- Product reviews.
- Search functionality.
- Uses Imgur's API to handle image storage.
- Uses [SWR](https://swr.vercel.app/) for a smoother experience.

## Typical Workflow

- [Customer](#customer)
- [Admin](#admin)

## Customer

1. Browse through products and add desired ones to the shopping cart. The shopping cart uses localStorage for a smooth experience.
2. Checkout by clicking the shopping cart icon. This will prompt the user to register/log in, and then redirect to the checkout page:
<div align="center">
    <img alt="img" src="https://i.imgur.com/eHbaS5P.png" />
</div>

3. Fill in PayPal credentials and choose payment method & shipping address. **All PayPal operations (creating the order then capturing it) are handled on the backend**. Since this isn't a real company, PayPal sandbox is used. Feel free to use these credentials:
<div align="center">
    <img alt="img" src="https://i.imgur.com/R9RgNqW.png" />
</div>

4. If all goes well, the customer will be redirected to the main page, and a success message will pop up.
<div align="center">
    <img alt="img" src="https://i.imgur.com/Pa0qQoT.png" />
</div>

&nbsp;

## Admin

- #### Add products via /admin page:

<div align="center">
    <img alt="img" src="https://i.imgur.com/JI9WYbT.png" />
</div>

- #### Edit/delete a product via the product's page. These buttons don't show up for non-admin accounts:

<div align="center">
    <img alt="img" src="https://i.imgur.com/s87Xjvc.png" />
</div>

- #### Set a review as featured. Featured reviews show up on the main page and can't be edited.
<div align="center">
    <img alt="img" src="https://i.imgur.com/qgCe4HO.png" />
    <img alt="img" src="https://i.imgur.com/iuuB6Rw.png" />
    <img alt="img" src="https://i.imgur.com/0Q8lTnP.png" />
</div>
