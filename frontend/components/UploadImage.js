
import React, { useEffect, useState } from 'react'
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react'
import { fetchPhotos, openUploadWidget } from './CloudinaryService'

// export const url = imageElement.src


const UploadImage = (props) => {
  const [images, setImages] = useState([])
  console.log(props)
  // console.log(props.updateImage)
  console.log(images[0])
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
          // console.log(photos.info.public_id)
          props.updateImage(photos.info.secure_url)

        }
      } else {
        console.log(error)
      }
    })
  }
  // console.log(images)
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
        <div className="button" onClick={() => beginUpload()}>Upload Image</div>
        <section>
          {images && images.map(index => <div key={index}>
            <br />
            <Image
              publicId={index}
            // fetch-format="auto"
            // quality="auto"
            // height="300" width="300" crop="crop"
            // gravity="faces"
            // width="300" height="300" gravity="faces" radius="max" crop="fill"
            />
            {/* <Transformation width="400" height="400" gravity="face" radius="max" crop="crop" />
            <Transformation width="200" crop="scale" /> */}
            <Image />
            {/* <Transformation height="150" width="150" crop="fill" effect="sepia" radius="20" />
            <Transformation overlay="text:arial_60:This is my picture" gravity="north" y="20" />
            <Transformation angle="20" /> */}
          </div>)}

        </section>
      </div>


    </ CloudinaryContext>
  </div >
}

export default UploadImage 