import { SignInButton } from "@/components/SignInButton";

export default async function Home() {
  return (
    <div>
      <SignInButton provider="google" />
    </div>
  );
}
