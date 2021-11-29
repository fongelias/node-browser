import React, { useState, useEffect } from 'react';
import './App.css';
import { FlexBox } from '../FlexBox/FlexBox';

export const App = () =>  {
  return (
    <div className="App">
      <NodeNavigator/>
    </div>
  );
}

// Component Planning
// Node Navigator
// -- Node Query
// -- Property Selector
// -- Property Display

const NodeNavigator = () => {
  return (
    <FlexBox>
      <NodeSelector/>
      <NodeViewer/>
    </FlexBox>
  )
}

const NodeSelector = () => {
  const [nodes, setNodes] = useState([]);
  // visual state
  const [showQueryForm, setShowQueryForm] = useState(true);
  useEffect(() => {
    setShowQueryForm(nodes.length === 0);
  }, [nodes]);

  return (
    <>
      {showQueryForm ? <QueryForm setResults={setNodes}/> : null}
      <div></div>
    </>
  );
}

interface QueryForm {
  setResults: (newVal: []) => void;
}

const get = (req: Request | string): Promise<String> => fetch(req).then(res => res.text());

const QueryForm = ({
  setResults
}: QueryForm) => {
  const [query, setQuery] = useState('');
  const runQuery = () => {
    get('/n4j').then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <FlexBox>
      <QueryInput initialState={query} setExternalState={setQuery}/>
      <button onClick={runQuery}>submit</button>
    </FlexBox>
  )
}

interface QueryInputProps {
  initialState?: string;
  setExternalState: (newVal: string) => void;
}

const QueryInput = ({
  initialState = '',
  setExternalState,
}: QueryInputProps) => {
  const [queryText, setQueryText] = useState(`${initialState}`);
  const onQueryChange = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const eventValue = event.currentTarget.value;
    setQueryText(eventValue);
    setExternalState(eventValue);
  }

  return (
    <>
      <textarea value={queryText} onChange={onQueryChange}/>
    </>
  );
}

const NodeViewer = () => {
  return (
    <></>
  );
}
