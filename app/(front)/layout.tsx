
import { getSession } from "@/actions/auth";
import { redirect } from "next/navigation";
import { SiteHeader } from "./components/site-header";

export default async function FrontLayout({ children }: { children: React.ReactNode }) {
   const session = await getSession();
    // if (!session) redirect("/login");
  
    const user = session?.user;
  return (
    <>
    <SiteHeader/>
      {/* Main Content - with top padding for fixed navbar */}
      <main className="pt-16 lg:pt-20">{children}</main>
    </>
  );
}
