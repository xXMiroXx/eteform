import React, { ChangeEvent } from "react";
import Form, { FormProps, FormState } from "../Form/Form";
import TextInput from "../Form/inputs/TextInput";
import Styles from "./Search.module.scss";

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
      const res = await fetch("http://eteig.uk/" + input);
      const data = await res.json();
      if (data.available) {
        this.state.formState.name = "الأسم متاح";
        this.state.formState.icon = "FaRegCheckCircle";
        this.state.formState.state = "success";
      } else {
        this.state.formState.name = "الأسم مسجل بالفعل";
        this.state.formState.icon = "FaBan";
        this.state.formState.state = "fail";
      }
    } catch (e) {
      console.log(e);
    }
  }

  searchInput() {
    const validator: (input: string) => [boolean, string] = (input) => {
      input = input.trim();
      if (!input) return [false, "ادخل اسم الشركه"];
      if (input.match(/[^a-zA-Z\s&.]/))
        return [false, "اسم الشركه يجب ان يكون بالانجليزيه"];
      return [true, ""];
    };
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
