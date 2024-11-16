import sortIcon from "../../assets/Icons/sort-24px.svg";
import PropTypes from "prop-types";
import "./TableHeader.scss";

function TableHeader({ headers, handleClick }) {
  return (
    //need header id to send with api request
    <div className="table-header__container">
      {headers.map((header) => (
        <h3 key={header.property} className="table-header__header">
          {header.text}
          {header.text !== "ACTIONS" && (
            <img
              src={sortIcon}
              alt="sort"
              className="table-header__sort-icon"
              onClick={() => handleClick(header.property)}
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
  handleClick: PropTypes.func.isRequired,
};
