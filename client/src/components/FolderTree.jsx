import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import "./FolderTree.css";

const formatBytes = (value) => {
  if (!value) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(value) / Math.log(1024));
  return `${(value / 1024 ** i).toFixed(i === 0 ? 0 : 2)} ${units[i]}`;
};

const TreeNode = ({ node, depth, selectedFolderId, onSelect }) => {
  const isSelected = selectedFolderId === node._id;
  return (
    <div>
      <button
        onClick={() => onSelect(node)}
        className={`tree-item ${
          isSelected
            ? "tree-item-active"
            : "tree-item-idle"
        }`}
        style={{ paddingLeft: `${depth * 18 + 12}px` }}
      >
        <span className="tree-item-main">
          {node.children?.length ? <FolderOpen size={16} /> : <Folder size={16} />}
          <span>{node.name}</span>
        </span>
        <span className="tree-size">{formatBytes(node.totalSize)}</span>
      </button>
      {node.children?.length > 0 && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child._id}
              node={child}
              depth={depth + 1}
              selectedFolderId={selectedFolderId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderTree = ({ folders, selectedFolderId, onSelect }) => {
  if (!folders.length) {
    return (
      <p className="tree-empty">
        No folders yet. Create your first root folder.
      </p>
    );
  }

  return (
    <div className="tree-wrapper">
      <div className="tree-heading">
        <ChevronRight size={12} /> Folder Tree
      </div>
      {folders.map((folder) => (
        <TreeNode
          key={folder._id}
          node={folder}
          depth={0}
          selectedFolderId={selectedFolderId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default FolderTree;
