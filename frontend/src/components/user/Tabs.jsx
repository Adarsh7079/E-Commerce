import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(children[0].props.label);

  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div className="md:w-[400px]  border-2 rounded-md border-gray-300  mx-auto  w-full">
      <div className="flex  text-xl flex-wrap border-b-2 border-gray-300">
        {children.map(child => (
          <button
            key={child.props.label}
            className={`${
              activeTab === child.props.label ? 'bg-gray-200' : ''
            } flex-1 text-gray-500 font-medium py-2 md:py-3 text-xl w-full md:w-auto text-center`}
            onClick={e => handleClick(e, child.props.label)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {children.map(child => {
          if (child.props.label === activeTab) {
            return <div key={child.props.label}>{child.props.children}</div>;
          }
          return null;
        })}
      </div>
    </div>
  );
};

const Tab = ({ label, children }) => {
  return (
    <div label={label}>
      {children}
    </div>
  );
};

export { Tabs, Tab };
