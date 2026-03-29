import { RegisterForm } from "@/components/auth/RegisterForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Create Account | HarborCart" };

export default function RegisterPage() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
        <p className="mt-1 text-sm text-gray-500">Start shopping with HarborCart</p>
      </div>
      <RegisterForm />
      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
