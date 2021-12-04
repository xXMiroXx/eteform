import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import { NavProps } from "@/types/nav";
import localRetrive from "helper/local-retrive";

import Styles from "./index.module.scss";
export default function Home({ navList, children, contacts }: any) {
  return (
    <Layout navList={navList} contacts={contacts}>
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
  props.contacts = await localRetrive("contact-info");
  // props.hero=localRetrive("hero");
  return { props };
}
