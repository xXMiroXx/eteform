import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import { NavProps } from "@/types/nav";
import localRetrive from "helper/local-retrive";

import Styles from "./index.module.scss";
export default function Home({ navList, children }: NavProps) {
  return (
    <Layout navList={navList}>
      <section id="section-hero" className={Styles["section-hero"]}>
        <Hero />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const props: any = {};
  // Get static data.
  props.navList = await localRetrive("main-nav-list");
  // props.hero=localRetrive("hero");
  return { props };
}
