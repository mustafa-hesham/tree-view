import { useEffect, useState } from "react";
import { fetchData } from "../TreeView/data";
import TreeView from "../TreeView/TreeView";
import { TreeProvider, useTreeState } from "../TreeView/TreeContext";
import './TreeViewSearch.css';

function TreeViewForm() {
    const { state, dispatch } = useTreeState();
    const [searchQuery, setSearchQuery] = useState("");
    const [rootNodeId, setRootNodeId] = useState({});

    const onHandleSearch = (e) => {
      const query = e.target.value;
      setSearchQuery(query);

      // Perform search and update filtered state
      dispatch({ type: "SEARCH", query });
    };

    useEffect(() => {
      fetchData().then((data) => {
        dispatch({ type: "INIT_DATA", data });
        setRootNodeId(data[0].id);
      });
    }, [dispatch]);

    return (
      <div className="TreeViewForm">
        <div className="TreeViewForm-Inputs">
            <input
            className="TreeViewForm-Search"
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={onHandleSearch}
            />
            <button className="TreeViewForm-Button" onClick={() => dispatch({ type: "EXPAND_ALL" })}>
                Search
            </button>
            <button className="TreeViewForm-Button" onClick={() => dispatch({ type: "COLLAPSE_ALL" })}>
                Unfold
            </button>
          </div>
        <TreeView data={state} rootNodeId={rootNodeId}/>
      </div>
    );
  };

export default function TreeViewSearch() {
    return (
        <div className="TreeViewSearch">
            <TreeProvider>
                <TreeViewForm />
            </TreeProvider>
        </div>
    );
};
