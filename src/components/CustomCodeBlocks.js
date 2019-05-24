import React from 'react';
import Immutable from 'immutable';
import Draft from 'draft-js';

class CodeCustomBlock extends React.Component {
  render() {
    return (
        <pre className={`public-DraftStyleDefault-pre ${this.props.nameClass}`}>
          <code className={`${this.props.nameClass}`}>
            { this.props.children }
          </code>
        </pre>
    );
  }
}
    
const codeBlock = Immutable.Map({
    'unstyled': {
      element: 'div',
      // will be used in convertFromHTMLtoContentBlocks
      aliasedElements: ['p'],
    },
    'codeBlockJS': {
    // element is used during paste or html conversion to auto match your component;
    // it is also retained as part of this.props.children and not stripped out
    element: 'span',
    wrapper: <CodeCustomBlock nameClass='language-javascript'/>,
    },
    'codeBlockPHP': {
        element: 'span',
        wrapper: <CodeCustomBlock nameClass='language-php'/>,
    },
    'codeBlockCSS': {
        element: 'span',
        wrapper: <CodeCustomBlock nameClass='language-css'/>,
    },
    'codeBlockHTML': {
      element: 'span',
      wrapper: <CodeCustomBlock nameClass='language-markup'/>,
  }
});

//   keep support for other draft default block types and add our myCustomBlock type
const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(codeBlock);

export default extendedBlockRenderMap;