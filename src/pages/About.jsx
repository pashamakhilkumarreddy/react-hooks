import React from 'react';

import { Helmet } from 'react-helmet';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>
      <div className="columns is-mobile is-centered is-vcentered is-multiline mt-6">
        <div className="column is-10">
          <h1 className="title has-text-centered">About</h1>
        </div>
      </div>
    </>
  )
}

export default About;
