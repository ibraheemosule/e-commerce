import { NextApiResponse, NextApiRequest } from "next";
import { OrderType } from "../../../utils/ts-types/__store/typesUser";
import { OrderModel, IOrderModel } from "../../../lib/db/models/order";
import { sendEmail } from "../../../lib/email-notification/email";
import { confirmedOrderMsg } from "../../../lib/email-notification/messages";

interface IRequest extends NextApiRequest {
  body: OrderType;
}

export default async function postOrder(req: IRequest, res: NextApiResponse) {
  // delete req.body.deliveryDetails._id;
  // delete req.body.deliveryDetails.password;
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const newOrder: IOrderModel = await OrderModel.create(req.body).catch(
      (e) => {
        console.log(e);
        throw new Error("Internal Server Error");
      }
    );

    delete newOrder.__v;

    let productsOrdered = "";

    newOrder.items.forEach((item) => {
      productsOrdered += `${item.quantity} ${item.gender} ${item.tag} ${item.name} = ₦${item.price}\n`;
    });

    productsOrdered += `\nTotal Amount + Shipping = ${newOrder.amount} \n\n Thank you for patronizing us.`;

    await sendEmail(
      "Your Order Has Been Received",
      "",
      newOrder.buyer,
      confirmedOrderMsg(newOrder._id as string, productsOrdered)
    );

    return res.status(200).json({ data: newOrder.toObject() as OrderType });
  } catch (e) {
    console.log(e);
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
