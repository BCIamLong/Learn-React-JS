import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import styled from "styled-components";
import Row from "~/components/Row";
import { useDarkMode } from "~/context/DarkModeContext";
import { Booking } from "~/types/booking.type";

const StyledDurationsChart = styled.div`
  grid-column: 3/-1;
  padding: 2rem;
  background-color: var(--color-grey-0);
`;

const startDataLight = [
  {
    duration: "1 night",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 night",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 nights",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 nights",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 nights",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 nights",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 nights",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 nights",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ nights",
    value: 0,
    color: "#7e22ce",
  },
];

interface StartData {
  duration: string;
  value: number;
  color: string;
}

const prepareData = function (startData: StartData[], stays: Booking[]) {
  const filterStartData = startData.map((dt) => {
    dt.value = 0;
    return dt;
  });
  const data = stays.reduce((dt, stay) => {
    if (stay.numNights === 1) dt[0].value++;
    if (stay.numNights === 2) dt[1].value++;
    if (stay.numNights === 3) dt[2].value++;
    if (stay.numNights >= 4 && stay.numNights <= 5) dt[3].value++;
    if (stay.numNights >= 6 && stay.numNights <= 7) dt[4].value++;
    if (stay.numNights >= 8 && stay.numNights <= 14) dt[5].value++;
    if (stay.numNights >= 15 && stay.numNights <= 21) dt[6].value++;
    if (stay.numNights > 21) dt[7].value++;

    return dt;
  }, filterStartData);
  //   console.log(data);

  const finalData = data.filter((item) => item.value !== 0);

  return finalData;
};

export default function DurationsChart({ confirmedStays }: { confirmedStays: Booking[] }) {
  const { isDarkMode } = useDarkMode();

  const startData = isDarkMode ? startDataDark : startDataLight;
  const data = prepareData(startData, confirmedStays);
  console.log(startData);

  return (
    <StyledDurationsChart>
      <Row>
        <h2>Stay duration summary</h2>
      </Row>
      <Row>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="duration"
              innerRadius={85}
              outerRadius={110}
              cx="46%"
              cy="50%"
              paddingAngle={3}
            >
              {data.map((el, ind) => (
                <Cell key={ind} fill={el.color} stroke={el.color} />
              ))}
            </Pie>
            <Legend
              align="right"
              verticalAlign={"middle"}
              width={140}
              iconSize={15}
              iconType="circle"
              layout="vertical"
            />
          </PieChart>
        </ResponsiveContainer>
      </Row>
    </StyledDurationsChart>
  );
}
