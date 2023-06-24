import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { registerMicroApps, start, setDefaultMountApp, runAfterFirstMounted, initGlobalState } from 'qiankun';

import './index.css';

const apps = [
  {
    name: 'vueApp',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: '/app-vue',
    loader: (loading) => {
      console.log('vueApp, loading: ', loading);
    },
    props: {
      name: 'vueApp',
    }
  },
  {
    name: 'reactApp',
    entry: '//localhost:3002',
    container: '#container',
    activeRule: (location) => {
      return location.pathname.startsWith('/app-react');
    },
    loader: (loading) => {
      console.log('reactApp, loading: ', loading);
    },
    props: {
      name: 'reactApp'
    }
  },
];

const lifeCycles = {
  beforeLoad: (app) => {
    console.log('app beforeLoad: ', app);
  },
  beforeMount: [(app) => {
    console.log('app beforeMount: ', app);
  }],
  afterMount: [
    (app) => {
      console.log('app afterMount1: ', app);
    },
    (app) => {
      console.log('app afterMount2: ', app);
    }
  ],
  beforeUnmount: (app) => {
    console.log('app beforeUnmount: ', app);
  },
  afterUnmount: (app) =>{
    console.log('app beforeUnmount: ', app);
  }
}

registerMicroApps(
  apps,
  lifeCycles,
);

start({
  prefetch: function(a) {
    console.log('a======: ', a);
    return {
      criticalAppNames: ['reactApp']
    }
  },
  sandbox: {
    experimentalStyleIsolation: true,
    // strictStyleIsolation:  true,
  }
});

setDefaultMountApp('/app-react');

runAfterFirstMounted(() => {
  console.log('=====runAfterFirstMounted======');
});

// 初始化 state
const actions = initGlobalState({rootCount: 0});

actions.onGlobalStateChange((state, prev) => {
  console.log('state,=============== prev: ', state, prev);
  // state: 变更后的状态; prev 变更前的状态
});
actions.setGlobalState({count: 2});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);