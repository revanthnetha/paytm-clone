import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";

interface Txn {
  id: string;
  amount: number;
  senderId: string;
  receiverId: string;
  time: Date;
  senderEmail?: string;
  receiverEmail?: string;
}

export const P2PtxnsHistory = ({
  Txns,
  type,
}: {
  Txns: Txn[];
  type: string;
}) => {
  return (
    <Center>
      <Card title={`${type} Transactions`}>
        <ul className="list-disc list-inside">
          {Txns.length > 0 ? (
            Txns.map((txn: Txn) => (
              <li key={txn.id}>
                {type} {txn.amount / 100} {type == "sent" ? "to " : "from "} 
                  {type == "sent" ? txn.receiverEmail : txn.senderEmail}{" "}
                on {new Date(txn.time).toLocaleString()}
              </li>
            ))
          ) : (
            <li>No sent transactions found.</li>
          )}
        </ul>
      </Card>
    </Center>
  );
};
