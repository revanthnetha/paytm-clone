import SidebarClient from "../../components/SidebarClient";

export default function Layout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarClient />
      
      {/* Main Content */}
      <div className="flex-1">{children}</div>
    </div>
  );
}
