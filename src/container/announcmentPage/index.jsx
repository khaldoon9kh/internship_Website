import React, { useState } from 'react';
import { db } from '../../firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ReactComponent as CompletedSVG } from "../../svgs/doneCheck.svg";
import './index.css';

const AnnouncPage = () => {
  const storage = getStorage();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [imageDataFB, setImageDataFB] = useState('');
  const [formData, setFormData] = useState({
    companyName: '',
    position: '',
    location: '',
    duration: '',
    datepicker: '',
    description: '',
    imageUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue
    }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setSelectedImageFile(file);
  };

  const handleCancel = () => {
    setSelectedImage(null);
  };

  const handleUpload = () => {
    if (selectedImage && selectedImageFile) {
      const newFileName = changeFileName(selectedImageFile.name);
      const storageRef = ref(storage, `images/${newFileName}`);
      uploadBytes(storageRef, selectedImageFile)
      .then(() => getDownloadURL(storageRef))
      .then((downloadURL) => {
        console.log('Image uploaded successfully!');

        setImageDataFB(downloadURL);
        setUploadSuccess(true);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, 'career'); // Replace with your collection name
      const docRef = doc(collectionRef);

      formData.imageUrl = imageDataFB;
      formData.datepicker = formData.datepicker.split('-').reverse().join('-');

      await setDoc(docRef, formData);
      console.log('Data saved successfully!');

      // Reset the form
      setFormData({
        companyName: '',
        position: '',
        location: '',
        duration: '',
        datepicker: '',
        description: '',
        imageUrl: ''
      });
      setSelectedImage(null);
      setSelectedImageFile(null);
      setUploadSuccess(false);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const changeFileName = (origFileName) => {
    const currentDate = new Date();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const fileExtension = origFileName.split('.').pop();
    return `${origFileName.replace(`.${fileExtension}`, '')}_${hours}${minutes}${seconds}.${fileExtension}`;
  }

  return (
    <div className="announceContainer">
      <div className="announcHeaderCont">
        <h1>Add Announcement</h1>
        <h3>Update your Announcement here.</h3>
      </div>
      <form className="announcForm" onSubmit={handleSubmit}>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='companyName'>Company Name:</label>
          <input className='announcInput'type='text' id='companyName' name='companyName' value={formData.companyName} onChange={handleChange} required/>
        </div>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='position'>Position:</label>
          <input className='announcInput' type='text' id='position' name='position' value={formData.position} onChange={handleChange} required/>
        </div>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='location'>Location:</label>
          <input className='announcInput' type='text' id='location' name='location' value={formData.location} onChange={handleChange} required/>
        </div>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='duration'>Duration:</label>
          <input className='announcInput' type='text' id='duration' name='duration' value={formData.duration} onChange={handleChange} required/>
        </div>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='datepicker'>Date:</label>
          <input className='announcInput' type='date' id='datepicker' name='datepicker' value={formData.datepicker} onChange={handleChange} required/>
        </div>
        <div className='inputElement'>
          <label className='announcLabel' htmlFor='description'>Description:</label>
          <textarea className='announcInput' id='description' name='description' rows='10' value={formData.description} onChange={handleChange} required></textarea>
        </div>
        {!selectedImage && (
          <div className="inputElement">
            <label className="announcLabel" htmlFor="attachment">
              Attachment (JPG/PNG only):
            </label>
            <input
              className="announcInput"
              type="file"
              id="attachment"
              name="attachment"
              accept=".jpg,.jpeg,.png"
              onChange={handleImageChange}
            />
          </div>
        )}
        {selectedImage && !uploadSuccess && (
          <div className="imagePreview">
            <img className="thumbnail" src={selectedImage} alt="Preview" />
            <button className="cancelButton" onClick={handleCancel}>
              Cancel
            </button>
            <button className="uploadButton" type="button" onClick={handleUpload}>
              Upload
            </button>
          </div>
        )}
        {selectedImage && uploadSuccess && (
          <>
            <div className="imagePreview">
              <img className="thumbnail" src={selectedImage} alt="Preview" />
              <CompletedSVG />
            </div>
            <button className="announcButton" type="submit">
                Send
            </button>
          </>
        )}
        
      </form>
    </div>
  );
};

export default AnnouncPage;
