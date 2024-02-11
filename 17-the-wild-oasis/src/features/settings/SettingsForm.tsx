import { Form, FormRow, Input } from "~/components/form";
import useSettings from "./useSettings";
// import { useForm } from "react-hook-form";
import Spinner from "~/components/Spinner";
import useUpdateSetting from "./useUpdateSetting";
import { FocusEvent } from "react";

// interface Inputs {
//   minBookingLength: number;
//   maxBookingLength: number;
//   maxGuestsPersonal: number;
//   breakfastPrice: number;
// }

function SettingsForm() {
  const { isLoading, settings, error } = useSettings();
  if (error) console.log(error);
  const { isUpdating, updateSettingMutate } = useUpdateSetting();

  const { minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice } = settings || {};
  // console.log(minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice);
  // const { register, formState } = useForm<Inputs>({
  //   defaultValues: settings?.minBookingLength
  //     ? { minBookingLength, maxBookingLength, maxGuestsPersonal, breakfastPrice }
  //     : {},
  // });
  // const { errors } = formState;

  if (isLoading) return <Spinner />;

  function handleUpdateSetting(e: FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;

    if (!value) return;
    updateSettingMutate({ [field]: value });
  }

  return (
    <Form>
      <FormRow label="Minimum nights/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={minBookingLength}
          // {...register("minBookingLength", { required: "This field is required" })}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          // {...register("maxBookingLength", { required: "This field is required" })}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="maxGuestsPersonal"
          defaultValue={maxGuestsPersonal}
          // {...register("maxGuestsPersonal", { required: "This field is required" })}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "maxGuestsPersonal")}
        />
      </FormRow>
      <FormRow label="Breakfast price" errorMsg={error?.message || ""}>
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          // {...register("breakfastPrice", { required: "This field is required" })}
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting(e, "breakfastPrice")}
        />
      </FormRow>
    </Form>
  );
}

export default SettingsForm;
