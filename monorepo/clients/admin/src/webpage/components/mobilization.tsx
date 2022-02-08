import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import * as t from "../action-types";
import fetchBlocksAndWidgets from "../async-actions/fetch-blocks-and-widgets";
import { useAppState } from "../Application";
import Selectors from "../selectors";
import { Mobilization } from "./edit";

const MobilizationFC: React.FC = () => {
  const { state, dispatch } = useAppState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch({ type: t.SELECT_MOBILIZATION, payload: Number.parseInt(id, 10) });
      fetchBlocksAndWidgets(state, dispatch)(Number.parseInt(id, 10));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, dispatch]);

  const mobilizations = Selectors(state).getMobilizations();
  const mobilization = Selectors(state).getMobilization();

  if (!Selectors(state).mobilizationsIsLoaded()) {
    return <p>Loading....</p>;
  }
  return mobilization ? (
    <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
      <Mobilization editable />
    </div>
  ) : (
    <ul>
      {mobilizations.map((m) =>
        <li>
          <Link to={`/${m.id}`}>{m.name}</Link>
        </li>
      )}
    </ul>
  );
}

export default MobilizationFC;