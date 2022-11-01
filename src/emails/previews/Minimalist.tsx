import { pick, omit } from "remeda";
import { exampleProps } from "../util";
import Minimalist from "../Minimalist";

export function custom_preview(customProps) {
  return <Minimalist {...pick(exampleProps, ["content"])} {...customProps} />;
}
