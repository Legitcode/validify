import React, {
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
  MutableRefObject,
  useRef,
} from "react";
import { RuleFn } from "./rules";
import set from "lodash/set";

export type ValuesBlurred = { [key: string]: boolean };
export type RulesRef = { [key: string]: RuleFn[] };

export type Error = {
  name: string;
  message: string;
};

type Context = {
  rules: MutableRefObject<RulesRef>;
  values: any;
  errors: Error[];
  valuesBlurred: ValuesBlurred;
  hasBlurred: (name: string) => any;
  setErrors: Dispatch<SetStateAction<Error[]>>;
  updateValue: (name: string, value: string) => any;
  setValuesBlurred: Dispatch<SetStateAction<ValuesBlurred>>;
};

const FormContext = React.createContext<Context>({} as Context);

export type FormProps<Values> = {
  values: Values;
  children: ReactNode;
  onValues: Dispatch<SetStateAction<any>>;
};

function Form<Values>({ children, onValues, values }: FormProps<Values>) {
  let rules = useRef<RulesRef>({});
  let [errors, setErrors] = useState<Error[]>([]);
  let [valuesBlurred, setValuesBlurred] = useState<ValuesBlurred>({});

  return (
    <FormContext.Provider
      value={{
        rules,
        values,
        errors,
        setErrors,
        valuesBlurred,
        setValuesBlurred,
        hasBlurred: (name) => {
          if (valuesBlurred[name]) return;
          //Store list of values that have been touched, so we can run validation on them now
          setValuesBlurred({
            ...valuesBlurred,
            [name]: true,
          });
        },
        updateValue: (name, value) => {
          let newValues = { ...values };
          set(newValues, name, value);
          onValues(newValues);
        },
      }}
    >
      {children}
    </FormContext.Provider>
  );
}

const FormContextConsumer = FormContext.Consumer;

export { FormContext, Form, FormContextConsumer };
