import React, { Component } from 'react';
import {Form} from 'antd'
import {connect} from "react-redux"
import { EditorState, convertToRaw ,ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from '../../../../../node_modules/html-to-draftjs';
import {api_goods_picture_upload} from "../../../../api"
require('../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css')
require('./goods_editor.css')


class EditorConvertToHTML extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    html : ""
  }

  componentWillReceiveProps(props) {
    const {goodsInfo} = props
    this.initialHtml(goodsInfo ? goodsInfo.description : "")
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      html : draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  initialHtml = (data) => {
    let html = '<p>在这里写下商品描述 😀</p>';
    if (data) {
      html = data 
    }
    // html += '<p></p>'
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      const editorState = EditorState.createWithContent(contentState);
      this.setState({
        editorState,
        html : html
      }) 
    }
  }

  uploadImageCallBack(file) {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST',api_goods_picture_upload );
        xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('file', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          const data = {
            data : {
              link : response.data[0].path
            }
          }
          console.log("upload image call back ",response,"and ",data)
          resolve(data);
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    console.log("render editorState = ",editorState)
    return (
      <div 
      style={{"width":"60%","margin":"50px"}}
      >
        <Editor 
          editorState={editorState}
          toolbarClassName="rdw-storybook-toolbar"
          wrapperClassName="rdw-storybook-wrapper"
          editorClassName="rdw-storybook-editor"
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
          onEditorStateChange={this.onEditorStateChange}
        />
        <textarea
          // style={{width:"100%",height:200,overflow:"scroll"}}
          readOnly
          className="rdw-storybook-textarea"
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
      </div>
    );
  }
}

const WrappedEditor = Form.create(
  {name :"goods_editor"}
)(EditorConvertToHTML)

const mapStateToProps = (state) => ({
  goodsInfo: state.getIn(["goods", "goodsInfo","goods"]).toJS(),
})
const mapDispatchToProps = (dispatch) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(WrappedEditor);
