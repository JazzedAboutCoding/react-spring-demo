import React, { useState } from 'react';
import { config } from 'react-spring/renderprops';
import { Icon } from 'antd';

import Grid from './Grid';
import { Slug, Fade } from './Primitives';

import { BOOK_DATA as data } from '../../constants';

import './styles.css';
import 'antd/dist/antd.css';

const Cell = props => {
  const {
    toggle,
    name,
    subtitle,
    description,
    css,
    img,
    author,
    active,
  } = props;

  return (
    <div
      className="cell"
      style={{
        backgroundImage: css,
        boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
        objectFit: 'contain',
        objectPosition: 'center',
        cursor: !active ? 'pointer' : 'auto',
      }}
      onClick={!active ? toggle : undefined}
    >
      <Fade show={active} delay={active ? 500 : 0}>
        <div className="details">
          <Slug delay={600}>
            <div className="close">
              <Icon
                type="close"
                style={{ cursor: 'pointer' }}
                onClick={toggle}
              />
            </div>
            <img
              src={img}
              alt={name}
              style={{
                // height: '50vh',
                marginBottom: '20px',
                width: '40vw',
                maxWidth: '357px',
              }}
            />
            <p
              className="description"
              style={{ background: 'rgba(243,245,246, 0.5)' }}
            >
              {description}
            </p>

            <h1>{name}</h1>
            <h2>{subtitle}</h2>
            <p>{author}</p>
          </Slug>
        </div>
      </Fade>

      <Fade
        show={!active}
        from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
        enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
        leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
        delay={active ? 0 : 400}
      >
        <div className="default">
          <div
            style={{
              width: '100px',
              zIndex: 1,
              border: '1px solid rgba(203,203,203, 0.3)',
              padding: '10px',
            }}
          >
            Listen Now{' '}
            <span role="img" aria-label="Headphones Emoji">
              🎧
            </span>
          </div>
        </div>
      </Fade>
    </div>
  );
};

const Books = () => {
  const [books, setBooks] = useState(data);

  return (
    <Grid
      className="grid"
      books={books}
      keys={b => b.name}
      heights={b => b.height}
      columns={4}
      margin={20}
      lockScroll={false}
      closeDelay={250}
      config={config.slow}
    >
      {(bookData, active, toggle) => (
        <Cell {...bookData} active={active} toggle={toggle} />
      )}
    </Grid>
  );
};

export default Books;
