import React from 'react';
import Immutable from 'immutable';
import Draft from 'draft-js';
import Prism from 'prismjs';
import { convertFromHTML, ContentState } from 'draft-js';

class CodeCustomBlock extends React.Component {
    constructor(props) {
      super(props);

      this.content = '';
    }

    componentDidMount() {
        const {block} = this.props;
        this.content = Prism.highlight(block.getText(), Prism.languages.javascript, 'javascript');
        this.content = convertFromHTML(this.content);
        this.content = ContentState.createFromBlockArray(this.content.contentBlocks, this.content.entityMap);
        // document.querySelector(`.${this.props.blockProps.nameClass}`).insertAdjacentHTML('afterbegin', this.content);
    }

    componentDidUpdate() {

    }
  
    render() {
      
        console.log(this.props);
        // const element = (<span className={`${this.props.blockProps.nameClass}`}>{ text }</span>)
        const {block} = this.props;
        this.content = Prism.highlight(block.getText(), Prism.languages.javascript, 'javascript');
        this.content = convertFromHTML(this.content);
        this.content = ContentState.createFromBlockArray(this.content.contentBlocks, this.content.entityMap);
        console.log(this.content);
        
      return (
        <pre>
            <code className={`${this.props.blockProps.nameClass}`}>
           
            </code>
        </pre>
      );
    }
  }

  const codeBlockJS = (contentBlock) => {
    const type = contentBlock.getType();
    if (type === 'codeBlockJS') {
        return {
            component: CodeCustomBlock,
            editable: true,
            props: {
                nameClass: 'language-javascript',
            },
        };
    }
  }

// class CodeCustomBlock extends React.Component {

//     allText = '';

//     constructor(props) {
//       super(props);
//     }

//     componentDidMount() {
//         // Prism.highlightAll();
//         // this.props.children.forEach(child => {
//         //     this.allText += child.props.children.props.block.getText();
//         // })
//     }

//     componentDidUpdate() {
//         // Prism.highlightElement('language-javascript');
//         // this.props.children.forEach(child => {
//         //     this.allText += child.props.children.props.block.getText();
//         // });
//     }
  
//     render() {
//         // console.log('allText', this.allText);

//         console.log(this.props);


//       return (
//         <pre>
//             <code className={`${this.props.nameClass}`}>
//                 { this.props.children }
//             </code>
//         </pre>
//       );
//     }
//   }
  
//   const codeBlockJS = Immutable.Map({
//     'codeBlockJS': {
//       // element is used during paste or html conversion to auto match your component;
//       // it is also retained as part of this.props.children and not stripped out
//       element: 'span',
//       wrapper: <CodeCustomBlock nameClass={'language-javascript'}/>,
//     }
//   });
  
// //   keep support for other draft default block types and add our myCustomBlock type
//   const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(codeBlockJS);

  export default codeBlockJS;