
import React, { useEffect, useState } from 'react'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'
import { fetchPhotos, openUploadWidget } from './CloudinaryService'

// export const url = imageElement.src


const UploadImage = (props) => {
  const [images, setImages] = useState([])
  // console.log(props.updateImage(images))
  // console.log(images)
  const beginUpload = tag => {
    const uploadOptions = {
      cloudName: 'greenupload',
      tags: [tag],
      uploadPreset: 'upload'
    }

    openUploadWidget(uploadOptions, (error, photos) => {
      if (!error) {
        console.log(photos)
        if (photos.event === 'success') {
          setImages([...images, photos.info.public_id])
        }
      } else {
        console.log(error)
      }
    })
  }
  console.log(images)
  // let myRef = React.createRef()
  // const myCurrentRef = myRef
  // console.log(myRef, url)

  useEffect(() => {
    fetchPhotos('image', setImages)
  }, [])
  return <div>
    < CloudinaryContext
      cloudName="greenupload"
    // onChange={updateImage(images)}
    // sources= ['image_search', 'local', 'url', 'camera', 'instagram']
    // maxImageFileSize= 150000
    // croppingValidateDimensions= true
    // inlineContainer="UploadImage"
    >
      <div className="App">
        <button onClick={() => beginUpload()}>Upload Image</button>
        {/* <section>
          {images && images.map(index => <div key={index}>
            <Image
              publicId={index}
              fetch-format="auto"
              quality="auto"
              height="300" width="300" crop="fill"
              gravity="faces"
            /><Image />
            <Transformation height="150" width="150" crop="fill" effect="sepia" radius="20" />
            <Transformation overlay="text:arial_60:This is my picture" gravity="north" y="20" />
            <Transformation angle="20" />
          </div>)}

        </section> */}
      </div>


    </ CloudinaryContext>
  </div >
}

export default UploadImage 