import React from 'react';


const App = (props) => {
    return (
      <div>
        <div>
          {props.children}
        </div>
      </div>
    );
};

export default App;