import Link from "next/link";

import { register_page } from "@/lib/routes";
import { LoginComponent } from "@/components/pagecomp/login";

export default function Home() {
  return (
    <main className="mx-auto flex w-full flex-col justify-center space-y-5 sm:w-[400px]">
      <div className="flex flex-col text-center mb-0">
        <h1 className="text-xl font-semibold tracking-tight mb-0">
          Welcome Back!
        </h1>
      </div>
      <div className="grid gap-6">
        <LoginComponent />
        <div className="text-center text-sm mt-2">
          <p>
            Don&apos;t have an account? &nbsp;
            <Link
              href={register_page}
              className="font-medium underline hover:text-blue-700"
            >
              Create now
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
