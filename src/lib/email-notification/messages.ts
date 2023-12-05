import { IUserModel } from "../db/models/user";
import { firstLetterUpperCase } from "../../utils/utilsFunctions";
import { IOrderModel } from "../db/models/order";
import { emailTemplate } from "./email-html-template";

export const accCreatedMsg = (user: IUserModel) => {
  const name = `${firstLetterUpperCase(user.firstName)} ${firstLetterUpperCase(
    user.lastName
  )}`;
  const message = `
    Thank you for signing up to our online store.<br/><br/><br/>
    Here are your details<br/><br/>

    Name: ${name}<br/>
    Email: ${user.email}<br/>
    Address: ${user.address}<br/>
    City: ${firstLetterUpperCase(user.city)}<br/>
    State: ${firstLetterUpperCase(user.state)}<br/>
    Phone Number: ${user.phoneNo}<br/>
    
    We look forward to your patronage`;
  return emailTemplate(message, name);
};

export const passwordMsg = () => {
  const message = `
  <h2>
  Your password was changed</h2>
  <p>If you didn't initiate this action, kindly reach out to us.</p>
  `;
  return emailTemplate(message);
};

export const detailsUpdateMsg = () => {
  const message = `<h3>Your account details have been updated</h3>
<p>If you didn't initiate this action, kindly reach out to us.</p>`;
  return emailTemplate(message);
};

export const confirmedOrderMsg = (order: IOrderModel) => {
  let productsOrdered = "";
  order.items.forEach((item) => {
    productsOrdered += `${item.quantity} ${item.gender} ${item.tag} ${item.name} = ₦${item.price}\n`;
  });

  return `Your order of ID ${order._id} has been received.
  
  <p>Products ordered are:
    ${productsOrdered}</p>
    <p>Total Amount + Shipping = <bold>${order.amount}</bold></p>
    
    <p>Order will be dispatched to:</p>
    <p>Name: ${order.deliveryDetails.firstName} ${order.deliveryDetails.lastName}</p>
    <p>Phone Number: ${order.deliveryDetails.phoneNo}</p>
    <p>Address: ${order.deliveryDetails.address}</p>
    <p>City: ${order.deliveryDetails.city}</p>
    <p>State: ${order.deliveryDetails.state}</p><br/>

    <p>Thank you for patronizing us</p>`;
};

export const sendOtp = (otp: string) => {
  const message = `
<h2>Verify your email at 1907Store</h2>
  
 <h3><small>Your OTP: </small><bold>${otp}</bold></h3>
<p>Expires in five minutes</p>

<p>If you didn't initiate this action, Please disregard this email.</p>`;

  return emailTemplate(message);
};
