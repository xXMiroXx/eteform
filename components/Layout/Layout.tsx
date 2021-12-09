import { NavProps } from "@/types/nav";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

export default function Layout({ navList, contacts, children }: any) {
  return (
    <>
      <Navbar navList={navList} />
      <main>{children}</main>
      {/* <Footer countries={contacts} /> */}
    </>
  );
}
