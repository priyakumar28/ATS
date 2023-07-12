import React, { useEffect, useState } from "react";
import {
  uploadFile,
  uploadFiles,
  updateFile,
  uploadFilesWithName,
} from "../services/platformFileUploadService";

const extensionTypes = [
  "image/jpeg",
  "image/jpg",
  "application/pdf",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
];

export const useFileUpload = () => {
  const [filename, setFileName] = useState("");
  const [ifUploadingFailed, setIfUploadingFailed] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [uploadingProcess, setUploading] = useState(false);
  const [uploadedFilePath, setUploadedFilePath] = useState("");

  const handleFileUpload = async (e) => {
    setTimeout(() => {
      console.log(e.target.files[0].type);
    }, 100);

    setUploadedFilePath("");
    setUploadMessage("");
    setUploading(true);
    // console.log(e.target.files[0].type);
    var today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    if (extensionTypes.includes(e.target.files[0].type)) {
      let extension;
      switch (e.target.files[0].type) {
        case "image/jpeg":
          extension = ".jpeg";
          break;
        case "image/jpg":
          extension = ".jpg";
          break;
        case "application/pdf":
          extension = ".pdf";
          break;
        case "image/png":
          extension = ".png";
          break;
        case "application/msword":
          extension = ".doc";
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          extension = ".docx";
          break;
        default:
          extension = "";
      }
      // filename === "" && filename = e.target.files[0].name;
      let name = e.target.files[0].name;
      name = name.substring(0, name.lastIndexOf(".")) || name;
      const formData = new FormData();
      formData.append(
        "file",
        e.target.files[0],
        filename === ""
          ? name + date + extension
          : `${filename}${date}${extension}`
      );
      await uploadFile(formData).then((response) =>
        response.code == 1300
          ? (setUploadedFilePath({
              filePath: response.value.filePath,
              fileName: response.value.fileName,
              bucketName: response.value.bucketName,
            }),
            setUploadMessage("Uploded Successfully..."),
            setUploading(false))
          : (setUploadMessage(response.error.message),
            setIfUploadingFailed(true),
            setUploading(false),
            setFileName(""))
      );
    } else {
      setUploadMessage("File Extension Not Allowed.");
      setUploading(true);
      setIfUploadingFailed(true);
    }
  };

  return {
    ifUploadingFailed,
    uploadMessage,
    setFileName,
    handleFileUpload,
    uploadedFilePath,
    uploadingProcess,
  };
};

export const useMultipleFileUpload = () => {
  const [filesName, setFilesName] = useState("");
  const [getFilesDetails] = useState([]);
  const [uploadingFilesProcess, setUploading] = useState(true);
  const [ifUploadingFilesFailed, setIfUploadingFailed] = useState(false);
  const [uploadFilesMessage, setUploadMessage] = useState("");
  const [getResponseDetails, setResponseDetails] = useState([]);

  useEffect(() => {
    if (getResponseDetails != "") {
      for (let i = 0; i < getResponseDetails.length; i++) {
        getFilesDetails.push(getResponseDetails[i]);
      }
      console.log(getFilesDetails);
      setUploading(false);
      setUploading(false);
      setUploadMessage("Uploded Successfully...");
    }
  }, [getResponseDetails]);

  const handleFilesUpload = (e) => {
    const files = e.target.files;
    var today = new Date();
    let date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      if (extensionTypes.includes(e.target.files[i].type)) {
        let extension;
        switch (e.target.files[i].type) {
          case "image/jpeg":
            extension = ".jpeg";
            break;
          case "image/jpg":
            extension = ".jpg";
            break;
          case "application/pdf":
            extension = ".pdf";
            break;
          case "image/png":
            extension = ".png";
            break;
          case "application/msword":
            extension = ".doc";
            break;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extension = ".docx";
            break;
          default:
            extension = "";
        }
        let name = e.target.files[i].name;
        name = name.substring(0, name.lastIndexOf(".")) || name;
        let finalName;
        if (i === 0) {
          finalName =
            filesName === null
              ? name + date + extension
              : filesName + date + extension;
        } else {
          finalName =
            filesName === null
              ? name + i + date + extension
              : filesName + i + date + extension;
        }
        formData.append("files", files[i], finalName);
      } else {
        getFilesDetails.push({
          error: {
            message: e.target.files[i].name + "File Extension not Allowed",
          },
        });
      }

      i == files.length - 1 &&
        uploadFiles(formData).then((response) =>
          response.code == 1300
            ? setResponseDetails(response.value)
            : (setIfUploadingFailed(true),
              setUploadMessage(response.error.message))
        );
    }
    uploadFiles(formData).then((response) =>
      response.code == 1300
        ? (getFilesDetails.concat(response.value),
          setUploading(false),
          setUploadMessage("Uploded Successfully..."))
        : (setIfUploadingFailed(true), setUploadMessage(response.error.message))
    );
  };

  return {
    handleFilesUpload,
    setFilesName,
    getFilesDetails,
    uploadingFilesProcess,
    ifUploadingFilesFailed,
    uploadFilesMessage,
  };
};

