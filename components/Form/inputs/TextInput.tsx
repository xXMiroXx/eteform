import Item from "@/components/UI/Item";
import Input from "./Input";
import Styles from "./inputs.module.scss";
type TextInputProps = {
  label: string;
  note: string;
  state?: string;
  className?: string;
};

export default class TextInput extends Input<TextInputProps, {}> {
  type = "text";
  label() {
    return (
      <label htmlFor={this.props.nameId}>
        <Item icon={this.props.label} />
      </label>
    );
  }

  inputNote() {
    return <p>{this.props.note}</p>;
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
        <div className={Styles["text-input__note"]}>{this.inputNote()}</div>
      </div>
    );
  }
}
