import { SignInButton } from "@/components/SignInButton";

export default async function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <div className="grid grid-cols-2 gap-4">
          <SignInButton provider="google" />
          <SignInButton provider="github" />
        </div>
      </div>
    </div>
  );
}
