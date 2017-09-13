import React from 'react'
import {DatePicker} from 'element-react'
import Title from '../title.js'

export default class MonthReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: null,
      searchStart: '',
      searchEnd: ''
    }
    this.callBack = this.callBack.bind(this)
    this.getFinallyDay = this.getFinallyDay.bind(this)
  }
  //
  callBack (timeStart) {
    let timeEnd = this.getFinallyDay(timeStart)
    this.setState({
      searchStart: timeStart,
      searchEnd: timeEnd

    })
  }
  // 计算每月最后一天
  getFinallyDay (timeStart) {
    let timeEnd = new Date()
    let start = timeStart.getTime()
    switch (timeStart.getMonth() + 1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        timeEnd.setTime(start + 3600 * 1000 * 24 * 30); break
      case 2:
        if (timeStart.getFullYear() % 4 === 0) {
          timeEnd.setTime(start + 3600 * 1000 * 24 * 28); break
        }
        timeEnd.setTime(start + 3600 * 1000 * 24 * 27); break
      default:
        timeEnd.setTime(start + 3600 * 1000 * 24 * 29); break
    }
    return timeEnd
  }

  render () {
    let {value1} = this.state
    return (
      <div >
        <div className='search'>
          <span>查询时间：</span>
          <DatePicker
            value={value1}
            placeholder='选择月份'
            isReadOnly
            onChange={date => {
              console.debug('month DatePicker changed: ', date)
              this.setState({value1: date}, () => {
                this.callBack(this.state.value1)
              })
            }}
            selectionMode='month'
          />
        </div>
        <Title value1={this.state.value1} timeStart={this.state.searchStart}
          timeEnd={this.state.searchEnd} statId={2} name='月报' />
      </div>
    )
  }
}
