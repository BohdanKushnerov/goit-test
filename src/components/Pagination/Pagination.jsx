import PropTypes from "prop-types";
import { Pagination, Stack } from "@mui/material";

const Paginate = ({ page, changePage, count }) => {
  return (
    <Stack spacing={2}>
      <Pagination
        count={count}
        color="primary"
        page={page}
        onChange={changePage}
      />
    </Stack>
  );
};

Paginate.propTypes = {
  page: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};

export default Paginate;
