import BtnP from "@/components/buttons/BtnP";
import { FaUser } from "react-icons/fa";

import Btn from "../UI/Btn/Btn";
import Item from "../UI/Item/Item";

import Collapse from "../UI/Collapse/Collapse";
import Form, { FormProps, FormState } from "../Form/Form";
import TextInput from "../Form/inputs/TextInput";
import { ChangeEvent } from "react";

class LoginCollapse extends Collapse {
  collapseHead() {
    return (
      <Btn handler={this.onClick.bind(this)}>
        <Item name="تسجيل الدخول" icon="FaUser" />
      </Btn>
    );
  }
}

class LoginForm extends Form {
  constructor(props: FormProps) {
    super(props);
    this.state = new FormState({
      formState: { name: "تسجيل دخول", icon: "FaUser", state: "" },
      inputFields: [
        {
          fieldName: "email",
          content: "",
          note: "",
          state: "",
        },
        {
          fieldName: "password",
          content: "",
          note: "",
          state: "",
        },
      ],
    });
    this.formConfig = {
      formBtns: {
        submitBtn: { name: "تسجيل دخول", icon: "FaUser" },
      },
      initialState: {
        name: "تسجيل دخول",
        icon: "FaUser",
        state: "",
      },
    };
  }
  emailInput() {
    const validator: (input: string) => [boolean, string] = (input: string) => {
      const reg = new RegExp(/\w+@\w+\.\w/);
      if (!reg.test(input)) return [false, "صغيه الايميل غير مكتمله"];
      else return [true, "صحيح"];
    };
    const handler = (e: ChangeEvent<HTMLInputElement>) =>
      this.inputReducer("email", e.target.value, validator);
    const { content, note, state } = this.state.inputFields[0];
    return (
      <TextInput
        type="email"
        label="FaEnvelope"
        nameId="email"
        state={state ? "success" : "warning"}
        note={note}
        value={content}
        placeHolder="email@mail.com"
        changeHandler={handler}
      />
    );
  }
  passwordInput() {
    const validator: (input: string) => [boolean, string] = (input) => {
      if (input.length < 8) return [false, "كلمه السر  قصيره جداً"];
      else return [true, "صحيح"];
    };
    const handler = (e: ChangeEvent<HTMLInputElement>) =>
      this.inputReducer("password", e.target.value, validator);
    const { content, note, state } = this.state.inputFields[1];
    return (
      <TextInput
        type="password"
        label="FaKey"
        nameId="password"
        note={note}
        value={content}
        state={state ? "success" : "warning"}
        placeHolder="كلمه السر"
        changeHandler={handler}
      />
    );
  }

  inputs() {
    return (
      <>
        {this.emailInput()}
        {this.passwordInput()}
      </>
    );
  }
}

export default function LoginBox() {
  return (
    <LoginCollapse float={true}>
      <LoginForm />
    </LoginCollapse>
  );
}
