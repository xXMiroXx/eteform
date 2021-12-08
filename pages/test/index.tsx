import NewNav from "@/components/NewNav/NewNav";
import localRetrive from "helper/local-retrive";

export default function Test({ navList }: any) {
  return <div></div>;
  // return (
  //   <div>
  //     <NewNav navList={navList} />
  //   </div>
  // );
}

export async function getStaticProps() {
  const props: any = {};
  // Get static data.
  props.navList = await localRetrive("main-nav-list");
  // props.hero=localRetrive("hero");
  return { props };
}
