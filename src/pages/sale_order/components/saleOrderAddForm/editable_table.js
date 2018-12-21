  import React,{ Component, Fragment } from 'react'; 
  import {
    Table, Input, InputNumber, Popconfirm, Form
  } from 'antd';
  
  const FormItem = Form.Item;
  const EditableContext = React.createContext();
  
  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  
  class EditableTable extends Component {
    constructor(props) {
        super(props);
        this.writeBackFunc = this.props.writeBackFunc
        this.state = { data: this.props.dataSource, editingKey: '' };
        this.columns = [...this.props.columns, {
            title: 'operation',
            dataIndex: 'operation',
            render: (text, record) => {
                const editable = this.isEditing(record);
                return (
                    <div>
                    {editable ? (
                        <span>
                        <EditableContext.Consumer>
                            {form => (
                            <a
                                href="javascript:;"
                                onClick={() => this.save(form, record.stockId)}
                                style={{ marginRight: 8 }}>
                                Save
                            </a>
                            )}
                        </EditableContext.Consumer>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => this.cancel(record.stockId)}
                        >
                            <a>Cancel</a>
                        </Popconfirm>
                        </span>
                    ) : (
                        <a onClick={() => this.edit(record.stockId)}>Edit</a>
                    )}
                    </div>
                );
            }
        }];
        console.log(this.columns)
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            data: nextProps.dataSource
        })
    }
  
    isEditing = record => record.stockId === this.state.editingKey;
  
    cancel = () => {
      this.setState({ editingKey: '' });
    };
  
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.stockId);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ data: newData, editingKey: '' }, ()=>{
            this.writeBackFunc(newData)
          });
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: '' }, ()=>{
            this.writeBackFunc(newData)
          });
        }
      });
    }
  
    edit(key) {
      this.setState({ editingKey: key });
    }

    handleAdd = () => {
        const { data } = this.state;
        const newData = {
          id: 1000,
          goodsId : 1001,
          goodsName : "Pitaty gold",
          goodsQuantity : 99,
          costUnitPrice : 5.00,
          saleUnitPrice : 10.00,
          remark : "Remark...",
        };
        this.setState({
          data: [...data, newData],
        });
      }

    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });

      return (
          <Fragment>
            <Table
                rowKey={record => record.stockId}
                components={components}
                bordered
                dataSource={this.state.data}
                columns={columns}
                pagination={false}
                rowClassName="editable-row"
            />
          </Fragment>
        
      );
    }
  }
  
  export default EditableTable
  