
import File from './files-model'

export const googleCloudStorage = {
  fileUpload: (req, res) => {
  //business logic
  },
  fileDownload: async (req, res) => {
    //business logic
  },
  fileDelete: async (req, res) => {
    //business logic
  }
}

export const saveAnFile = async (formData) => {
  const newFile = new File(formData);
  const file = await newFile.save();
  return file;
}
export const getFile = async (query) => {
  const file = await File.findOne(query);
  return file;
}
export const getFileLists = async (query) => {
  const file = await File.find(query);
  return file;
}
export const removeFile = async (query) => {
  const file = await File.remove(query);
  return file;
}