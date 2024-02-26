import styled from "styled-components";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useDarkMode } from "~/context/DarkModeContext";
import Row from "~/components/Row";
import { Booking } from "~/types/booking.type";
import { format, subDays } from "date-fns";

const StyledSalesChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1/-1;
  background-color: var(--color-grey-0);
  padding: 2.4rem;
`;

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

export default function SalesChart({ bookings, numDays }: { bookings: Booking[]; numDays: number }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  // * Way1
  const tempData = Array.from({ length: numDays }, (_, index: number) => {
    return {
      label: subDays(new Date(), index).toLocaleDateString("en", { month: "short", day: "2-digit" }),
      totalSales: 0,
      extrasSales: 0,
    };
  });

  const data = bookings
    .reduce((data, booking) => {
      data?.forEach((d) => {
        // * we can use isSameDay() of date fns to check this the same day or not
        if (d.label === new Date(booking.createdAt).toLocaleDateString("en", { month: "short", day: "2-digit" })) {
          d.totalSales = d.totalSales + booking.totalPrice;
          d.extrasSales = d.extrasSales + booking.extrasPrice;
        }
      });
      return data;
    }, tempData)
    .reverse();

  // * we can use eachDayOfInterval function to create the array of days from the start date and end date

  // *Way2
  //   const tempData1 = eachDayOfInterval({
  //     start: subDays(new Date(), numDays - 1),
  //     end: new Date(),
  //   });
  //   const data1 = tempData1.map((day) => ({
  //     label: format(day, "MMM dd"),
  //     totalSales: bookings
  //       .filter((booking) => isSameDay(new Date(booking.createdAt), day))
  //       .reduce((sum, cur) => sum + cur.totalPrice, 0),
  //     extrasSales: bookings
  //       .filter((booking) => isSameDay(new Date(booking.createdAt), day))
  //       .reduce((sum, cur) => sum + cur.extrasPrice, 0),
  //   }));
  //   console.log(data1);

  return (
    <StyledSalesChart>
      <Row>
        <h3>
          {/* * so today + numDays - 1 => if 7 days => today + 6 = 7 right therefore we need use numDays - 1*/}
          <span>Sales from {format(subDays(new Date(), numDays - 1), "MMM dd yyyy")}</span>
          <span> &mdash; </span>
          <span>{format(new Date(), "MMM dd yyyy")}</span>
        </h3>
      </Row>
      <Row>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="4" />
            <Tooltip
              contentStyle={{
                backgroundColor: colors.background,
                textTransform: "capitalize",
              }}
            />
            <YAxis unit="$" />
            <XAxis
              dataKey="label"
              tick={{ fill: colors.text, fontSize: "1.6rem" }}
              tickLine={{ stroke: colors.text }}
            />
            <Area
              dataKey="totalSales"
              name="Total sales"
              strokeWidth={2}
              unit="$"
              type="monotone"
              stroke={colors.totalSales.stroke}
              fill={colors.totalSales.fill}
            />
            <Area
              dataKey="extrasSales"
              name="Extras sales"
              strokeWidth={2}
              unit="$"
              type="monotone"
              stroke={colors.extrasSales.stroke}
              fill={colors.extrasSales.fill}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Row>
    </StyledSalesChart>
  );
}
