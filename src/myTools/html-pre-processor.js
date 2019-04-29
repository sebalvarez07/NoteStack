// HTML preprocessor from Raw data to HTML string
import React from 'react';
const HTML_set = new Map();
HTML_set.set('header-two', '<h2>%content%</h2>');
HTML_set.set('header-three', '<h3>%content%</h3>');
HTML_set.set('header-four', '<h4>%content%</h4>');
HTML_set.set('code-block', '<pre>%content%</pre>');
HTML_set.set('unordered-list-item', '<li>%content%</li>');
HTML_set.set('ordered-list-item', '<li>%content%</li>');
HTML_set.set('blockquote', '<blockquote>%content%</blockquote>');
HTML_set.set('p', '<p>%content%</p>');
HTML_set.set('br', '<br />');

const set_styles = new Map();
set_styles.set('BOLD', '<b>%content%</b>');
set_styles.set('ITALIC', '<i>%content%</i>');
set_styles.set('CODE', '<code>%content%</code>');
set_styles.set('UNDERLINE', '<u>%content%</u>');

const toHtml = (contentArray) => {
    const html_temp = contentArray.map( (el, index) => {

        const isListItem = el.type === 'unordered-list-item' || el.type === 'ordered-list-item';

        let elementHTML = '';

        if(isListItem){
            // If this is first element || If last element was NOT a list element 
            if(index === 0 || (contentArray[index-1].type !== 'unordered-list-item' && contentArray[index-1].type !== 'ordered-list-item')){
                // We place initial tag
                elementHTML += (el.type === 'unordered-list-item' ? '<ul>' : '<ol>');
            }  
        }

        let elText = el.text;

        if(el.type !== 'br') {
            // Change tags from all text content from html to string 
            elText = elText.replace(/\</g, '&lt;');
            elText = elText.replace(/\>/g, '&gt;');
        }

        // Add current tag with text Unless its a <br /> then its just the tag
        elementHTML += el.type === 'br' ? HTML_set.get(el.type) : HTML_set.get(el.type).replace('%content%', elText);

        // Add Styles
        if(el.type !== 'br' && el.styles.length > 0){

            let styledText = el.text;

            el.styles.forEach(style => {
                const styleSlice = el.text.slice(style.offset, style.offset + style.length);

                styledText = styledText.replace(
                        styleSlice,
                        set_styles.get(style.style).replace('%content%', styleSlice)
                    );
            });
            
            elementHTML = elementHTML.replace(el.text, styledText);
        };  

        // Close UL or OL tags IF any 
        if(isListItem){
            if(index === (contentArray.length -1) || (contentArray[index+1].type !== 'unordered-list-item' && contentArray[index+1].type !== 'ordered-list-item')){
                elementHTML += (el.type === 'unordered-list-item' ? '</ul>' : '</ol>');
            }
        }

        return elementHTML;
    });

    return html_temp.join('');
};

export const preProcessContent = (currentContent) => {

    // Create content object with tag / text content / styles
    const contentArray = currentContent.blocks.map(block => {
        let type = block.type;
        let text = block.text.trim();
        const styles = block.inlineStyleRanges;
        
        if(text === ''){
            type = 'br';
            return { type }
        }

        return { 
            type: type === 'unstyled' ? 'p' : type, 
            text,
            styles
        }
    });

    // TODO: trim the begining and ending empty blocks from contentArray
    while(contentArray[0].type === 'br') {
        contentArray.shift();
    }

    while(contentArray[contentArray.length-1].type === 'br') {
        contentArray.pop();
    }

    return toHtml(contentArray);
};

