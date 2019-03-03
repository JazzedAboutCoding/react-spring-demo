import React from 'react';
import { useSpring, animated } from 'react-spring';

const Demo = () => {
  const header = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(-20vh)',
      background: 'linear-gradient(to bottom, #0056fe, #bd10e0) 50%',
    },
    to: [
      {
        opacity: 1,
        transform: 'translateY(0)',
        background: 'linear-gradient(to bottom, #0056fe, #bd10e0) 50%',
      },
      { background: 'linear-gradient(to bottom, #000, #0056fe) 50%' },
    ],
  });
  const title = useSpring({
    from: { opacity: 0.1, transform: 'translateY(3vh)', color: '#000' },
    to: { opacity: 1, transform: 'translateY(0)', color: '#fff' },
    delay: 565,
  });

  return (
    <React.Fragment>
      <animated.header style={header}>
        <animated.h1 style={title}>React Spring Demo</animated.h1>
      </animated.header>
    </React.Fragment>
  );
};

export default Demo;
