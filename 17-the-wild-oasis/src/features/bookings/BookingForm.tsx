import { Form, FormRow, Input } from "~/components/form";

export default function BookingForm() {
  return (
    <Form>
      <FormRow label="Cabin" errorMsg="">
        <Input type="text" id="cabin" />
      </FormRow>
      <FormRow label="Guest" errorMsg="">
        <Input type="text" id="guest" />
      </FormRow>
      <FormRow label="Start date" errorMsg="">
        <Input type="text" id="startDate" />
      </FormRow>
      <FormRow label="End date" errorMsg="">
        <Input type="text" id="endDate" />
      </FormRow>
      <FormRow label="Number of Guests" errorMsg="">
        <Input type="text" id="numGuests" />
      </FormRow>
    </Form>
  );
}
