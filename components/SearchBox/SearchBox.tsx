import React from "react";
import Overlay from "../Overlay/Overlay";
import Btn from "../UI/Btn";
import Item from "../UI/Item";

type State = {
  searchRes: boolean;
  result: boolean;
  loading: boolean;
  error: boolean;
  active: boolean;
  input: string;
  signup: boolean;
};

import Styles from "./SearchBox.module.scss";
export default class SearchBox extends React.Component<{}, State> {
  timer: null | NodeJS.Timeout = null;

  state: State = {
    active: false,
    input: "",
    loading: false,
    searchRes: false,
    result: false,
    error: false,
    signup: false,
  };

  async searching() {
    const { input } = this.state;
    if (!input) return;
    this.setState({ loading: true });
    try {
      const res = await fetch("https://api.eteform.co.uk/" + input);
      const data = await res.json();
      this.setState({ searchRes: true, result: data.available });
    } catch (err: any) {
      console.log(err.message);
    }
    this.setState({ loading: false });
  }

  async inputChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      input: e.target.value,
      searchRes: false,
      error: false,
      result: false,
      signup: false,
    });
  }

  inputFocusHandler() {
    this.setState({ active: true });
  }

  inputBlurHandler() {
    const { input, result } = this.state;
    if (input || result) return;
    this.setState({ active: false });
  }

  ResultView() {
    const { loading, searchRes, result, error } = this.state;
    if (loading)
      return <div className={`spinner ${Styles.search__spinner}`}></div>;
    if (searchRes) {
      if (error)
        return (
          <div
            className={`${Styles.search__result} ${Styles["search__result--error"]}`}
          >
            <Item icon="FaTimesCircle" name="حدث خطأ" />
          </div>
        );
      if (result)
        return (
          <div
            className={`${Styles.search__result} ${Styles["search__result--available"]}`}
          >
            <Item icon="FaRegCheckCircle" name="متاح" />
          </div>
        );
      else
        return (
          <div
            className={`${Styles.search__result} ${Styles["search__result--not-available"]}`}
          >
            <Item icon="FaExclamationTriangle" name="غير متاح" />
          </div>
        );
    }
  }

  render() {
    const { active, signup, result } = this.state;
    return (
      <div
        className={`${Styles.search} ${
          (active && Styles["search--active"]) || ""
        } ${signup && Styles["search--signed"]}`}
      >
        <div className={`${Styles.search__head} ${Styles.search__card}`}>
          <span className={Styles["search__title"]}>ابحث عن اسم لشركتك</span>
          {this.ResultView()}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.searching();
          }}
        >
          <div className={Styles["search__input-field"]}>
            <input
              onChange={this.inputChangeHandler.bind(this)}
              onFocus={this.inputFocusHandler.bind(this)}
              onBlur={this.inputBlurHandler.bind(this)}
              type="text"
              className={Styles["search__input"]}
              placeholder="Company Name"
            />
            <Item className={Styles.input__icon} icon={"FaSearch"} />
          </div>
          <div className={`${Styles.search__foot} ${Styles.search__card}`}>
            <Btn
              type="submit"
              handler={this.searching.bind(this)}
              color="secondary"
              className={Styles.search__btn}
            >
              <Item icon="FaSearch" name="ابحث" />
            </Btn>
            {result && (
              <Btn
                handler={() => {
                  this.setState({
                    signup: true,
                  });
                }}
                className={Styles.search__btn}
                color="info"
              >
                <Item name="تسجيل الشركة" icon="FaBuilding" />
              </Btn>
            )}
          </div>
        </form>

        {this.state.signup && (
          <div className={Styles.search__contact}>
            <p> لتسجيل شركتك اتصل علي الارقام التاليه:</p>
            <a href=" https://wa.me/+21000123300">
              <Item icon="FaWhatsapp" name="0019255674446" />
            </a>
            <a href="tel:+21000123300">
              <Item icon="FaPhone" name="0019255674446" />
            </a>
            <a href="mailto:info@eteform.com">
              <Item icon="FaEnvelope" name="info@eteform.com" />
            </a>
          </div>
        )}
      </div>
    );
  }
}
