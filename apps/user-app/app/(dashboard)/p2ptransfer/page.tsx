import { getServerSession } from "next-auth";
import { P2PTransferCard } from "../../../components/P2PTransferCard";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { P2PtxnsHistory } from "../../../components/P2PtxnsHistory";

async function getTxns() {
  const session = await getServerSession(authOptions);
  const userDetails = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    include: {
      sentTranfers: true,
      receivedTransfers: true,
    },
  });
  if (!userDetails) {
    throw new Error("User details not found.");
  }

  const sentTxns = userDetails?.sentTranfers;
  const receivedTxns = userDetails?.receivedTransfers;
  
  const sentTxnsWithEmail = await Promise.all(
    sentTxns.map(async (txn)=>{
      const res = await prisma.user.findUnique({
        where:{
          id:txn.receiverId
        },
       select:{
        email:true
       }
      })
      return {...txn,receiverEmail: res?.email || "unknown"}
    })
  )
    const recTxnsWithEmail = await Promise.all(
      receivedTxns.map(async (txn)=>{
        const res = await prisma.user.findUnique({
          where:{
            id:txn.senderId
          },
          select:{
            email:true
          }
        })
        return {...txn,senderEmail:res?.email || "unknown"}
      }
    )
  )

  return {sentTxnsWithEmail,recTxnsWithEmail};
}


const page = async () => {
  const { sentTxnsWithEmail, recTxnsWithEmail } = await getTxns();

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 p-4">
        <div>
          <P2PTransferCard />
        </div>
        <div className="max-w-102 min-w-72">
          <P2PtxnsHistory Txns={sentTxnsWithEmail} type="sent" />
          <div className="pt-4">
            <P2PtxnsHistory Txns={recTxnsWithEmail} type="Received" />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
