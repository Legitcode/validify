## React Validify

single dependency, simplest way to validate and manage form state with hooks in React + React Native! With full test coverage and TS support.

## Contents

- [Install](#install)
- [Getting Started](#getting-started)
- [TypeScript Support](#typescript-support)
- [Contributors](#contributors)

## Install

```
npm install react-validify lodash
```

## Getting Started

This api has been carefully thought out over the past year. It's been in use on multiple React websites and React Native mobile applications. Using the library is simple. Include the `Form` component, and wrap your `input`'s and `submit` buttons.

```js
import Input from "./input";
import Submit from "./submit";
import { Form, rules } from "react-validify";

const { required, email } = rules;

const App = () => {
  let [values, setValues] = React.useState({
    email: "test",
    nested: { test: "this is nested" },
  });

  return (
    <Form values={values} onValues={setValues}>
      <Input name="email" rules={[required, email]} />
      <Input name="name" rules={[required]} />
      <Input name="date1" rules={[greaterThanDate2]} />
      <Input name="date2" />
      <Input name="nested.test" />
      <Submit />
    </Form>
  );
};
```

Add `useField` to your own inputs inside the Form wrapper. This allows you to use the library with any type of input field.
It just needs to support a `handleChange` `handleBlur` and `value` prop. This is the `Input` component you see in the first example. Don't forget to pass the field `name` to the hook.

```js
import React from "react";
import { useField, FieldProps } from "react-validify";

type Props = { placeholder: string } & FieldProps;

const Input = ({ name, rules, placeholder }: Props) => {
  let { handleChange, handleBlur, value, errors } = useField({ name, rules });

  return (
    <div>
      {errors ? <p>{errors[0]}</p> : null}
      <input
        name={name}
        value={value}
        onBlur={handleBlur}
        placeholder={placeholder}
        onChange={(event) => handleChange(event.target.value)}
      />
    </div>
  );
};
```

Add `useSubmit` to trigger submitting or validating:

```js
import React from "react";
import { useSubmit } from "react-validify";

const Submit = (props) => {
  let { canSubmit, handleSubmit } = useSubmit();

  return (
    <div
      onClick={() => handleSubmit((values) => console.log("submit!", values))}
      style={{ opacity: canSubmit ? 1 : 0.5 }}
    >
      Submit Form
    </div>
  );
};
export default Submit;
```

The callback passed to `handleSubmit` will only be triggered if validation is passing.

Create rules:

```js
const testRule: RuleFn = (value, values) =>
  value.length > values.date2.length ? "Date can't be longer" : null;
```

Rules get a `value` and `values` arguments. This means you can validate an input, or validate it against other form values.

Rules are guaranteed to run on a field after the first time the field is blurred, and then any time an error is present, they will run onChange.

## TypeScript Support

With TS enabled, you can create a type for your form values, like so:

```tsx
type Values = {
  email: string;
  date1?: string;
  name?: string;
};
```

Now when we use the form, it looks like this:

```tsx
let [values, setValues] = useState<Values>({
    email: 'test',
  });

  return (
    <Form
      values={values}
      onValues={setValues}
    >
      <Input name="email" rules={[required, email]}/>
    </Form>
  )
}
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->

| [<img src="https://avatars0.githubusercontent.com/u/449136?v=4" width="100px;"/><br /><sub>Zach Silveira</sub>](https://zach.codes)<br /> | [<img src="https://avatars1.githubusercontent.com/u/2430381?v=4" width="100px;"/><br /><sub>Ryan Castner</sub>](http://audiolion.github.io)<br /> |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
