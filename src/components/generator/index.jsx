import * as React from "react"
import { useEffect, useState } from "react"
import { Table, Button, Form } from "react-bootstrap"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { v4 as uuid } from 'uuid'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import ReactJson from 'react-json-view'
import "./index.scss"

const TOGGLE_TYPES = ["release", "context"]
const OPERATIONS_TYPES = ["eq", "ne", "gt", "ge", "lt", "le"]

const DefaultPage = ({ finishedLoading }) => {
  useEffect(finishedLoading ,[finishedLoading]);
  const [data,setData] = useState({
      toggles:[]
  });
  const [processData,setProcessData] = useState();
  const changeData = async (field, value) => {
    const result = {...data, [field]: value }
    setData(result)
    setProcessData({
      toggles: result.toggles
      .map(toggle => {

        const mappedToggle = {
          name: toggle.name,
          type: toggle.type,
          conditions: toggle.type=== TOGGLE_TYPES[1]? toggle.conditions.filter(condition => condition.field && condition.value) : undefined,
          value: toggle.type=== TOGGLE_TYPES[0]? toggle.value : undefined,
        }
        return JSON.parse(JSON.stringify(mappedToggle))
      }).filter(toggle => 
        toggle.name 
        && (
          toggle.type ===TOGGLE_TYPES[0] || toggle.conditions.length > 0))
    })
  }
  const updateToggle = async (index, field, value) =>
    changeData("toggles", data.toggles.map((toggle, indexToChange) => index === indexToChange ? {...toggle, [field]: value } : toggle ))
  const updateCondition = async (toggleIndex, conditions, index, value) =>
    updateToggle(toggleIndex, "conditions", conditions.map((condition, indexToChange) => index === indexToChange ? value : condition))
  return (<>
    <Table striped hover size="sm" data-testid="main-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>State</th>
                <th><div className="actions">
                    Actions
                    <Button onClick={() => changeData("toggles", [...data.toggles, {
                      name: undefined,
                      type: TOGGLE_TYPES[0],
                      conditions: [],
                      value: false,
                    }])}><FontAwesomeIcon icon={['fas', 'plus']} /></Button>
                </div></th>
            </tr>
        </thead>
        <tbody>
          {
            data.toggles.map( (toggle, index) =>(
              <tr key={`toggle_${index}`}>
                <td>
                  <Form.Control type="text" placeholder="Enter Name" value={ toggle.name } onChange={(event) => updateToggle(index, "name", event.target.value)} />
                </td>
                <td><Form.Control 
                        as="select"
                        onChange={event => updateToggle(index,"type", event.target.value)}
                        value={toggle.type} 
                        required>
                    {
                        TOGGLE_TYPES.map(type => 
                            <option key={`toggleType${uuid()}`}>{type}</option>
                        )
                    }
                    </Form.Control>
                </td>
                <td>{toggle.type === TOGGLE_TYPES[0] 
                    ? (<BootstrapSwitchButton
                        checked={toggle.value}
                        onChange={(checked) => updateToggle(index,"value", checked)}/>) 
                    : toggle.conditions.map((condition, indexCondition) => (<>
                          <Form.Control type="text" placeholder="Enter field" value={ condition.field } onChange={(event) => updateCondition(index, toggle.conditions, indexCondition, {...condition, field: event.target.value})} />
                          <Form.Control 
                              as="select"
                              onChange={event => updateCondition(index, toggle.conditions, indexCondition, {...condition, operation: event.target.value})}
                              value={condition.operation} 
                              required>
                          {
                              OPERATIONS_TYPES.map(type => 
                                  <option key={`OperationType${uuid()}`}>{type}</option>
                              )
                          }
                          </Form.Control>
                          <Form.Control type="text" placeholder="Enter value" value={ condition.value } onChange={(event) => updateCondition(index, toggle.conditions, indexCondition, {...condition, value: event.target.value})} />
                          <Button onClick={() => updateToggle(index, "conditions", toggle.conditions.filter((_, indexDelete) => indexCondition !== indexDelete))}><FontAwesomeIcon icon={['fas', 'trash']} /></Button>
                        </>))
                      }
                </td>
                <td>
                    <div className="actions">

                      {toggle.type === TOGGLE_TYPES[1] && <Button onClick={() => updateToggle(index,"conditions", [...toggle.conditions, {
                        field: undefined,
                        value:undefined,
                        operation: OPERATIONS_TYPES[0]
                      }]) }><FontAwesomeIcon icon={['fas', 'plus']} /></Button> }
                      <Button onClick={() => changeData("toggles", data.toggles.filter((_, indexDelete) => index !== indexDelete))}><FontAwesomeIcon icon={['fas', 'trash']} /></Button>
                    </div>
                </td>
              </tr>
            ))
          }
        </tbody>
    </Table>
    <ReactJson src={processData} name={false} />
  </>)
}

export const Default = (props) => <DefaultPage {...props} />;
