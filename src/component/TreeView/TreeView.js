import React from "react";
import { useTreeState } from "./TreeContext";
import './styles.css';
import ClickIcon from './icons8-folder-48.png';

const TreeNode = ({ node, rootNodeId }) => {
  const { dispatch } = useTreeState();
  const nodeNameClassName = node.id === rootNodeId ? 'node-name-first' : 'node-name';
  const treeNodeClassName = node.children ? 'tree-node' : 'tree-node-no-children';
  const label = node.id === rootNodeId ? 'admin' : 'currency';

  return (
    <div
      className={treeNodeClassName}
      style={{ color: node.isHighlight ? "red" : "initial" }}
    >
      <div className="node-title">
        {node.children && (
            <img
            src={ClickIcon}
            alt=""
            className="toggle-icon"
            onClick={() =>
              dispatch({
                type: "TOGGLE_NODE",
                id: node.id,
                isExpanded: !node.isExpanded
              })
            }
            />
        )}
        <span className={nodeNameClassName}>{label}</span>
        <span className="node-text">{node.name}</span>
        <div className="node-numbering">
          <div className="node-number">10</div>
          <div className="node-number">0</div>
        </div>
      </div>
      {node.isExpanded && <TreeView data={node?.children} />}
    </div>
  );
};

const TreeView = ({ data, rootNodeId }) => {
  return (
    <div className="tree-view">
      {data?.map((node) => (
        <TreeNode key={node.id} node={node} rootNodeId={rootNodeId}/>
      ))}
    </div>
  );
};

export default TreeView;
