import React from 'react';
import { Transition, Trail, animated } from 'react-spring/renderprops';

const Slug = props => {
  const {
    children,
    from = { opacity: 0, transform: 'translate3d(0,40px,0)' },
    to = { opacity: 1, transform: 'translate3d(0,0px,0)' },
    ...rest
  } = props;

  const result = React.Children.map(children, child => styles => {
    const Component = animated[child.type] || animated(child.type);
    const props = {
      ...child.props,
      style: {
        willChange: 'opacity, transform',
        ...child.props.style,
        ...styles,
      },
    };
    return <Component {...props} />;
  });

  return (
    <Trail
      native
      {...rest}
      items={result}
      keys={result.map((_, i) => i)}
      from={from}
      to={to}
      children={child => child}
    />
  );
};

const Fade = props => {
  const {
    children,
    show,
    from = { opacity: 0 },
    enter = { opacity: 1 },
    leave = { opacity: 0 },
    ...rest
  } = props;

  const { type } = children;
  const Component = animated[type] || animated(type);

  const result = styles => {
    const newProps = {
      ...props,
      style: {
        willChange: 'opacity, transform',
        ...props.style,
        ...styles,
      },
    };
    return <Component {...newProps} />;
  };

  return (
    <Transition
      native
      items={show}
      {...rest}
      from={from}
      enter={enter}
      leave={leave}
      children={show => show && result}
    />
  );
};

export { Slug, Fade };
