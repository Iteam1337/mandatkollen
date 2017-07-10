import React from 'pureact'
import {BarChart} from 'react-d3-components'

const data = [{
    label: 'somethingA',
    values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
}];




export default <BarChart
  data={data}
  width={400}
  height={400}
  margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
