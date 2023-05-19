import { IUserModel } from "../db/models/user";
import { firstLetterUpperCase } from "../../utils/utilsFunctions";

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

export const detailsUpdateMsg = `Your account details have been updated.
If you didn't initiate this action, kindly reach out to us.`;

export const confirmedOrderMsg = (id: string, orders: string) =>
  `Your order of ID ${id} has been received.
  
  Products ordered are:
  ${orders}`;