export const useMultipleFileDragUpload = () => {
  const [dragFilesName, setDragFilesName] = useState(null);
  const [getDragFilesDetails, setDragFilesDetails] = useState([]);
  const [uploadingDragFilesProcess, setUploading] = useState(true);
  const [ifUploadingDragFilesFailed, setIfUploadingFailed] = useState(false);
  const [uploadDragFilesMessage, setUploadMessage] = useState("");
  const [uploadingFinesh, setUploadingFinesh] = useState(false);
  const [getResponseDetails, setResponseDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (getResponseDetails.length > 0) {
      console.log(getDragFilesDetails);
      for (let i = 0; i < getResponseDetails.length; i++) {
        getDragFilesDetails.push(getResponseDetails[i]);
      }
      setUploading(false);
      setUploadingFinesh(true);
      setUploadMessage("Uploded Successfully...");
    }
  }, [getResponseDetails, refresh]);

  const handleDragFilesUpload = async (e) => {
    setUploading(true);
    setUploadMessage("");
    setIfUploadingFailed(false);
    setUploadingFinesh(false);
    setDragFilesDetails([]);
    setResponseDetails([]);

    const files = e.dataTransfer.files;
    var today = new Date();
    const formData = new FormData();
    let date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    for (let i = 0; i < files.length; i++) {
      if (extensionTypes.includes(e.dataTransfer.files[i].type)) {
        let extension;
        switch (e.dataTransfer.files[i].type) {
          case "image/jpeg":
            extension = ".jpeg";
            break;
          case "image/jpg":
            extension = ".jpg";
            break;
          case "application/pdf":
            extension = ".pdf";
            break;
          case "image/png":
            extension = ".png";
            break;
          case "application/msword":
            extension = ".doc";
            break;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extension = ".docx";
            break;
          default:
            extension = "";
        }
        let name = e.dataTransfer.files[i].name;
        name = name.substring(0, name.lastIndexOf(".")) || name;
        let finalName;
        if (i === 0) {
          finalName =
            dragFilesName === null
              ? name + date + extension
              : dragFilesName + date + extension;
        } else {
          finalName =
            dragFilesName === null
              ? name + i + date + extension
              : dragFilesName + i + date + extension;
        }

        formData.append("files", files[i], finalName);
      } else {
        getDragFilesDetails.push({
          error: {
            message:
              e.dataTransfer.files[i].name + " File Extension not Allowed ",
          },
        });
      }
      if (getDragFilesDetails.length - 1 == i) {
        setRefresh(!refresh);
      }
      if (i == files.length - 1) {
        uploadFiles(formData).then((response) =>
          response.code == 1300
            ? (setResponseDetails(response.value),
              setDragFilesDetails(getDragFilesDetails),
              setUploadMessage("Uploded Successfully..."))
            : (setIfUploadingFailed(true),
              setUploadMessage(response.error.message))
        );
      }
    }
  };

  return {
    handleDragFilesUpload,
    setDragFilesName,
    setDragFilesDetails,
    getDragFilesDetails,
    uploadingDragFilesProcess,
    ifUploadingDragFilesFailed,
    uploadDragFilesMessage,
    uploadingFinesh,
  };
};

