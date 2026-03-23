import { AppNav } from "@/components/navigation/AppNav";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <AppNav />
      {children}
    </div>
  );
}
