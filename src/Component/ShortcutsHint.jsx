import React from "react";
import "./ShortcutsHint.css";

const ShortcutItem = ({ keyName, label }) => {
  return (
    <div className="shortcut-item">
      <span className="key">{keyName}</span>
      <span className="label">{label}</span>
    </div>
  );
};

export default function ShortcutsHint({show}) {
  return (
    <div className={`shortcuts-container ${show?"show":""}`}>
      <div className="title">⚡ Shortcuts</div>

      <ShortcutItem keyName="F" label="Pen" />
      <ShortcutItem keyName="E" label="Eraser" />
      <ShortcutItem keyName="Ctrl + Z" label="Undo" />
    </div>
  );
}