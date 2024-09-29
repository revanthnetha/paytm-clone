import db from "@repo/db/client";
import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const InputTypes = z.object({
  token: z.string(),
  amount: z.number(),
  userId: z.string(),
});

app.post("/hdfcWebhook", async (req, res) => {
  const payLoad = InputTypes.safeParse(req.body);
  if (!payLoad.success) {
    res.status(411).json("Inputs are not correct");
    return;
  }
  try {
    const statusOfPayment = await db.onRampTransactions.findFirst({
      where:{
        userId:payLoad.data.token
      }
    })
    if(statusOfPayment?.status==="success"){
      res.status(400).json("Payment is already done");
      return;
    }
    
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: payLoad.data.userId,
        },
        data: {
          amount: {
            increment: payLoad.data.amount,
          },
        },
      }),

      db.onRampTransactions.updateMany({
        where: {
          token: payLoad.data.token,
        },
        data: {
          amount: payLoad.data.amount,
          provider: "hdfc",
          status: "success",
        },
      }),
    ]);

    res.status(200).json({ msg: "captured" });
  } catch (e) {
    console.log(e);
    res.status(411).json({ msg: "Refund the amount" });
  }
});

app.listen(3002, () => {
  console.log("Server listening on port 3002");
});
