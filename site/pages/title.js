import React from 'react'

import {Loading, Message, Select, Button} from 'element-react'
import {Table} from 'antd'
import md_ajax from 'md_midware/md-service/md-ajax'
import '../style/base.scss'
import './index.css'

const columnsList = [
  {title: '序号', dataIndex: 'number'},
  {title: '模式名称', dataIndex: 'model'},
  {title: '应运行次数', dataIndex: 'shRunTime'},
  {title: '实际运行次数', dataIndex: 'realRunTime'},
  {title: '运行稳定率', dataIndex: 'realFunction'},
  {title: '按时完成次数', dataIndex: 'qualified'},
  {title: '及时完成率', dataIndex: 'quaPercent'},
  {title: '时长次数', dataIndex: 'totalTime'},
  {title: '时长次数百分比', dataIndex: 'totalTimePercent'}
]
const lists = [
        {value: '', label: '全部'},
        {value: '00', label: '00'},
        {value: '03', label: '03'},
        {value: '06', label: '06'},
        {value: '09', label: '09'},
        {value: '12', label: '12'},
        {value: '15', label: '15'},
        {value: '18', label: '18'},
        {value: '21', label: '21'}
]
export default class Title extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      loadstate: false,
      optionsValue: ''
    }
    this.search = this.search.bind(this)
    this.getData = this.getData.bind(this)
    this.getTimes = this.getTimes.bind(this)
    this.searchTime = this.searchTime.bind(this)
    // this.title = this.title.bind(this)
  }

  // 点击按钮查询事件
  search () {
    let start = this.props.timeStart
    let end = this.props.timeEnd
    let options = this.getTimes(this.state.optionsValue)
    let statId = this.props.statId
    let timeStart = this.props.value1
    if (timeStart === null) {
      Message.warning('请选择查询时间！')
    } else {
      const resultS = this.searchTime(start)
      const resultE = this.searchTime(end)
      // 发送ajax请求
      this.setState({
        loadstate: true,
        searchStart: resultS,
        searchEnd: resultE
      }, () => {
        md_ajax.get('http://192.168.19.42:7080/monitorlog_web/stat?', {params: {
          DATE_START: this.state.searchStart,
          DATE_END: this.state.searchEnd,
          TIME: options,
          STAT_ID: statId
        }})
      // 正确时
      .then((date) => {
        const text = this.textContent(statId)
        const list = this.getData(date)
        this.setState({
          loadstate: false,
          data: list,
          tableShow: text
        })
      })
    // 捕捉错误
    .catch((event) => {
      Message.error('出现错误')
    })
      })
    }
  }
   // 时次查询
  getTimes (value) {
    if (value === '') {
      value = ''
    }
    return value
  }
  // 返回查询时间
  searchTime (time) {
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = time.getDate()
    day = day < 10 ? '0' + day : day
    const result = year + '-' + month + '-' + day
    return result
  }
  // 报表时间显示
  textContent (statId) {
    let text = ''
    if (statId === '') {
      text = this.state.searchStart
    } else if (statId === 1) {
      text = this.props.text
    } else {
      text = this.state.searchStart + '至' + this.state.searchEnd
    }
    return text
  }
   // 得到所有数据
  getData (date) {
    let tableDataLists = []
    if (date.data.length <= 0) {
      this.setState({data: []})
      Message.warning('此时间段无数据')
    }
    for (let i = 0; i < date.data.length; i++) {
      let dateList = date.data[i]
      let modelName = ''
      switch (dateList.nume_pred_model_id) {
        case 101:modelName = '中尺度模式'; break
        case 20:modelName = 'RUC同化模式'; break
        case 30:modelName = '集合预报模式'; break
        /* case '30_ens':modelName = '集合预报模式_ens'; break
        case '30_m00':modelName = '集合预报模式_m00'; break
        case '30_m01':modelName = '集合预报模式_m01'; break
        case '30_m02':modelName = '集合预报模式_m02'; break
        case '30_m03':modelName = '集合预报模式_m03'; break
        case '30_m04':modelName = '集合预报模式_m04'; break
        case '30_m05':modelName = '集合预报模式_m05'; break
        case '30_m06':modelName = '集合预报模式_m06'; break
        case '30_m07':modelName = '集合预报模式_m07'; break
        case '30_m08':modelName = '集合预报模式_m08'; break
        case '30_m09':modelName = '集合预报模式_m09'; break
        case '30_m10':modelName = '集合预报模式_m10'; break */
        case 40:modelName = 'GFS模式'; break
      }
      tableDataLists.push({
        number: i + 1,
        model: modelName,
        shRunTime: dateList.nume_pred_should_runtimes,
        realRunTime: dateList.nume_pred_real_runtimes,
        realFunction: dateList.nume_pred_real_function,
        qualified: dateList.nume_pred_qualified,
        quaPercent: dateList.nume_pred_qualified_percent,
        totalTime: dateList.nume_pred_totalruntime_runtimes,
        totalTimePercent: dateList.nume_pred_totalruntime_runtimes_percent
      })
    }
    return tableDataLists
  }
  /* 标题
  title (statId) {
    let titleName = '日报'
    switch (statId) {
      case 0 :titleName = '周报'; break
      case 1 :titleName = '旬报'; break
      case 2 :titleName = '月报'; break
      case 3 :titleName = '年报'; break
      default:
        titleName = '日报'; break
    }
    return titleName
  } */

  render () {
    return (
      <div className='table'>
        <div className='select'>
          <span className='search-text'>时次：</span>
          <Select placeholder='选择时次' value='' onChange={(val, opt) => {
            this.setState({optionsValue: val})
          }}>
            {
              lists.map(el => {
                return <Select.Option key={el.value} label={el.label} value={el.value} />
              })
            }
          </Select>
          <Button type='primary' icon='search' onClick={this.search} >查找</Button>
        </div>
        <hr />
        <Loading text='拼命加载中' loading={this.state.loadstate}>

          <div className='table-title'>
            <h2>数值预报模式数据运行情况统计{this.props.name}</h2>
            <div className='table-des'>
              <span>制表:xxxxx</span>
              <span className='des-center'>发布单位:xxxxxxx</span>
              <span>
                报表时间: {this.state.tableShow}
              </span>
            </div>
          </div>
          <Table
            size='small'
            width='100%'
            columns={columnsList}
            dataSource={this.state.data}
            bordered
            locale={{emptyText: ''}}
            pagination={false}
              />
        </Loading>

      </div>
    )
  }
}
Title.defaultProps = {
  searchStart: '',
  searchEnd: '',
  statId: 1,
  text: '',
  name: '日报'
}
