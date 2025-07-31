import React from 'react';

const HeaderBox = ({
  title,
  subtext,
  user,
  type = 'title',
}: HeaderBoxProps) => {
  return (
    <div className="header-box">
      <h1 className="header-box-title text-2xl font-bold">
        {title}
        {type == 'greeting' && (
          <span className="text-sky-400">&nbsp;{user}</span>
        )}
      </h1>
      <p className="header-box-subtext text-base">{subtext}</p>
    </div>
  );
};

export default HeaderBox;
