import React from 'react'
import Files from 'react-files'
import './FilesDiv.css';

class FilesDiv extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: 'FFFFFF',
            hover: false
        }
    };

    onFilesError (error, file) {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    /**
     * @return {string}

    LightenColor (color) {
        var num = parseInt(color,16),
            amt = Math.round(2.55 * 40),
            R = (num >> 16) + amt,
            B = (num >> 8 & 0x00FF) + amt,
            G = (num & 0x0000FF) + amt;

        return (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (B<255?B<1?0:B:255)*0x100 + (G<255?G<1?0:G:255)).toString(16).slice(1);
    },
    */
    toggleHover() {
        this.setState({color: this.state.color, hover: !this.state.hover})
    };

    render() {
        /*var styles;
        if (this.state.hover) {
            styles = {backgroundColor: '#' + this.LightenColor(this.state.color), cursor: 'pointer'}
        }*/
        return (
            <div className="FilesDiv">
                <Files
                    className='FilesDiv__dropzone'
                    onChange={this.props.onChange}
                    onError={this.onFilesError}
                    multiple
                    maxFiles={5}
                    maxFileSize={1000000}
                    minFileSize={0}
                    clickable
                    onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}
                >
                    Drop files here or click to upload
                </Files>
            </div>
        )
    }
}

export default FilesDiv;
