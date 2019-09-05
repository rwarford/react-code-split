import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Emphasis from './Emphasis';

const Button = styled.a`color: blue; cursor: pointer;`;

const App = () => {
    const [state, setState] = useState({component: null});

    const handleHide = () => {
        setState({component: null});
    }

    const handleShow = () => {
        setState({component: () => <div>loading...</div>});
        import(/* webpackChunkName: 'component' */'./Component').then(mod => setState({component: mod.default}));
    }

    return (
        <div>
            <h1>Code Splitting</h1>
            <p>This simple app demonstrates code splitting in a React app.
               Code splitting is achieved by dynamically importing modules using <Emphasis>import().then()</Emphasis>.</p>
            <p>Open the developer tools window and show the Networking tab.
               Click on <Emphasis>Show Component</Emphasis> below and notice a new javascript file is downloaded.</p>
            <p>Try showing the device tool bar (CTRL-SHIFT-M) and switching to "Low-end mobile" performance.  Reload and click <Emphasis>Show Component</Emphasis> again.</p> 
            
            {
                state.component ? 
                    <React.Fragment>
                        <Button onClick={handleHide}>Hide Component</Button>
                        <state.component/>
                    </React.Fragment>
                :
                    <Button onClick={handleShow}>Show Component</Button>
            }
        </div>
    );
};

export default App;
ReactDOM.render(<App/>, document.getElementById('app'));