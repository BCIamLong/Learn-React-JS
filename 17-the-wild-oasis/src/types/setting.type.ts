export default interface Setting {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxGuestsPersonal: number;
  breakfastPrice: number;
  createdAt: Date;
}
