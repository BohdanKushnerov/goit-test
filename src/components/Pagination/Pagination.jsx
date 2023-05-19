import PropTypes from "prop-types";
import { Pagination, Stack } from "@mui/material";

const Paginate = ({ currentPage, setCurrentPage, count }) => {
  const changePage = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        page={currentPage}
        onChange={changePage}
      />
    </Stack>
  );
};

Paginate.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Paginate;
