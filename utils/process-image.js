const getOrientation = (file, callback) => {
  var reader = new FileReader()

  reader.onload = function(event) {
    var view = new DataView(event.target.result)

    if (view.getUint16(0, false) != 0xffd8) return callback(-2)

    var length = view.byteLength,
      offset = 2

    while (offset < length) {
      var marker = view.getUint16(offset, false)
      offset += 2

      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          return callback(-1)
        }
        var little = view.getUint16((offset += 6), false) == 0x4949
        offset += view.getUint32(offset + 4, little)
        var tags = view.getUint16(offset, little)
        offset += 2

        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) == 0x0112)
            return callback(view.getUint16(offset + i * 12 + 8, little))
      } else if ((marker & 0xff00) != 0xff00) break
      else offset += view.getUint16(offset, false)
    }
    return callback(-1)
  }

  reader.readAsArrayBuffer(file.slice(0, 64 * 1024))
}

const resetOrientation = (srcBase64, srcOrientation, callback) => {
  var img = new Image()

  img.onload = function() {
    var width = img.width,
      height = img.height,
      canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d')

    // set proper canvas dimensions before transform & export
    if (4 < srcOrientation && srcOrientation < 9) {
      canvas.width = height
      canvas.height = width
    } else {
      canvas.width = width
      canvas.height = height
    }

    // transform context before drawing image
    switch (srcOrientation) {
      case 2:
        ctx.transform(-1, 0, 0, 1, width, 0)
        break
      case 3:
        ctx.transform(-1, 0, 0, -1, width, height)
        break
      case 4:
        ctx.transform(1, 0, 0, -1, 0, height)
        break
      case 5:
        ctx.transform(0, 1, 1, 0, 0, 0)
        break
      case 6:
        ctx.transform(0, 1, -1, 0, height, 0)
        break
      case 7:
        ctx.transform(0, -1, -1, 0, height, width)
        break
      case 8:
        ctx.transform(0, -1, 1, 0, 0, width)
        break
      default:
        break
    }

    // draw image
    ctx.drawImage(img, 0, 0)

    // export base64
    callback(canvas.toDataURL())
  }

  img.src = srcBase64
}

const resizeImage = (dataUrl, cb) => {
  const maxWidth = 1200
  const maxHeight = 1600
  const img = new Image()
  img.src = dataUrl
  img.onload = function() {
    const { width, height } = img
    let newWidth, newHeight
    if (width > height) {
      newHeight = height * (maxWidth / width)
      newWidth = maxWidth
    } else {
      newWidth = width * (maxHeight / height)
      newHeight = maxHeight
    }
    const canvas = document.createElement('canvas')
    canvas.width = newWidth
    canvas.height = newHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(this, 0, 0, newWidth, newHeight)
    canvas.toBlob(blob => {
      cb(blob)
    }, 'image/jpeg')
  }
}

export const processImage = (file, dataUrl, cb) => {
  getOrientation(file, orientation => {
    resetOrientation(dataUrl, orientation, newDataUrl => {
      resizeImage(newDataUrl, blob => {
        cb(blob)
      })
    })
  })
}
