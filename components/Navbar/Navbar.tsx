import React from "react";
import Link from "next/link";
import Item from "@/components/UI/Item";
import Styles from "./Navbar.module.scss";
import Btn from "@/components/UI/Btn";
import LoginBox from "../Layout/LoginBox";
import Logo from "../Logo";

type NavItem = {
  link?: string;
  id: string;
  name: string;
  icon: string;
  nestedList?: any[];
};
type Props = {
  navList: NavItem[];
};

type State = {
  main: boolean;
  nested: string | "";
};

/**
 * @description Main Navbar
 */

export default class Navbar extends React.Component<Props, State> {
  state: State = { main: false, nested: "" };

  navRef = React.createRef<HTMLUListElement>();
  navBtnRef = React.createRef<HTMLDivElement>();

  clickOut = (e: { target: any }) => {
    if (
      this.navRef &&
      this.navBtnRef &&
      !(
        this.navRef.current?.contains(e.target) ||
        this.navBtnRef.current?.contains(e.target)
      )
    )
      this.setState({ main: false, nested: "" });
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.clickOut);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.clickOut);
  }

  mainNavActive() {
    this.setState((cur) => {
      return { nested: "", main: !cur.main };
    });
  }

  nestedNavActive(id: string) {
    this.setState((cur) => {
      const curCopy = { ...cur };
      if (id === cur.nested) curCopy.nested = "";
      else curCopy.nested = id;
      return curCopy;
    });
  }

  listGenerator(item: NavItem) {
    if (item.nestedList) {
      return (
        <li key={item.id} className={Styles.nav__item}>
          <nav className={Styles.nav__nested}>
            <div className={Styles["nav__nested-title"]}>
              <Btn
                handler={this.nestedNavActive.bind(this, item.id)}
                color="info"
              >
                <Item name={item.name} icon={item.icon} />
              </Btn>
            </div>
            <ul
              className={`${Styles["nav__nested-list"]} 
            ${
              (this.state.nested === item.id &&
                Styles["nav__nested-list--active"]) ||
              ""
            }`}
            >
              {item.nestedList.map(this.listGenerator.bind(this))}
            </ul>
          </nav>
        </li>
      );
    }

    return (
      <li key={item.id} className={Styles.nav__item}>
        <Link href={item.link || "#"}>
          <a>
            <Item name={item.name} icon={item.icon} />
          </a>
        </Link>
      </li>
    );
  }

  render() {
    return (
      <nav className={Styles.nav}>
        <div ref={this.navBtnRef}>
          <Btn handler={this.mainNavActive.bind(this)}>
            <Item icon="FaBars" className={Styles.nav__toggler} />
          </Btn>
        </div>
        <LoginBox />
        <ul
          ref={this.navRef}
          className={`${Styles.nav__list} ${
            (this.state.main && Styles["nav__list--active"]) || ""
          }`}
        >
          {this.props.navList.map(this.listGenerator.bind(this))}
        </ul>
        <Logo className={Styles.nav__logo} />
      </nav>
    );
  }
}
