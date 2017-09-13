import React from 'react'
import {Button} from 'element-react'
import '../style/index.css'

export default class RangePrint extends React.Component {
  constructor (props) {
    super(props)
    this.rangePrint = this.rangePrint.bind(this)
  }
  rangePrint () {
    const iframe = document.createElement('iframe')

    const newstr = document.getElementById(this.props.idName).innerHTML
    iframe.srcdoc = newstr
    // const oldstr = document.body.innerHTML
    document.body.appendChild(iframe)

    // document.body.innerHTML = newstr
    // window.frames[0].print()
    // document.body.innerHTML = oldstr

    // const w = window.open('', '_blank')
    // w.document.body.innerHTML = newstr
    // w.document.write(newstr)
    // document.location.reload()
    // window.print()
    return false
  }
  render () {
    return (
      <div className='print'>
        <Button onClick={this.rangePrint} >打印</Button>
      </div>
    )
  }
}
