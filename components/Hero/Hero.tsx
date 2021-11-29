import React from "react";
import SearchBox from "../SearchBox/SearchBox";
import Styles from "./Hero.module.scss";
import Composition from "./Composition";

export default class Hero extends React.Component {
  state = { desktop: false };

  mediaQuery: MediaQueryList | null = null;

  mediaHandler = (e: MediaQueryListEvent) => {
    this.setState({ desktop: e.matches });
  };
  componentDidMount() {
    this.mediaQuery = window.matchMedia("(min-width:900px)");
    this.mediaQuery.addEventListener("change", this.mediaHandler);
    this.setState({ desktop: this.mediaQuery.matches });
  }

  componentWillUnmount() {
    this.mediaQuery?.removeEventListener("change", this.mediaHandler);
  }
  render() {
    return (
      <div className={Styles.hero}>
        <div className={Styles.hero__photos}>
          {this.state.desktop && <Composition />}
        </div>

        <div className={Styles.hero__text}>
          <h1 className={Styles.hero__heading}>
            اعطي شركتك الجنسيه البريطانية
          </h1>
          <div className={Styles.search}>
            <h2 className={`heading ${Styles.search__heading}`}>
              اختر عنواناً لطموحاتك و اسم لشركتك
            </h2>
            <SearchBox />
          </div>
        </div>
      </div>
    );
  }
}
