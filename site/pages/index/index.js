import React from 'react'
import PrintProvider, { Print } from 'react-easy-print'
import {DatePicker} from 'element-react'
var PrintTemplate = require('react-print')

import Title from '../title.js'

export default class DayReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: null,
      searchStart: ''
    }
    this.callBack = this.callBack.bind(this)
  }
  // 回调函数
  callBack (timeStart) {
    this.setState({
      searchStart: timeStart
    })
  }
  render () {
    let {value1} = this.state
    return (
      <div >
        <div className='search'>
          <span>查询时间：</span>
          <DatePicker
            value={value1}
            placeholder='选择日期'
            isReadOnly
            onChange={date => {
              console.debug('DatePicker1 changed: ', date)
              this.setState({value1: date}, () => {
                this.callBack(this.state.value1)
              })
            }} />
        </div>
        <Title value1={this.state.value1} timeStart={this.state.searchStart}
          timeEnd={this.state.searchStart} statId='' />
      </div>
    )
  }
}
