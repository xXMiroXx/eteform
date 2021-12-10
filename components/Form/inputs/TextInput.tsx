import Item from "@/components/UI/Item/Item";
import { HTMLInputTypeAttribute } from "react";
import Input from "./Input";
import Styles from "./inputs.module.scss";
type TextInputProps = {
  label: string;
  note: string;
  state?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
};

export default class TextInput extends Input<TextInputProps, {}> {
  type: HTMLInputTypeAttribute = "text";
  label() {
    return (
      <label htmlFor={this.props.nameId}>
        <Item icon={this.props.label} />
      </label>
    );
  }

  render() {
    return (
      <div
        className={`${Styles["text-input"]} 
      ${Styles["text-input--" + this.props.state || ""]}
      ${this.props.className || ""}`}
      >
        <div className={Styles["text-input__field"]}>
          {this.label()}
          {this.input()}
        </div>
        <div className={Styles["text-input__note"]}>{this.props.note}</div>
      </div>
    );
  }
}
