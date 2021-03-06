import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core'

export const url = (publicId, options) => {
  console.log(publicId)
  const scOptions = Util.withSnakeCaseKeys(options)
  const cl = CoreCloudinary.new()
  return cl.url(publicId, scOptions)
}

export const openUploadWidget = (options, callback) => {
  const scOptions = Util.withSnakeCaseKeys(options)
  window.cloudinary.openUploadWidget(scOptions, callback)
}

export async function fetchPhotos(imageTag, setter) {
  const options = {
    cloudName: 'greenupload',
    format: 'json',
    type: 'list',
    version: Math.ceil(new Date().getTime() / 1000),
    showAdvancedOptions: true,
    cropping: true,
    multiple: false,
    defaultSource: 'local',
    styles: {
      palette: {
        window: '#FFFFFF',
        windowBorder: '#056674',
        tabIcon: '#056674',
        menuIcons: '#5A616A',
        textDark: '#000000',
        textLight: '#FFFFFF',
        link: '#056674',
        action: '#FF620C',
        inactiveTabIcon: '#056674',
        error: '#F44235',
        inProgress: '#0078FF',
        complete: '#20B832',
        sourceBg: '#FFFFFF'
      }
    }
  }
  const urlPath = url(imageTag.toString(), options)

  fetch(urlPath)
    .then(res => res.text())
    .then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
    .catch(err => console.log(err))
}

// function showUploadWidget() {
//   cloudinary.openUploadWidget({
//      cloudName: 'greenupload',
//      uploadPreset: 'upload',
//      sources: [
//          'local',
//          'url',
//          'camera',
//          'image_search',
//          'google_drive',
//          'facebook',
//          'instagram',
//          'shutterstock'
//      ],
//      googleApiKey: '<image_search_google_api_key>',
//      showAdvancedOptions: true,
//      cropping: true,
//      multiple: false,
//      defaultSource: 'local',
//      styles: {
//          palette: {
//              window: '#FFFFFF',
//              windowBorder: '#056674',
//              tabIcon: '#056674',
//              menuIcons: '#5A616A',
//              textDark: '#000000',
//              textLight: '#FFFFFF',
//              link: '#056674',
//              action: '#FF620C',
//              inactiveTabIcon: '#056674',
//              error: '#F44235',
//              inProgress: '#0078FF',
//              complete: '#20B832',
//              sourceBg: '#FFFFFF'
//          },
//          fonts: {
//              default: null,
//              ''Fira Sans', sans-serif': {
//                  url: 'https://fonts.googleapis.com/css?family=Fira+Sans',
//                  active: true
//              }
//          }
//      }
//  },
//   (err, info) => {
//     if (!err) {    
//       console.log('Upload Widget event - ', info);
//     }
//    });
//   }