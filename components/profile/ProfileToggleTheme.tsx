import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeProvider";

const ProfileToggleTheme = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between px-2 py-2">
      <span className="text-sm font-medium">Theme</span>
      <Tabs
        defaultValue={theme}
        onValueChange={(value) => setTheme(value as typeof theme)}
        className="ml-auto"
      >
        <TabsList className="grid h-7 w-24 grid-cols-3 p-0">
          <TabsTrigger
            value="light"
            className="h-full px-0 py-0 rounded-l-md rounded-r-none transition-colors hover:bg-primary/10"
          >
            <Sun className="h-4 w-4" />
            <span className="sr-only">Light</span>
          </TabsTrigger>
          <TabsTrigger
            value="dark"
            className="h-full px-0 py-0 rounded-none transition-colors hover:bg-primary/10"
          >
            <Moon className="h-4 w-4" />
            <span className="sr-only">Dark</span>
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="h-full px-0 py-0 rounded-r-md rounded-l-none transition-colors hover:bg-primary/10"
          >
            <Laptop className="h-4 w-4" />
            <span className="sr-only">System</span>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export { ProfileToggleTheme };
