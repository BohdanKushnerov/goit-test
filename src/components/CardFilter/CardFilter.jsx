import PropTypes from "prop-types";
import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";

const CardFilter = ({ filter, handleFilterChange }) => {
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="controlled-native">
          Filter
        </InputLabel>
        <NativeSelect
          inputProps={{
            name: "Filter",
            id: "controlled-native",
          }}
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="show_all">Show All</option>
          <option value="follow">Follow</option>
          <option value="followings">Followings</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

CardFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired,
};

export default CardFilter;
