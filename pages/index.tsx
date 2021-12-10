import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import WroldSection from "@/components/WorldSection/WorldSection";
import { NavProps } from "@/types/nav";
import localRetrive from "helper/local-retrive";

import Styles from "./index.module.scss";
export default function Home({ navList, children, contacts, images }: any) {
  return (
    <Layout navList={navList} contacts={contacts}>
      <section id="section-hero" className={Styles["section-hero"]}>
        <Hero photos={images} />
      </section>
      <section>
        <WroldSection />
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const props: any = {};
  // Get static data.
  props.navList = await localRetrive("main-nav-list");
  props.contacts = await localRetrive("contact-info");
  props.images = await localRetrive("hero-comp-imgs");
  // props.hero=localRetrive("hero");
  return { props };
}
