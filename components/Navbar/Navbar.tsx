import React, { MutableRefObject } from "react";
import Link from "next/link";

import * as Icons from "react-icons/fa";
import Collapse from "../UI/Collapse/Collapse";
import Item from "../UI/Item/Item";
import Logo from "../Logo";
import LoginBox from "../Layout/LoginBox";

import Styles from "./Navbar.module.scss";
import { NavItem, NavProps } from "@/types/nav";

class CollapseNav extends Collapse {
  constructor(props: any) {
    super(props);
    this.config.animationTime = 300;
  }
  collapseHead() {
    const icon = (this.state.active && "FaTimes") || "FaBars";
    return (
      <div className={Styles.nav__collapse}>
        <span onMouseDown={this.onClick.bind(this)}>{Icons[icon]({})}</span>
        <span>
          <LoginBox />
        </span>
        <span>
          <Logo className={Styles.nav__logo} />
        </span>
      </div>
    );
  }
}

class CollapseItem extends Collapse {
  constructor(props: any) {
    super(props);
    this.config.animationTime = 300;
  }
  collapseHead() {
    return (
      <li onMouseDown={this.onClick.bind(this)}>
        <Item
          name={this.props.name}
          icon={this.state.active ? "FaChevronUp" : "FaChevronDown"}
        />
      </li>
    );
  }
}

export default class Navbar extends React.Component<
  NavProps,
  { mob: boolean; show: boolean; screenY: number }
> {
  matchWidth: MutableRefObject<MediaQueryList | null>;
  timer: MutableRefObject<NodeJS.Timeout | null>;
  hideTimer: MutableRefObject<NodeJS.Timeout | null>;

  state = { mob: true, screenY: 0, show: true };

  constructor(props: NavProps) {
    super(props);
    this.matchWidth = React.createRef();
    this.timer = React.createRef();
    this.hideTimer = React.createRef();
  }
  mediaChangeHandler = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) this.setState({ mob: false });
    else this.setState({ mob: true });
  };
  hideHandler() {
    if (this.hideTimer.current) clearTimeout(this.hideTimer.current);
    this.hideTimer.current = setTimeout(() => {
      if (this.state.screenY === 0) return;
      this.setState({ show: false });
    }, 1000);
  }

  scrollHandler() {
    if (this.timer.current) clearTimeout(this.timer.current);
    if (this.hideTimer.current) clearTimeout(this.hideTimer.current);
    this.timer.current = setTimeout(() => {
      this.setState((cur) => {
        const newState = { ...cur };
        newState.screenY = scrollY;
        if (scrollY <= cur.screenY) newState.show = true;
        else this.hideHandler();
        return newState;
      });
    }, 50);
  }

  componentDidMount() {
    this.matchWidth.current = window.matchMedia("(min-width : 900px)");
    this.matchWidth.current.addEventListener("change", this.mediaChangeHandler);
    this.mediaChangeHandler(this.matchWidth.current);
    this.setState({ screenY: window.scrollY });
    document.addEventListener("scroll", this.scrollHandler.bind(this));
  }

  componentWillUnmount() {
    if (this.matchWidth.current)
      this.matchWidth.current.removeEventListener(
        "change",
        this.mediaChangeHandler
      );
  }

  generateItem(item: NavItem) {
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

  generateList(list: NavItem[]) {
    return list.map((item) => {
      if (item.nestedList) {
        return (
          <CollapseItem
            className={Styles.collapse__list}
            float={this.state.mob ? false : true}
            key={item.id}
            name={item.name}
          >
            <ul className={Styles.nav__nested}>
              {this.generateList(item.nestedList)}
            </ul>
          </CollapseItem>
        );
      }
      return this.generateItem(item);
    });
  }

  mobNav() {
    return (
      <CollapseNav className={Styles.collapse__nav}>
        <ul className={Styles.nav__list}>
          {this.generateList(this.props.navList)}
        </ul>
      </CollapseNav>
    );
  }

  desktopNav() {
    return (
      <>
        <LoginBox />
        <ul className={`${Styles.nav__list} ${Styles["nav__list--desktop"]}`}>
          {this.generateList(this.props.navList)}
        </ul>
        <Logo className={Styles.nav__logo} />
      </>
    );
  }

  render() {
    return (
      <nav
        style={{
          transform: `translateY(${(this.state.show && "0") || "-100%"})`,
        }}
        className={`${Styles.nav} ${
          (this.state.mob && "") || Styles["nav--desktop"]
        }`}
      >
        {(this.state.mob && this.mobNav()) || this.desktopNav()}
      </nav>
    );
  }
}
