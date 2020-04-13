import React from 'react'
import './File.css';

class File extends React.Component {
    render() {
        const style = {
            width: 'max-content'
        };
        return (<div style={style}>
            <a className="file_download" onClick={this.props.onFileDownload}>{this.props.filename}</a>
            <button className="file_delete" onClick={this.props.onFileDelete}> ×</button>
        </div>);
    }
}

/*<p data-reactid=".0.2.$5e6f712d1f52983f4c630324.3.0.0"><a href="\5e6f712d1f52983f4c630324\инструкция первого дня.docx" download="" data-reactid=".0.2.$5e6f712d1f52983f4c630324.3.0.0.0">инструкция первого дня.docx</a><button data-reactid=".0.2.$5e6f712d1f52983f4c630324.3.0.0.1" style="
    background-color: transparent;
    border: none;
    /!* height: 5px; *!/
    /!* width: min-content; *!/
"> × </button></p>*/

export default File;
