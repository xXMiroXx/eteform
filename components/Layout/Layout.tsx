import { NavProps } from "@/types/nav";
import Navbar from "../Navbar/Navbar";

export default function Layout({ navList, children }: NavProps) {
  return (
    <>
      <Navbar navList={navList} />
      <main>{children}</main>
      <footer></footer>
    </>
  );
}
