"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

import crypto from "crypto";

export async function CreateOnRampTransaction(
  amount: number,
  provider: string
) {
  const session = await getServerSession(authOptions);
  // originally this token would be get by axios.get()=>bank
  const token = crypto.randomBytes(32).toString("hex");
  const userId = session?.user?.id;
  if (!userId) {
    return {
      message: "user not logged in",
    };
  }
  try {
    await prisma.onRampTransactions.create({
      data: {
        userId,
        provider,
        amount,
        startTime: new Date(),
        token,
        status: "pending",
      },
    });
    return {
        message:"On Ramp Transaction Request Sent"
    }
  } catch (e) {
    console.log(e);
    return {
      message: e,
    };
  }
}
