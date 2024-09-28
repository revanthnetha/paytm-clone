"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";

export default function AppbarClient(): JSX.Element {
  const session = useSession();
  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ callbackUrl: "/api/auth/signin" });
        }}
        user={session.data?.user}
      />
    </div>
  );
}
