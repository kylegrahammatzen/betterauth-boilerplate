type SignInButtonProps = {
  provider: "google" | "github";
};

const SignInButton = (props: SignInButtonProps) => {
  return <h1>Sign in with {props.provider}</h1>;
};

export { SignInButton };
