import React from 'react'
import {DatePicker} from 'element-react'

import Title from '../title.js'
import RangePrint from '../print.js'

import './style/index.css'

export default class WeekReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: null,
      searchStart: '',
      searchEnd: ''
    }
    this.callBack = this.callBack.bind(this)
  }
  //
  callBack (timeStart) {
    const timeEnd = new Date()
    timeEnd.setTime(timeStart.getTime() + 3600 * 1000 * 24 * 6)
    this.setState({
      searchStart: timeStart,
      searchEnd: timeEnd
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
              console.debug('week DatePicker1 changed: ', date)
              this.setState({value1: date}, () => {
                this.callBack(this.state.value1)
              })
            }}
            format='yyyy 第 WW 周'
            selectionMode='week'
            />
        </div>
        <Title value1={this.state.value1} timeStart={this.state.searchStart}
          timeEnd={this.state.searchEnd} statId={0} name='周报' />
      </div>
    )
  }
}