export const useMultipleFileUploadWithName = () => {
  const [dragFilesName, setDragFilesName] = useState([]);
  const [getDragFilesDetails, setDragFilesDetails] = useState([]);
  const [uploadingDragFilesProcess, setUploading] = useState(true);
  const [ifUploadingDragFilesFailed, setIfUploadingFailed] = useState(false);
  const [uploadDragFilesMessage, setUploadMessage] = useState("");
  const [uploadingFinesh, setUploadingFinesh] = useState(false);
  const [getResponseDetails, setResponseDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (getResponseDetails.length > 0) {
      console.log(getDragFilesDetails);
      for (let i = 0; i < getResponseDetails.length; i++) {
        getDragFilesDetails.push(getResponseDetails[i]);
      }
      setUploading(false);
      setUploadingFinesh(true);
      setUploadMessage("Uploded Successfully...");
    }
  }, [getResponseDetails, refresh]);

  const handleDragFilesUpload = async (file, name) => {
    setUploading(true);
    setUploadMessage("");
    setIfUploadingFailed(false);
    setUploadingFinesh(false);
    setDragFilesDetails([]);
    setResponseDetails([]);
    console.log(file);
    console.log(name);

    var today = new Date();
    const formData = new FormData();
    let date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}-${today.getHours()}-${today.getMinutes()}-${today.getSeconds()}`;
    for (let i = 0; i < file.length; i++) {
      if (extensionTypes.includes(file[i].type)) {
        let extension;
        switch (file[i].type) {
          case "image/jpeg":
            extension = ".jpeg";
            break;
          case "image/jpg":
            extension = ".jpg";
            break;
          case "application/pdf":
            extension = ".pdf";
            break;
          case "image/png":
            extension = ".png";
            break;
          case "application/msword":
            extension = ".doc";
            break;
          case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            extension = ".docx";
            break;
          default:
            extension = "";
        }
        formData.append("files", file[i]);
        formData.append("fileName", name[i] + date + extension);
      } else {
        getDragFilesDetails.push({
          error: {
            message: file[i].name + " File Extension not Allowed ",
          },
        });
      }
      if (getDragFilesDetails.length - 1 == i) {
        setRefresh(!refresh);
      }
      if (i == file.length - 1) {
        uploadFilesWithName(formData).then((response) =>
          response.code == 1300
            ? (setResponseDetails(response.value),
              setDragFilesDetails(getDragFilesDetails),
              setUploadMessage("Uploded Successfully..."))
            : (setIfUploadingFailed(true),
              setUploadMessage(response.error.message))
        );
      }
    }
  };

  return {
    handleDragFilesUpload,
    setDragFilesName,
    setDragFilesDetails,
    getDragFilesDetails,
    uploadingDragFilesProcess,
    ifUploadingDragFilesFailed,
    uploadDragFilesMessage,
    uploadingFinesh,
  };
};

export const useFileUpdate = (e) => {
  const [filePath, setFilePath] = useState("");
  const [updateProcess, setUpdateProcess] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("Uploading...");
  const [ifUploadingFailed, setIfUploadingFailed] = useState(false);

  const handleFileUpdate = (e) => {
    setUpdateProcess(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("filename", filePath);
    console.log(e.target.files[0], filePath);
    updateFile(formData).then((response) =>
      response.code == 1300
        ? (setUpdateMessage(response.data), setUpdateProcess(false))
        : (setIfUploadingFailed(true),
          setUpdateProcess(false),
          console.log(response),
          setUpdateMessage(response.error.message))
    );
  };

  return {
    setFilePath,
    updateProcess,
    handleFileUpdate,
    updateMessage,
    ifUploadingFailed,
  };
};
