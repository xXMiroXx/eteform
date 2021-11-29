import React, { ChangeEvent } from "react";
import CompanySearch from "./CompanySearch";
import Form, { FormProps, FormState } from "./Form/Form";
import Styles from "./Search.module.scss";

type SearchFormProps = {} & FormProps;
type SearchFormState = FormState & {
  inputFields: {
    searchField: {
      content: string;
      state: boolean;
    };
  };
};

const InitialFormState = {
  formState: { name: "ابحث عن شركتك", icon: "FaSearch" },
  inputFields: {
    searchField: {
      content: "",
      state: false,
    },
  },
  isLoading: false,
  isTouched: false,
  isValid: false,
};

export default class SearchForm extends Form<SearchFormProps, SearchFormState> {
  constructor(props: SearchFormProps) {
    super(props);
    this.state = InitialFormState;
    this.formConfig = {
      formBtns: {
        submitBtn: {
          name: "ابحث",
          icon: "FaSearch",
        },
      },
    };
  }

  searchInput() {
    const handler = (inputVal: string, state: boolean) => {
      this.setState({
        inputFields: { searchField: { content: inputVal, state } },
      });
    };
    const { content, state } = this.state.inputFields.searchField;
    return <CompanySearch content={content} handler={handler} />;
  }

  inputs() {
    return <div className={Styles.search__input}>{this.searchInput()}</div>;
  }
}
