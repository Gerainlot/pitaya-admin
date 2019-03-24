import React, { Component } from 'react';
import { Upload, Icon, Modal } from 'antd';

class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: []
    };
    componentWillReceiveProps(nextProps){
        let fileList = nextProps.pictures.map((item)=>{
            if(!item.uid){
                item.uid = item.id
            }
            if(!item.url){
                item.url = item.path
            }
            return item
        })
        this.setState({
            fileList 
        })
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
    
        fileList = fileList.map((file) => {
            if (file.response) {
              // Component will show file.url as link
              
              file.url = file.response.data[0].path;
              file.id = file.response.data[0].id;
            }
            return file;
        });
        
        fileList = fileList.filter((file) => {
            if (file.response) {
                return file.response.status === 'success';
            }
            return true;
        });
        this.setState({ 
            fileList 
        },()=> {
            this.props.changePicsList(fileList)
        });
    }

    handleRemove = (file) => {
        console.log(file)
        this.props.removePicsList(file)
    }
    render() {
        const { uploadUrl } = this.props;
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">上传</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    action={uploadUrl}
                    multiple={true}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                >
                {fileList.length >= 5 ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall;