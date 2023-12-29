type OrderProps = {
  closeHour: number;
  openHour: number;
};

export default function Order({ closeHour, openHour }: OrderProps) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 to {closeHour}:00. Come visit us or order
        online.
      </p>
      <button className="btn">Order</button>
    </div>
  );
}
