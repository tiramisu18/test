import React from 'react'
import {DatePicker} from 'element-react'
import Title from '../title.js'

export default class YearReport extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value1: null,
      searchStart: '',
      searchEnd: ''
    }
    this.callBack = this.callBack.bind(this)
    this.finallyDay = this.finallyDay.bind(this)
  }
  //
  callBack (timeStart) {
    const timeEnd = this.finallyDay(timeStart)
    this.setState({
      searchStart: timeStart,
      searchEnd: timeEnd
    })
  }
  // 计算最后一天时间
  finallyDay (timeStart) {
    let timeEnd = new Date()
    const time = timeStart.getTime()
    timeStart.getFullYear() % 4 === 0
    ? timeEnd.setTime(time + 3600 * 1000 * 24 * 365) : timeEnd.setTime(time + 3600 * 1000 * 24 * 364)
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
            placeholder='开始年份'
            isReadOnly
            onChange={date => {
              console.debug('year DatePicker changed: ', date)
              this.setState({value1: date}, () => {
                this.callBack(this.state.value1)
              })
            }}
            selectionMode='year'
            align='right'
              />
        </div>

        <Title value1={this.state.value1} timeStart={this.state.searchStart}
          timeEnd={this.state.searchEnd} statId={3} name='年报' />
      </div>
    )
  }
}
