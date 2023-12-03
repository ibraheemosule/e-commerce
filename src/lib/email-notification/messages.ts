import { IUserModel } from "../db/models/user";
import { firstLetterUpperCase } from "../../utils/utilsFunctions";
import { IOrderModel } from "../db/models/order";

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD as string;
const ADMIN_PHONE_NO = process.env.ADMIN_PHONE_NO as string;

const emailContent = (body: string, name = "") => `
<html>
<head>
  <style>
    h1 {
      font-weight: 800;
      font-size: 24px;
    }

    footer {
      background-color: #333;
      color: white;
      text-align: center;
      padding: 20px;
    }

    img {
      width: 100px; /* Adjust the width of your logo */
      height: auto;
    }

    a {
      color: #fff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
<p>Hello ${name}</p>
  <main>
  ${body}
  </main>

  <footer>
    <!-- Replace 'your-company-logo.png' with the actual path to your company logo -->
    <img src="your-company-logo.png" alt="Company Logo">

    <p>
      1907Store<br>
      Phone: ${ADMIN_PHONE_NO}<br>
      Email: ${EMAIL_PASSWORD}
    </p>

    <p>1907Store is your one stop online store for all quality leather wears and accessories</p>

    <p>
      <a href="https://www.1907Store.vercel.app">Visit Our Website</a>
    </p>

    <p>
      Follow us on:
      <a href="#" target="_blank">Instagram</a>
      <span> | </span>
      <a href="#" target="_blank">Twitter</a>
      <span> | </span>
      <a href="#" target="_blank">Facebook</a>
    </p>
  </footer>
</body>
</html>`;

export const accCreatedMsg = (user: IUserModel) => {
  const name = `${firstLetterUpperCase(user.firstName)} ${firstLetterUpperCase(
    user.lastName
  )}`;
  const message = `Thank you for signing up to our online store.<br/>
    Here are your details</br>

    Name: ${name}</br>
    Email: ${user.email}</br>
    Address: ${user.address}</br>
    City: ${firstLetterUpperCase(user.city)}</br>
    State: ${firstLetterUpperCase(user.state)}</br>
    Phone Number: ${user.phoneNo}</br></br>
    
    We look forward to your patronage`;
  return emailContent(message, name);
};

export const passwordMsg = (password: string) => {
  const message = `<p>Hello</p>
  <p style="font-size: 16px; margin-top: 10px;">
  Your password was changed.
  Your new password is ${password}
  If you didn't initiate this action, kindly reach out to us.
  </p>
  <footer style="background-color: yellow;>
  <h2>1907 Stores <small>Is the one stop shop to get all your quality leather wears and bags</small></h2>
  <h4>Contact Us On</h4>
  </footer>
  `;
  return emailContent(message);
};

export const detailsUpdateMsg = () => `Your account details have been updated.
If you didn't initiate this action, kindly reach out to us.`;

export const confirmedOrderMsg = (order: IOrderModel) => {
  let productsOrdered = "";
  order.items.forEach((item) => {
    productsOrdered += `${item.quantity} ${item.gender} ${item.tag} ${item.name} = ₦${item.price}\n`;
  });

  return `Your order of ID ${order._id} has been received.
  
    Products ordered are:
    ${productsOrdered}
    Total Amount + Shipping = ${order.amount}
    
    Order will be dispatched to:
    Name: ${order.deliveryDetails.firstName} ${order.deliveryDetails.lastName}
    Phone Number: ${order.deliveryDetails.phoneNo}
    Address: ${order.deliveryDetails.address}
    City: ${order.deliveryDetails.city}
    State: ${order.deliveryDetails.state}
    
    Thank you for patronizing us`;
};

export const sendOtp = (otp: string) =>
  `
<html>
  <head>
    <style>
      body {
        font-family: 'Arial', sans-serif;
        background-color: #f0f0f0;
      }
      h1 {
        color: #3498db;
      }
      p {
        color: #555;
      }
    </style>
  </head>
  <body>
    <h1>Hello!</h1>
    <p>This is a styled HTML email sent from Nodemailer.${otp}</p>
  </body>
</html>
`;
