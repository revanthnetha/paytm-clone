"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import React, { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export interface p2pInputType {
  email: string;
  amount: number;
}

export const P2PTransferCard = () => {
  const [input, setInput] = useState<p2pInputType>({
    email: "",
    amount: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  return (
    <Card title="P2P Transfer">
      <div className="w-full">
        <TextInput
          label={"Email"}
          placeholder={"Email"}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, email: e }));
          }}
        />
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, amount: Number(e) * 100 })); // Assuming amount is in cents
          }}
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={async () => {
            try {
              setErrorMessage(null); 
              setSuccessMessage(null);
              await p2pTransfer(input);
              setSuccessMessage("Transfer successful!");
            } catch (error) {
              setErrorMessage("Transfer failed: " + (error as Error).message);
            }
          }}
        >
          Transfer Money
        </Button>
      </div>

      {errorMessage && <div className="text-red-500 mt-4">{errorMessage}</div>}
      {successMessage && <div className="text-green-500 mt-4">{successMessage}</div>}
    </Card>
  );
};
