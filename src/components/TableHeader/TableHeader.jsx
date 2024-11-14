import sortIcon from "../../assets/Icons/sort-24px.svg";
import PropTypes from "prop-types";
import "./TableHeader.scss";

function TableHeader({ headers }) {
  return (
    <div className="table-header__container">
      {headers.map((header) => (
        <h3 key={header} className="table-header__header">
          {header}
          {header !== "ACTIONS" && (
            <img
              src={sortIcon}
              alt="sort"
              className="table-header__sort-icon"
            />
          )}
        </h3>
      ))}
    </div>
  );
}

export default TableHeader;

TableHeader.propTypes = {
  headers: PropTypes.array.isRequired,
};
