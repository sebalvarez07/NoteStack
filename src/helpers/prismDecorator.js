import React from 'react';
import * as Prism from './prismJS';
import Immutable from 'immutable';

const { Map, List } = Immutable;

class PrismDraftDecorator {
  constructor(grammar, customBlockType, languageName) {
    this.grammar = grammar;
    this.customBlockType = customBlockType;
    this.languageName = languageName;
    this.highlighted = {};
  };

  tokensToDecorations(token, offset, blockKey, decorations, type) {
      if(typeof token === 'string' || typeof token.content === 'string') {
        
          var tokId = 'tok'+offset;
          var completeId = blockKey + '-' + tokId;
          this.highlighted[blockKey][tokId] = typeof token === 'string'? type : token.type;
          occupySlice(decorations, offset, offset + token.length, completeId);
          return offset + (token.length);
      }
      else if(Array.isArray(token.content)){
        
        var that = this;
        var _offset = offset;
        for(let tok of token.content){
          _offset = that.tokensToDecorations(tok, _offset, blockKey, decorations, token.type);
        }
        return _offset;
      }
  };

  getDecorations(block) {
    var blockType = block.getType();
    var blockKey = block.getKey();
    var blockText = block.getText();
    var decorations = Array(blockText.length).fill(null);
    this.highlighted[blockKey] = {};
    if (blockType !== this.customBlockType) {
      return List(decorations);
    }

    var tokens = Prism.tokenize(blockText, this.grammar);
    var offset = 0;
    var that = this;
    tokens.forEach(function(tok) {
      if (typeof tok === 'string') {
        offset += tok.length;
      } else {
        offset = that.tokensToDecorations(tok, offset, blockKey, decorations, tok.type);
      }
    });
    return List(decorations);
  }
  getComponentForKey(key) {
    return function(props) {
      return <span 
              decoratedtext={props.decoratedtext}
              offsetkey={props.offsetkey}
              className={'token ' + props.tokType}
              >
              { props.children }
          </span>;  
    }
  }
  getPropsForKey(key) {
    var parts = key.split('-');
    var blockKey = parts[0];
    var tokId = parts[1];
    var token = this.highlighted[blockKey][tokId];
    return {
      tokType: token,
      offsetkey: key
    };
  }
}

function occupySlice(targetArr, start, end, componentKey) {
  for (var ii = start; ii < end; ii++) {
    targetArr[ii] = componentKey;
  }
}

export default PrismDraftDecorator;