import React, { FormEvent, MutableRefObject } from "react";

import Styles from "./Form.module.scss";
import Item from "@/components/UI/Item";
import Btn from "@/components/UI/Btn";
// Warning levels

export class FormState {
  isTouched: boolean = false;
  isValid: boolean = false;
  isLoading: boolean = false;
  formState: { name: string; icon: string; state: "success" | "fail" | "" } = {
    name: "",
    icon: "",
    state: "",
  };
  inputFields: {
    fieldName: string;
    content: string;
    state: boolean;
    note: string;
  }[] = [];

  constructor(state?: Readonly<FormState> | FormState | object) {
    if (state) Object.assign(this, state);
  }

  _validateForm() {
    this.isValid = this.inputFields.every((e) => e.state);
  }

  chnageField(
    fieldName: string,
    value: string,
    validator?: (value: string) => [boolean, string]
  ) {
    // Search field match field name;
    const indexOfField = this.inputFields.findIndex(
      (field) => field.fieldName === fieldName
    );
    // If there is no field match this name exit!
    if (indexOfField < 0) return;
    // Incase this fist change then form is already touched
    this.isTouched = true;
    // Set input value
    this.inputFields[indexOfField].content = value;
    // If validator function exisit set input State and note
    if (validator) {
      const [state, note] = validator(value);
      this.inputFields[indexOfField].state = state;
      this.inputFields[indexOfField].note = note;
    }
    this._validateForm();
  }
}

export type FormProps = {};

export type FormConfig = {
  formBtns: {
    submitBtn?: {
      name: string;
      icon: string;
    };
    secondaryBtn?: {
      name: string;
      icon: string;
    };
  };
  initialState: {
    name: string;
    icon: string;
    state: "success" | "fail" | "";
  };
};

export default class Form extends React.Component<FormProps, FormState> {
  // Form Config
  formConfig: FormConfig = {
    formBtns: {
      submitBtn: {
        name: "submit",
        icon: "FaCheck",
      },
      secondaryBtn: {
        name: "second",
        icon: "FaBars",
      },
    },
    initialState: {
      name: "",
      icon: "",
      state: "",
    },
  };

  _formSubmit(e: FormEvent) {
    e.preventDefault();
    this.setState({ isLoading: true });
    this.submit().finally(() => {
      this.setState({ isLoading: false });
    });
  }

  _formFocused() {
    this.setState({ isTouched: true });
  }

  async submit() {}

  inputReducer(
    fieldName: string,
    content: string,
    validator?: (value: string) => [boolean, string]
  ) {
    this.setState((curState) => {
      const newState = new FormState(curState);
      newState.chnageField(fieldName, content, validator);
      return newState;
    });
  }

  formStatus() {
    const { name, icon, state } = this.state.formState;

    return (
      <div
        className={`${Styles.form__status} ${Styles["form__status--" + state]}`}
      >
        {(this.state.isLoading && <div className="spinner" />) || (
          <Item name={name} icon={icon} />
        )}
      </div>
    );
  }

  inputs() {
    return <div></div>;
  }
  _formInputs() {
    return <div className={Styles.form__inputs}>{this.inputs()}</div>;
  }

  _formChange() {
    const { name, icon, state } = this.formConfig.initialState;
    this.setState({ formState: { name, icon, state } });
  }

  _submitBtn() {
    const { submitBtn } = this.formConfig.formBtns;
    if (!submitBtn) return;
    return (
      <Btn
        {...(!this.state.isValid && { disabled: true })}
        type="submit"
        color="primary"
      >
        <Item name={submitBtn.name} icon={submitBtn.icon} />
      </Btn>
    );
  }

  _secondaryBtn() {
    const { secondaryBtn } = this.formConfig.formBtns;
    if (!secondaryBtn) return;

    return (
      <Btn color="secondary">
        <Item name={secondaryBtn.name} icon={secondaryBtn.icon} />
      </Btn>
    );
  }

  formControls() {
    return (
      <div className={Styles.form__controlls}>
        {this._submitBtn()}
        {this._secondaryBtn()}
      </div>
    );
  }

  formResolves() {
    return <div className={Styles.form__resolves}></div>;
  }

  render() {
    return (
      <form
        className={Styles.form}
        onSubmit={this._formSubmit.bind(this)}
        onFocus={this._formFocused.bind(this)}
        onChange={this._formChange.bind(this)}
      >
        {this.formStatus()}
        {this._formInputs()}
        {this.formControls()}
      </form>
    );
  }
}
