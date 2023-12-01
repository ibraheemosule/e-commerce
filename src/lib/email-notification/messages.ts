import { IUserModel } from "../db/models/user";
import { firstLetterUpperCase } from "../../utils/utilsFunctions";
import { IOrderModel } from "../db/models/order";

export const accCreatedMsg = (user: IUserModel) =>
  `Thank you for signing up to our online store.
    Here are your details

    Name: ${firstLetterUpperCase(user.firstName)} ${firstLetterUpperCase(
    user.lastName
  )}
    Email: ${user.email}
    Address: ${user.address}
    City: ${firstLetterUpperCase(user.city)} 
    State: ${firstLetterUpperCase(user.state)} 
    Phone Number: ${user.phoneNo}
    
    We look forward to your patronage`;

export const passwordMsg = (password: string) =>
  `Your password was changed.
  Your new password is ${password}
  If you didn't initiate this action, kindly reach out to us.`;

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
  `Verify your email at 1907Store.
  
Your OTP is ${otp}
Expires in five minutes

If you didn't initiate this action, Please disregard this email.`;
