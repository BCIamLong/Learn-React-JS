import styled from "styled-components";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";
import Button from "./Button";
import { useSearchParams } from "react-router-dom";

const StyledPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;

  & p {
    font-size: 1.4rem;
    /* font-weight: 500; */
  }

  & p strong {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
`;

const PAGE_LIMIT = 10;

export default function Pagination({ count }: { count: number }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = +searchParams.get("page")! || 1;

  const numPages = Math.ceil(count / PAGE_LIMIT);

  function handleNextPage() {
    const next = currentPage === numPages ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
  }

  function handlePreviousPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
  }

  if (count < 11) return null;

  return (
    <StyledPagination>
      <div>
        <p>
          Showing <strong>{(currentPage - 1) * PAGE_LIMIT + 1}</strong> to{" "}
          <strong>{currentPage * PAGE_LIMIT > count ? count : currentPage * PAGE_LIMIT}</strong>
          of <strong>{count}</strong> results
        </p>
      </div>
      <Buttons>
        <Button $variation="pagination" onClick={handlePreviousPage} disabled={currentPage === 1}>
          <span>
            <HiChevronLeft />
          </span>
          <span>Previous</span>
        </Button>
        <Button $variation="pagination" onClick={handleNextPage} disabled={currentPage === numPages}>
          <span>Next</span>
          <span>
            <HiChevronRight />
          </span>
        </Button>
      </Buttons>
    </StyledPagination>
  );
}
