import React, { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import Styles from "./inputs.module.scss";

export type InputProps = {
  nameId: string;
  value: string;
  changeHandler: ChangeEventHandler;
  placeHolder?: string;
  type?: HTMLInputTypeAttribute;
};
type State = {};
export default class Input<P, S> extends React.Component<
  P & InputProps,
  S & State
> {
  type: HTMLInputTypeAttribute = "text";

  input() {
    const { nameId, value, changeHandler } = this.props;
    return (
      <input
        className={Styles.input}
        type={this.props.type || this.type}
        id={nameId}
        name={nameId}
        onChange={changeHandler}
        value={value}
        {...(this.props.placeHolder && { placeholder: this.props.placeHolder })}
      />
    );
  }

  render() {
    return this.input();
  }
}
