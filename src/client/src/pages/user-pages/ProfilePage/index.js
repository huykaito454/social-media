import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ColorExtractor } from "react-color-extractor";
import { Dropdown, Avatar } from "flowbite-react";
import Modal from "react-modal";
import UpdateAvatarModal from "../../../components/Modal/UpdateAvatarModal";
import { customStyles } from "../../../utils/styleModal";
import { alertError } from "../../../utils/sweetAlertHandler";
import { requestUploadBackground } from "../../../services/user";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import { getToken } from "../../../utils/auth";
import { authGetUser } from "../../../sagas/auth/auth-slice";
const ProfilePage = () => {
  const { access_token } = getToken();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState(user);
  const [colorBackGround, setColorBackGround] = useState(null);
  const [updateAvatarIsOpen, setUpdateAvatarIsOpen] = useState(false);
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
  const handleUpdateBackground = async (e) => {
    e.preventDefault();
    let file = new FormData();
    if (fileUpload && urlImage !== null) {
      file.append("file", fileUpload);
      try {
        const { data } = await requestUploadBackground(file);
        if (data.data == true && data.status === 200) {
          toastSuccess(data.message);
          dispatch(authGetUser(access_token));
        }
      } catch (error) {
        toastError(error?.response?.data?.message);
      }
    }
  };
  useEffect(() => {
    document.title = user.fullName + " | Hilu";
    return () => {
      document.title = "Hilu";
    };
  }, [urlImage, user, colorBackGround, setColorBackGround]);
  return (
    <>
      <div
        className="page-full"
        style={{
          backgroundImage: `linear-gradient(to bottom , ${colorBackGround} 20%, white 50%)`,
        }}
      >
        {urlImage !== null && (
          <div className="w-full h-screen fixed z-10">
            <div className="w-full p-3 bg-black bg-opacity-30 fixed  flex items-center justify-between">
              <div className="f-center gap-2 text-white">
                <span class="material-symbols-outlined">public</span>
                <span className="text-sm font-medium">
                  Your background photo is publicly visible.
                </span>
              </div>
              <div className="f-center gap-2 text-white">
                <div
                  className="button bg-gray-300 hover:bg-gray-300 bg-opacity-30 px-8 py-2 text-sm"
                  onClick={() => {
                    setUrlImage(null);
                    setColorBackGround("#fcfcfd");
                  }}
                >
                  Cancel
                </div>
                <div
                  className="button px-8 text-sm py-2"
                  onClick={(e) => {
                    handleUpdateBackground(e);
                  }}
                >
                  Save changes
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="page-profile">
          <div className="w-full rounded-br-lg rounded-bl-lg overflow-hidden relative f-center">
            <ColorExtractor
              getColors={(colors) => {
                setColorBackGround(colors[1]);
              }}
            >
              {urlImage !== null ? (
                <img
                  src={urlImage}
                  alt=""
                  className="w-full object-cover min-h-[400px] max-h-[400px]"
                />
              ) : (
                <img
                  src={userData.backGround}
                  alt=""
                  className="w-full object-cover min-h-[400px] max-h-[400px]"
                />
              )}
            </ColorExtractor>
            <label
              htmlFor="update-background"
              className="button bg-white cursor-pointer text-black hover:bg-grayCard absolute bottom-3 right-8"
            >
              <span className="material-symbols-rounded text-lg">
                photo_camera
              </span>
              <span className="text-sm font-medium">
                Edit background profile
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/gif"
                id="update-background"
                onChange={(e) => {
                  handleUploadFile(e);
                }}
              />
            </label>
          </div>
          <div className="flex items-end justify-end relative px-8 py-8">
            <Dropdown
              label={
                <div className="w-44 h-44 rounded-full bg-white border-4 border-white absolute left-[32px] top-[-60px] hover:border-gray-200 transition-all cursor-pointer active:scale-95 f-center overflow-hidden">
                  <img
                    src={userData.avatar}
                    className="w-full object-cover"
                  ></img>
                </div>
              }
              arrowIcon={false}
              inline={true}
              placement="left-start"
            >
              <Dropdown.Item>
                <div className="font-medium f-center gap-2">
                  <span className="material-symbols-outlined">account_box</span>
                  <span>See profile picture</span>
                </div>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  setUpdateAvatarIsOpen(true);
                }}
              >
                <div className="font-medium f-center gap-2">
                  <span className="material-symbols-outlined">
                    photo_library
                  </span>
                  <span>Update profile picture</span>
                </div>
              </Dropdown.Item>
            </Dropdown>
            <Modal
              isOpen={updateAvatarIsOpen}
              onRequestClose={() => {
                setUpdateAvatarIsOpen(false);
              }}
              style={customStyles}
              ariaHideApp={false}
            >
              <UpdateAvatarModal></UpdateAvatarModal>
            </Modal>
            <div className="flex items-end justify-between w-[80%]">
              <div className="flex flex-col gap-2">
                <div className="flex items-end gap-2">
                  <span className="font-medium text-3xl">{user.userName}</span>
                  <span className=" font-light text-3xl">
                    ({user.fullName})
                  </span>
                </div>
                <span className="font-medium text-sm">1,2K friends</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="button">
                  <span className="material-symbols-rounded text-lg">
                    add_circle
                  </span>
                  <span className="text-sm font-medium">Add story</span>
                </button>
                <button className="button bg-grayCard text-black hover:bg-gray-300">
                  <span className="material-symbols-rounded text-lg">edit</span>
                  <span className="text-sm font-medium">Edit profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-full bg-bgPage mt-0 shadow"></div>
    </>
  );
};

export default ProfilePage;
