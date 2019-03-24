import {
    Icon, Upload, Modal
} from 'antd';
    
import React from "react"
import {api_goods_picture_upload} from '../../../../apis/api'

export default class PicturesWall extends React.Component {
    state = {
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  
    componentDidMount() {
      if (this.props.url){
        this.setState({
          fileList : [this.newFile(this.props.index,this.props.url)]
        })
      }
    }

    newFile = (id,url) => {
        return {
          uid: id,
          name: 'xxx.png',
          status: 'done',
          url: url,
        }
      }

    handleCancel = () => this.setState({ previewVisible: false })
  
    handlePreview = (file) => {
      this.setState({
        previewImage: file.url || file.thumbUrl,
        previewVisible: true,
      });
    }
  
    handleChange = (info) => {
        let fileList = info.fileList;
        const {onUploaded,index} = this.props
        fileList = fileList.map((file) => {
            if (file.response) {
              // Component will show file.url as link
              console.log("picture wall of specification file response = ",file.response)
              file.url = file.response.data[0].path;
              file.id = file.response.data[0].id;
            }
            return file;
        }).filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        })
        this.setState({ 
            fileList 
        },() => {
            onUploaded(index,fileList[0].id,fileList[0].url)
        });
    }
    
    render() {
      const { previewVisible, previewImage, fileList } = this.state;
      console.log("specification picture wall file list = ",fileList)
      const uploadButton = (
        <div>
          <Icon type="plus" />
          <div className="ant-upload-text">上传图片</div>
        </div>
      );
      return (
        <div className="clearfix">
          <Upload
            action={api_goods_picture_upload}
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length > 0 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
    }
  }