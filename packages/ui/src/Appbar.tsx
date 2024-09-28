import { Button } from "./button";

interface AppbarProps {
  user?: {
    email?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4">
      <div className="text-lg flex flex-col justify-center">PayTM</div>
      <div className="flex flex-row justify-center pt-2 gap-2 ">
        <div className={`${user ? "block" : "hidden"}`}>
          <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full ">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {user ? user.email?.charAt(0) : "N"}
            </span>
          </div>
        </div>
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};
