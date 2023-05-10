import { useSelector, useDispatch } from "react-redux";
import { changeSortStatus } from "../../actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faPersonDigging,
  faSpinner,
  faList,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

const StatusIndex = () => {
  const dispatch = useDispatch();
  const sortStatus = useSelector((state) => state.sortStatus);

  const handleChangeSortStatus = (status) => {
    dispatch(changeSortStatus(status));
  };

  return (
    <div className="sort-index">
      <div className="dropdown-wrapper">
        <select
          name="status"
          id="dropdown-index"
          value={sortStatus}
          onChange={(event) => handleChangeSortStatus(event.target.value)}
        >
          <option value="All">All</option>
          <option value="New">New</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="button-wrapper">
        <button
          className={`index ${sortStatus === "All" ? "active-index" : ""}`}
          onClick={() => handleChangeSortStatus("All")}
        >
          <FontAwesomeIcon className="index-icon" icon={faList} />
          All
        </button>
        <span className="index-border">|</span>
        <button
          className={`index ${sortStatus === "New" ? "active-index" : ""}`}
          onClick={() => handleChangeSortStatus("New")}
        >
          <FontAwesomeIcon className="index-icon" icon={faBell} />
          New
        </button>
        <span className="index-border">|</span>
        <button
          className={`index ${
            sortStatus === "In Progress" ? "active-index" : ""
          }`}
          onClick={() => handleChangeSortStatus("In Progress")}
        >
          <FontAwesomeIcon className="index-icon" icon={faPersonDigging} />
          In Progress
        </button>
        <span className="index-border">|</span>
        <button
          className={`index ${
            sortStatus === "Completed" ? "active-index" : ""
          }`}
          onClick={() => handleChangeSortStatus("Completed")}
        >
          <FontAwesomeIcon className="index-icon" icon={faCircleCheck} />
          Completed
        </button>
        <span className="index-border">|</span>
        <button
          className={`index ${sortStatus === "Pending" ? "active-index" : ""}`}
          onClick={() => handleChangeSortStatus("Pending")}
        >
          <FontAwesomeIcon className="index-icon" icon={faSpinner} />
          Pending
        </button>
      </div>
    </div>
  );
};

export default StatusIndex;
