import { ThemeProvider } from "@/components/provider/ThemeProvider";
import "@/styles/tailwind.css";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout(props: RootLayoutProps) {
  return (
    <ThemeProvider>
      <html lang="en">
        <body>{props.children}</body>
      </html>
    </ThemeProvider>
  );
}
