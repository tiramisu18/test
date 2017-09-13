import React from 'react'
import {DatePicker} from 'element-react'

import Title from '../title.js'

export default class DayReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: null,
      searchStart: '',
      searchEnd: '',
      text: ''
    }
    this.endData = this.endData.bind(this)
    this.defineXun = this.defineXun.bind(this)
    this.callBack = this.callBack.bind(this)
  }
  //
  callBack (timeStart) {
    let resultE = this.endData(timeStart)
    let xun = this.defineXun(timeStart)
    this.setState({
      searchStart: timeStart,
      searchEnd: resultE,
      text: xun
    })
  }
  // 得到结尾时间
  endData (timeStart) {
    let endTime = new Date()
    const startData = timeStart.getDate()
    const startTime = timeStart.getTime()
    if (startData === 1 || startData === 11) {
      endTime.setTime(timeStart.getTime() + 3600 * 1000 * 24 * 9)
    } else {
      switch (timeStart.getMonth() + 1) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          endTime.setTime(startTime + 3600 * 1000 * 24 * 10); break
        case 2:
          if (timeStart.getFullYear() % 4 === 0) {
            endTime.setTime(startTime + 3600 * 1000 * 24 * 8); break
          }
          endTime.setTime(startTime + 3600 * 1000 * 24 * 7); break
        default:
          endTime.setTime(startTime + 3600 * 1000 * 24 * 9); break
      }
    }
    return endTime
  }
  // 判断为哪旬
  defineXun (timeStart) {
    let month = timeStart.getMonth() + 1
    let day = timeStart.getDate()
    const year = timeStart.getFullYear()
    let xun = ''
    switch (day) {
      case 1: xun = '上旬'; break
      case 11: xun = '中旬'; break
      case 21: xun = '下旬'; break
    }
    day = day < 10 ? '0' + day : day
    month = month < 10 ? '0' + month : month
    let result = year + '-' + month + '-' + xun
    return result
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
            }}
            disabledDate={time => time.getDate() !== 1 && time.getDate() !== 11 && time.getDate() !== 21} />
        </div>
        <Title value1={this.state.value1} timeStart={this.state.searchStart}
          timeEnd={this.state.searchEnd} statId={1} text={this.state.text} name='旬报' />
      </div>
    )
  }
}
