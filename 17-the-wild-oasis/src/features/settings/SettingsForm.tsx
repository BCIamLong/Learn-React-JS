import { Form, FormRow, Input } from "~/components/form";
import useSettings from "./useSettings";
// import { useForm } from "react-hook-form";
import Spinner from "~/components/Spinner";

// interface Inputs {
//   minBookingLength: number;
//   maxBookingLength: number;
//   maxGuestsPersonal: number;
//   breakfastPrice: number;
// }

function SettingsForm() {
  const { isLoading, settings, error } = useSettings();
  if (error) console.log(error);

  const { minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice } = settings || {};
  // console.log(minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice);
  // const { register, formState } = useForm<Inputs>({
  //   defaultValues: settings?.minBookingLength
  //     ? { minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice }
  //     : {},
  // });
  // const { errors } = formState;

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          // {...register("minBookingLength", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          // {...register("maxBookingLength", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="maxGuestsPersonal"
          defaultValue={maxGuestsPersonal}
          // {...register("maxGuestsPersonal", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Breakfast price" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          // {...register("breakfastPrice", { required: "This field is required" })}
        />
      </FormRow>
    </Form>
  );
}

export default SettingsForm;
