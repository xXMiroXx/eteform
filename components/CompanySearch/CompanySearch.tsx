import React, { ChangeEvent } from "react";
import Form, { FormProps, FormState } from "../Form/Form";
import TextInput from "../Form/inputs/TextInput";
import Item from "../UI/Item/Item";
import Styles from "./CompanySearch.module.scss";
import validator from "../../helper/search-validator";
export default class SearchForm extends Form {
  constructor(props: FormProps) {
    super(props);
    this.state = new FormState({
      formState: { name: "ابحث عن شركتك", icon: "FaSearch", state: "" },
      inputFields: [
        {
          fieldName: "search",
          content: "",
          state: false,
          note: "",
        },
      ],
    });
    this.formConfig = {
      formBtns: {
        submitBtn: { name: "ابحث", icon: "FaSearch" },
      },
      initialState: {
        name: "ابحث عن شركتك",
        icon: "FaSearch",
        state: "",
      },
    };
  }

  async submit() {
    const input = this.state.inputFields[0].content;
    if (!this.state.isValid) return;
    try {
      const res = await fetch("api/search/company/" + input);
      const data = await res.json();
      if (data.available) {
        this.setState({
          formState: {
            name: "الأسم متاح",
            icon: "FaRegCheckCircle",
            state: "success",
          },
          isResloved: true,
        });
      } else {
        this.setState({
          formState: {
            name: "الأسم مسجل بالفعل",
            icon: "FaBan",
            state: "fail",
          },
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  resolve() {
    return (
      <div className={Styles.search__resolve}>
        <p> لتسجيل شركتك اتصل علي الارقام التاليه:</p>
        <a href=" https://wa.me/+19255674446">
          <Item icon="FaWhatsapp" name="19255674446+" />
        </a>
        <a href="tel:+19255674446">
          <Item icon="FaPhone" name="19255674446+" />
        </a>
        <a href="mailto:info@eteform.com">
          <Item icon="FaEnvelope" name="info@eteform.com" />
        </a>
      </div>
    );
  }

  searchInput() {
    const handler = (e: ChangeEvent<HTMLInputElement>) =>
      this.inputReducer("search", e.target.value, validator);

    const { content, state, note } = this.state.inputFields[0];

    return (
      <TextInput
        value={content}
        state={this.state.isTouched ? (state ? "success" : "danger") : ""}
        changeHandler={handler}
        label="FaSearch"
        nameId="company-search"
        note={note}
      />
    );
  }

  inputs() {
    return <div className={Styles.search__input}>{this.searchInput()}</div>;
  }
}
