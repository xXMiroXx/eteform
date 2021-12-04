const searchValidator: (input: string) => [boolean, string] = (
  input: string
) => {
  input = input.trim();
  if (!input) return [false, "ادخل اسم الشركه"];
  if (input.match(/[^a-zA-Z\s&.,]/))
    return [false, "اسم الشركه يجب ان يكون بالانجليزيه"];
  return [true, ""];
};
export default searchValidator;
