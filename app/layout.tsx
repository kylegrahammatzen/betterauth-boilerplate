import "@/styles/tailwind.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{props.children}</body>
    </html>
  );
}
