"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginCard = () => {
  const router = useRouter();
  const [SignInputs, setSignInputs] = useState({
    email: "",
    password: "",
  });

  async function signInRequest() {
    try {
      const res = await signIn("credentials", {
        email: SignInputs.email,
        password: SignInputs.password,
        redirect: false,
      });
      console.log(res);
      const session = useSession();
      if (session.data?.user) router.push("/dashboard");
      else console.log("not correct");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex flex-col justify-center align-center items-center mx-auto md:h-screen lg:py-0">
      <div className="w-full  bg-white rounded-lg shadow md:mt-2 sm:max-w-md p-5 m-3 ">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl text-center pb-2">
          Login
        </h1>
        <div className="text-lg text-slate-400 font-bold flex space-x-2 justify-center align-center items-center">
          <h4>Don't have an Account?</h4>
          <Link href={"/signup"} className="text-slate-400 text-sm underline">
            No worries | Signup
          </Link>
        </div>
        <Inputlabel
          type="email"
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => {
            setSignInputs({
              ...SignInputs,
              email: e.target.value,
            });
          }}
        />
        <Inputlabel
          type="password"
          label="Password"
          placeholder="Password"
          onChange={(e) => {
            setSignInputs({
              ...SignInputs,
              password: e.target.value,
            });
          }}
        />
        <div className="flex justify-center align-center items-center">
          <button
            onClick={signInRequest}
            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded mt-3 "
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;

interface Inputs {
  type: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Inputlabel = ({ type, label, placeholder, onChange }: Inputs) => {
  return (
    <div>
      <label className="block mb-2 text-sm md:text-md font-medium text-gray-900 mt-3">
        {label}
      </label>
      <input
        type={type}
        name="email"
        id={label}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder={placeholder}
        required
        onChange={onChange}
      />
    </div>
  );
};
function getServerSession() {
  throw new Error("Function not implemented.");
}
