import React, { Component } from 'react'
import { Table, Button, Modal, Input  } from 'antd'
import Axios from 'axios'
import './index.css'
import './optimize'


// const FormItem = Form.Item
export default class Content extends Component {
  
  state = { visible: false };
  showModal = (item) => {
    this.setState({
      visible: true,
      dataSourceThree:item
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleSearchTow(e){
    let {dataSourceTwo} = this.state
    this.setState({
      dataSourceTwo2:dataSourceTwo.filter((todo)=>{
        let arr=todo.tags;
        let str=arr.join('');
        if(str.indexOf(e.target.value) !== -1 ){
          return true
        }else{
          return false
        };
      })
    })
    if(e.target.value.trim() === ''){
      this.setState({
        dataSourceTwo2:this.state.dataSource
      })
    }
  }
  
  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        ellipsis: true,
        wdith: '300'
      },
      {
        title: '图片',
        dataIndex: 'image',
        key: 'image',
        render: (item) => {
          return <img src={item} alt=""/>
        }
      },
      {
        title: 'URL',
        dataIndex: 'baseURL',
        key: 'baseURL',
        render: (item) => {
        return <a href={item}>{item}</a>
        }
      },
      {
        title: '标签',
        dataIndex: 'tags',
        key: 'tags',
        render: (item) => {
         return  <span>
            {
              item.map( (item,index) => {
                return <div key={index}>
                  {item}
                </div>
              })
            }
          </span>
        }
      },
      {
        title: '属性',
        dataIndex: 'properties',
        key: 'properties',
        render: (item) => {
          return  <Button onClick = {() => {this.showModal(item)}}>点击触发model</Button>
        }
      },
    ];
    const columnsTwo = [
      {
        title: 'type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'url',
        dataIndex: 'url',
        key: 'url',
        ellipsis: true,
        width: "150"
      },
    ]
    return (
          <div>
            <Input 
              onChange = {this.handleSearchTow.bind(this)}
            />
            <Table 
              columns={columns}
              dataSource={this.state.dataSourceTwo2}
              bordered
              pagination={false}
              onChange={this.onChange}
            />
            <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
            >
              <Table 
                columns={columnsTwo}
                dataSource={this.state.dataSourceThree}
                pagination={false}
                bordered
              />
            </Modal>
          </div>
    )
  }

  componentDidMount(){
    Axios.get("http://www.mocky.io/v2/5ea28891310000358f1ef182")
    .then((res,rec) => {
      const aa = res.data.apis
      this.setState({
        dataSource: aa,
      },()=>{
        this.setState({
          dataSourceTwo: this.state.dataSource,
          dataSourceTwo2:this.state.dataSource,
        })
      })
    })
  }
}
