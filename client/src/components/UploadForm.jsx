import React from 'react';
import axios from 'axios';

const handleOnChange = (event) => {
    const data = new FormData();
    data.append('img', event.target.files[0])

    axios.post("http://localhost:3006/api/upload", data, {}).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err);
    });
}

const UploadForm = () => {
    const inputRef = React.useRef(null);
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const handleInputChange = (event) => {
        setFile(event.target.files[0]);
    };
    const handleOnClick = (event) => {
        const data = new FormData();
        data.append('img', file);
        setLoading(true);
        axios.post("http://localhost:3006/api/upload", data, {}).then(res => {
            console.log(res);
            setFile(null);
            inputRef.current.value = "";
            setLoading(null);
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
            <div>
                <label for="formFileLg" class="form-label">Select an Image</label>
                <input type="file" ref={inputRef} class="form-control form-control-lg" onChange={handleInputChange} id="img" type="file" />
            </div>
            <div class="form-group row mt-4 col-md-12">
                <div class="col-sm-10">
                    <button disabled={loading} type="submit" onClick={handleOnClick} class="btn btn-primary">{loading ? "Loading" : "Upload"}</button>
                </div>
            </div>
        </div>
    )
}

export default UploadForm
