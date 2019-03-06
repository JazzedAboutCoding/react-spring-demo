import React, { useState, useCallback } from 'react';
import { useTransition, animated } from 'react-spring';

import Books from './components/Books';

const PageContext = React.createContext({
  currPage: 0,
});

const HomePage = ({ style }) => (
  <animated.div
    className="hp-main"
    style={{
      ...style,
    }}
  >
    <animated.header
      className="hp-header"
      style={{
        ...style,
      }}
    >
      <animated.h1 className="hp-header-h1">Library</animated.h1>
      <animated.div>
        <img
          className="hp-logo"
          src="https://s3.amazonaws.com/audiblerange.com/assets/images/audible-small-logo.png"
          alt="Audible Logo"
        />
      </animated.div>
    </animated.header>
  </animated.div>
);

const LibraryPage = () => <Books />;

const pages = [HomePage, LibraryPage];

const Pages = () => {
  const [index, setIndex] = useState(0);
  // const onClick = useCallback(() => setIndex(state => (state + 1) % 2), []);
  const onClick = useCallback(() => setIndex(state => (state = 1)), []); // Replace w/Context

  /*
   * Page Transitions
   */
  const transitions = useTransition(index, page => page, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  });

  return (
    <PageContext.Provider value={{ currPage: index }}>
      <div className="transition-container" onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
          const Page = pages[item];

          return <Page key={key} style={props} />;
        })}
      </div>
    </PageContext.Provider>
  );
};

export default Pages;
