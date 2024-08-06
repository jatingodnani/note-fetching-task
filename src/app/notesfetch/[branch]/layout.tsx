import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
     <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </div>
  );
}