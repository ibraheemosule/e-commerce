import { NextApiResponse, NextApiRequest } from "next";
import { OrderType } from "../../../utils/ts-types/__store/typesUser";
import { OrderModel, IOrderModel } from "../../../lib/db/models/order";

interface IRequest extends NextApiRequest {
  body: OrderType;
}

export default async function getOrder(req: IRequest, res: NextApiResponse) {
  try {
    const buyer = req.query.email as string;

    const data = await OrderModel.find({ buyer }, { id: 0, __v: 0 })
      .then((res: IOrderModel[]) => res)
      .catch((e) => {
        console.log(e);
        res.status(401).json({ message: "Internal error occured" });
      });

    console.log(data);

    return res.status(200).json({ data });
  } catch (e) {
    console.log(e);
    let message = "Internal server error";
    if (e instanceof Error) message = e.message;
    return res.status(401).json({ message });
  }
}
