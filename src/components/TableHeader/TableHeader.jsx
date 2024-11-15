import sortIcon from "../../assets/Icons/sort-24px.svg";
import PropTypes from "prop-types";

function TableHeader({ tableName, header }) {
  return (
    <h3 className={`${tableName}__header`}>
      {header}
      {header !== "ACTIONS" && (
        <img src={sortIcon} alt="sort" className={`${tableName}__sort-icon`} />
      )}
    </h3>
  );
}

export default TableHeader;

TableHeader.propTypes = {
  tableName: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};
