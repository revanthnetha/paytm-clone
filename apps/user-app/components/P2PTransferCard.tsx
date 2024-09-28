"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import React, { useState } from "react";

interface p2pInputType {
  email: string;
  amount: number;
}

export const P2PTransferCard = () => {
  const [input, setInput] = useState<p2pInputType>({
    email: "",
    amount: 0,
  });
  return (
    <Card title="p2ptransfer">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, amount: Number(e) * 100 }));
          }}
        />
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(e) => {
            setInput((prev) => ({ ...prev, amount: Number(e) * 100 }));
          }}
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={async () => {
            window.location.href = "";
          }}
        >
          Add Money
        </Button>
      </div>
    </Card>
  );
};
