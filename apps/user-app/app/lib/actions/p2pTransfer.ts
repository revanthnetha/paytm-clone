"use server";

import { p2pInputType } from "../../../components/P2PTransferCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer({ email, amount }: p2pInputType) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User is not logged in");
  }
  const toUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!toUser) {
    throw new Error("Receiver User not found");
  }

  try {
    await prisma.$transaction(async (tx) => {
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId"=${userId} FOR UPDATE`;
      //   Lock the thread and only release after txn complete

      const balance = await tx.balance.findUnique({
        where: {
          userId,
        },
      });
      //   console.log("before");
      //   await new Promise((response) => setTimeout(response, 2000));
      //   console.log("after");
      // If the thread is stuck,if the req are coming parallel then this check passes,to avoid this we need to loc and maintain Isolation
      if (!balance || balance.amount < amount) {
        throw new Error("Insufficient balance");
      }

      await tx.balance.update({
        where: {
          userId,
        },
        data: {
          amount: { decrement: amount },
        },
      });

      await tx.balance.update({
        where: {
          userId: toUser.id,
        },
        data: {
          amount: { increment: amount },
        },
      });

      await tx.p2PTransfer.create({
        data: {
          senderId: userId,
          receiverId: toUser.id,
          amount,
          time: new Date(),
        },
      });
    });

    return {
      message: "Transfer Success",
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
