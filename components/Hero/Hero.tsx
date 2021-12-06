import React from "react";
import Styles from "./Hero.module.scss";
import Composition from "./Composition";
import SearchForm from "../CompanySearch/CompanySearch";

export default class Hero extends React.Component<
  { photos: [] | { src: string; alt: string }[] },
  { desktop: boolean }
> {
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
          {this.state.desktop && <Composition images={this.props.photos} />}
        </div>

        <div className={Styles.hero__text}>
          <h1 className={Styles.hero__heading}>
            اعطي شركتك الجنسيه البريطانية
          </h1>
          <div className={Styles.search}>
            <h2 className={`heading ${Styles.search__heading}`}>
              اختر عنواناً لطموحاتك و اسم لشركتك
            </h2>
            <div className={Styles.search__box}>
              {/* <SearchBox /> */}
              <SearchForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
