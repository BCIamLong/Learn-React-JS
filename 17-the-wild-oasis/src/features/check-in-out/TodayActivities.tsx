import styled from "styled-components";
import { useTodayActivities } from "./useTodayActivities";
import Row from "~/components/Row";
import TodayActivity from "./TodayActivity";
import Spinner from "~/components/Spinner";
import Empty from "~/components/Empty";

const StyledTodayActivities = styled.div`
  grid-column: 1/3;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-100);
  padding: 2rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function TodayActivities() {
  const { activities, isLoading } = useTodayActivities();

  return (
    <StyledTodayActivities>
      <Row>
        <h2>Today</h2>
      </Row>
      {isLoading ? (
        <Spinner />
      ) : activities?.length ? (
        <Row>
          {activities?.map((activity) => (
            <TodayActivity activity={activity} key={activity.id} />
          ))}
        </Row>
      ) : (
        <Row>
          <Empty resourceName="activities" />
        </Row>
      )}
    </StyledTodayActivities>
  );
}
