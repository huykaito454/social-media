import axios from "axios";
import { Avatar } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { requestUploadAvatar } from "../../../services/user";
import { alertError } from "../../../utils/sweetAlertHandler";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import { useDispatch } from "react-redux";
import { authGetUser } from "../../../sagas/auth/auth-slice";
import { getToken } from "../../../utils/auth";
const UpdateAvatarModal = () => {
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const [fileUpload, setFileUpload] = useState();
  const [urlImage, setUrlImage] = useState(null);
  const handleUploadFile = (e) => {
    if (e.target.files[0].type.includes("image")) {
      setFileUpload(e.target.files[0]);
      const url = URL.createObjectURL(e.target.files[0]);
      setUrlImage(url);
    } else {
      alertError(
        "Error",
        "Can not upload photos. The image must saved as a JPG, PNG, GIF file."
      );
    }
  };
  const handleUploadAvatar = async (e) => {
    e.preventDefault();
    let file = new FormData();
    if (fileUpload && urlImage !== null) {
      file.append("file", fileUpload);
      try {
        const { data } = await requestUploadAvatar(file);
        if (data.data == true && data.status === 200) {
          toastSuccess(data.message);
          dispatch(authGetUser(access_token));
        }
      } catch (error) {
        toastError(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {}, [fileUpload, urlImage]);
  return (
    <div className="modal-container">
      <div className="font-medium p-5 text-xl border-b border-grayCard">
        Update profile picture
      </div>
      <div className="p-5">
        {urlImage == null ? (
          <label htmlFor="input-file" className="w-full">
            <div className="button cursor-pointer rounded-md text-sm">
              <span className="material-symbols-outlined">add</span>
              <span className="text-white">Upload image</span>
            </div>
            <input
              type="file"
              className="hidden"
              id="input-file"
              accept="image/png, image/jpeg,image/gif"
              onChange={(e) => {
                handleUploadFile(e);
              }}
            />
          </label>
        ) : (
          <></>
        )}
        {urlImage !== null ? (
          <div className="f-center flex-col gap-12 h-full">
            <textarea
              rows="4"
              className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 outline-none"
              placeholder="Description..."
            ></textarea>
            <div className="w-72 h-72 rounded-full bg-white border-4 border-white hover:border-gray-200 transition-all cursor-pointer active:scale-95 f-center overflow-hidden">
              <img src={urlImage} className="w-full object-cover"></img>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="p-5 flex items-center justify-end w-full gap-2 mt-auto border-t border-grayCard">
        <button
          className="button bg-grayCard text-black hover:bg-gray-300"
          onClick={() => {
            setUrlImage(null);
          }}
        >
          <span className="material-symbols-rounded text-lg">close</span>
          <span className="text-sm font-medium">Cancel</span>
        </button>
        <button
          className="button"
          onClick={(e) => {
            handleUploadAvatar(e);
          }}
        >
          <span className="material-symbols-rounded text-lg">save</span>
          <span className="text-sm font-medium">Save</span>
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default UpdateAvatarModal;
