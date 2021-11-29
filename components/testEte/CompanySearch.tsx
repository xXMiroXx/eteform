import TextInput from "./Form/inputs/TextInput";
import { ChangeEvent, useState } from "react";

import Styles from "./Search.module.scss";

type CompanySearchProps = {
  content: string;
  handler: (inputVal: string, state: boolean) => void;
};
export default function CompanySearch({
  content,
  handler,
}: CompanySearchProps) {
  // Function start
  const [state, setState] = useState("");
  const [note, setNote] = useState(" ");

  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const [validateState, validateNote] = validator(e.target.value);
    setState(validateState);
    setNote(validateNote);
    handler(e.target.value, validateState !== "danger");
  };

  const validator = (input: string) => {
    if (!input) return ["warning", "ادخل اسم الشركه "];
    if (input.match(/[^a-zA-Z\s&.]/))
      return ["danger", "اسم الشركه يجب ان يكون بالانجليزيه"];
    return ["success", " "];
  };

  return (
    <>
      <TextInput
        className={Styles.search__input}
        label="FaSearch"
        state={state}
        note={note}
        nameId="search-company"
        value={content}
        placeHolder="Company Name"
        changeHandler={changeHandler}
      />
    </>
  );
}
