import React from "react";

import Styles from "./Form.module.scss";
import Item from "@/components/UI/Item";
import Btn from "@/components/UI/Btn";

// const InitialFormState = {
//   isTouched: false,
//   isLoading: false,
//   isValid: false,
//   formState: { name: "Form Head", icon: "FaHeading" },
//   inputFields: {},
// };

export type FormProps = {};
export type FormState = {
  isTouched: boolean;
  isLoading: boolean;
  isValid: boolean;
  formState: { name: string; icon: string };
  inputFields: {
    [ind: string]: { content: string; state: boolean };
  };
};

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
};
export default class Form<P, S> extends React.Component<FormProps, FormState> {
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
  };

  formStatus() {
    const { name, icon } = this.state.formState;
    return (
      <div className={Styles.form__status}>
        <Item name={name} icon={icon} />
      </div>
    );
  }

  inputs() {
    return <div></div>;
  }
  _formInputs() {
    return <div className={Styles.form__inputs}>{this.inputs()}</div>;
  }

  _submitBtn() {
    const { submitBtn } = this.formConfig.formBtns;
    if (!submitBtn) return;
    return (
      <Btn
        {...(this.state.isValid && { disabled: true })}
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
      <form className={Styles.form}>
        {this.formStatus()}
        {this._formInputs()}
        {this.formControls()}
      </form>
    );
  }
}
