import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions.map((t, index) => (
          <div className="flex justify-between mt-3" key={index}>
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.time.toDateString()}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
              <div
                className={`flex flex-col justify-center text-xs ${
                  t.status === "success" ? "text-green-500" : "text-red-500"
                }`}
              >
                {t.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
