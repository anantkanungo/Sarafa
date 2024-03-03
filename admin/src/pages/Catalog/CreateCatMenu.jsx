import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import { IoMdImages } from "react-icons/io"
const CreateCatMenu = () => {
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    const addcatelog = async (e) => {
        e.preventDefault();
        const form_data = new FormData();
        form_data.append("catalog", image);
        form_data.append("category", category);
        console.log(image);

        let token = localStorage.getItem("token");
        try {
            let res = await axios.post(`http://139.59.58.151:8000/addcatalog/category`, form_data, {
                headers: {
                    "Authorization": 'Bearer ' + token,
                    Accept: "application/json",
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(res.data);
            if (res.data.success) {
                toast.success("Catalog Menu Added...");
            } else {
                toast.warn(res.data.message);
                console.log("error", res.data.message);
                // toast.error("There might be error...Try Again");
            }
        } catch (error) {
            console.error(error.response.data);
        }
        setImage("");
        setCategory("");
    }

    return (
        <>
            <div className='container'>
                <div className='d-flex row mx-2 mt-5 pt-5'>
                    <ToastContainer />
                    <div className='justify-content-center align-items-center ' >
                        <div className="pt-3"><h3 className="text-dark text-center" >Add Catalogue Menu</h3>
                            <hr />
                        </div>
                        <div className='col-sm-6 mx-auto '>
                            <form className='card p-3' action='' method='post' onSubmit={addcatelog} style={{ border: "solid 1px" }}>
                                <div className="input-group mb-3 mt-3 d-flex justify-content-center align-item-center">
                                    <div className="custom-file row">
                                        <label className="custom-file-label col-4 designImg" htmlFor="image"><i><IoMdImages style={{ height: "100%", width: "100%" }} /></i>
                                            <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} name="image" id="image" />
                                        </label>
                                        <br />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="category">Category</label>
                                    <input type="text" className="form-control" id="category" name='category' onChange={(e) => setCategory(e.target.value)} value={category} />
                                </div>

                                <span className='px-1 ms-auto'>
                                    <button className="btn btn-secondary m-2" type="submit" >Upload</button>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateCatMenu
