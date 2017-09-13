import React from 'react'
import { render } from 'react-dom'

import Bundle from '../src/components/lazyload'
import {Loading, Tabs} from 'element-react'
import DayReport from './pages/index/index.js'
import WeekReport from './pages/zhoubao/index.js'
import XunReport from './pages/xunbao/index.js'
import MonthReport from './pages/yuebao/index.js'
import YearReport from './pages/nianbao/index.js'

import 'element-theme-default'
import './style/index.css'

const loadComponent = (Component) => () => (
  <Bundle load={Component}>
    {
            (Component) => Component ? <Component /> : <Loading><div style={{height: '100vh'}} /></Loading>
        }
  </Bundle>
)
class App extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='md-body'>
        <div>
          <h1 className='title'>
            <a><span>重庆市数值预报业务支撑平台</span></a>
          </h1>
        </div>
        <div className='md-container'>
          <div className='md-panel'>
            <Tabs activeName='1' className='md-tabs'>
              <Tabs.Pane label='日 报' name='1'>
                <DayReport />
              </Tabs.Pane>
              <Tabs.Pane label='周 报' name='2'>
                <WeekReport />
              </Tabs.Pane>
              <Tabs.Pane label='旬 报' name='3'>
                <XunReport />
              </Tabs.Pane>
              <Tabs.Pane label='月 报' name='4'>
                <MonthReport />
              </Tabs.Pane>
              <Tabs.Pane label='年 报' name='5'>
                <YearReport />
              </Tabs.Pane>
            </Tabs >
          </div>
        </div>
        <div className='bottom'>
          <span />
        </div>
      </div>

    )
  }
}
render(<App />, document.getElementById('root'))
